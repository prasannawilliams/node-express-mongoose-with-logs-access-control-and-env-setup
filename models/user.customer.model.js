var oracledb = require('oracledb');
var config = require(__dirname + '/../config/config.js');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//function to get customer records based on api type
exports.customer_records = async (api_type, customer_key, customerId) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection(config.database);
        let sql = `BEGIN
            corp0710.${api_type}(:${customer_key},:p_record_set,:ERR_CD,:ERR_MSG) ;
            END ;`;
        let bindVars = {
            [customer_key]: customerId,
            p_record_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
            ERR_CD: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR },
            ERR_MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
        }
        result = await connection.execute(sql, bindVars);
        const cursor = result.outBinds.p_record_set;
        const queryStream = cursor.toQueryStream();
        let bookmarksArray = [];
        const consumeStream = new Promise((resolve, reject) => {
            queryStream.on('data', function (row) {
                bookmarksArray.push(row)
            });
            queryStream.on('error', reject);
            queryStream.on('close', resolve);
        });
        await consumeStream;
        return await bookmarksArray;

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