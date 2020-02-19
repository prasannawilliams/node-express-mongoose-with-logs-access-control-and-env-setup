const config = require('../config/config');
const oracledb = require('oracledb');

//user login procedure
exports.queryres = async (api_type,api_key,api_val) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection(config.database);
        let sql = `BEGIN
                corp0710.${api_type}(:${api_key},:p_record_set,:ERR_CD,:ERR_MSG) ;
            END ;`;
        let bindVars = {
            p_email_address: api_val,
            p_record_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
            ERR_CD: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR },
            ERR_MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
        }
        result = await connection.execute(sql, bindVars);
        const cursor = result.outBinds.p_record_set;
        const queryStream = cursor.toQueryStream();
        let userData = {};
        const consumeStream = new Promise(async (resolve, reject) => {
            queryStream.on('data',async function(row) {
                userData = row
            });
            queryStream.on('error', reject);
            queryStream.on('close', resolve);
        });
        await consumeStream;
        let qry = "select customer_id from WEB_CUSTOMER_REGISTRATIONS WHERE web_customer_id="+userData.WEB_CUSTOMER_ID;
        let reg_cus = await connection.execute(qry);
        if(Object.keys(reg_cus).length > 0) {
            userData.CUSTOMER_ID = reg_cus.rows[0].CUSTOMER_ID
        }
        return await userData;
    } catch (err) {
        console.error(err);
    } finally {
        if (result && result.resultSet) {
            try {
                await result.resultSet.close();
            } catch (err) {
                console.error(err);
            }
        }
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}  
