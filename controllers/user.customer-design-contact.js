var oracledb = require('oracledb');
var config = require(__dirname + '/../config/config.js');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.get = (requestData, res, next) => {
    //console.log(req);
    const customerId = requestData.query
        ? parseInt(requestData.query.customer_id)
        : false;
    if(customerId){    
        async function getCustomerBookmarks() {
              let connection;
              let result;
              try {
                connection = await oracledb.getConnection(config.database);
                let sql = `BEGIN
                            corp0710.get_customer_design_contact(:p_customer_id,:p_record_set,:ERR_CD,:ERR_MSG) ;
                        END ;`;

                let bindVars = {
                    p_customer_id: customerId,
                    p_record_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                    ERR_CD: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR },
                    ERR_MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING}
                }
        
                result = await connection.execute(sql, bindVars);
                 const cursor = result.outBinds.p_record_set;
                    const queryStream = cursor.toQueryStream();
                    let phonesArray = [];
                    const consumeStream = new Promise((resolve, reject) => {
                      queryStream.on('data', function(row) {  
                        phonesArray.push(row)
                      });
                      queryStream.on('error', reject);
                      queryStream.on('close', resolve);
                    });
                    await consumeStream;
                    if(phonesArray.length > 0){
                        res.status(402).send({message: 'SUCCESS',data:phonesArray});
                    }
                    else{
                        res.status(401).send({message: 'FAILURE',data:'No Contact for the customer'});
                    }

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
        getCustomerBookmarks();
    }else{
        res.status(401).send({message: 'FAILURE',data:'customer_id not found'});
    }

}
