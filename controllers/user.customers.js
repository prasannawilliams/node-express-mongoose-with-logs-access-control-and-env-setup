var oracledb = require('oracledb');
var config = require(__dirname + '../../config.js');

exports.get = (req, res, next) => {
    
    oracledb.getConnection(
        config.database,
      
        function(err, connection){
            if (err) {
                return next(err);
            }

            let sql = `DECLARE
                p_customer_id NUMBER := :p_customer_id;
                BEGIN
                corp0710.get_customer_bookmarks(:p_customer_id,
                                                :p_record_set,
                                                :ERR_CD,
                                                :ERR_MSG 
                                              ) ;
                END ;`;

            let bindVars = {
                p_customer_id: 399080,
                p_record_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                ERR_CD: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR },
                ERR_MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING}
            }


            connection.execute(sql, bindVars, (err, results) => {
                console.log(results);

                var rowsProcessed = 0;
                var startTime;
 
                if (err) throw err;
 
                startTime = Date.now();
 
                function processResultSet() {
                    results.outBinds.p_record_set.getRows(10, function(err, rows) {
                        if (err) throw err;
 
                        if (rows.length) {
                            rows.forEach(function(row) {
                                rowsProcessed += 1;

                                console.log(row);
 
                                //do work on the row here
                            });
 
                            processResultSet(); //try to get more rows from the result set
 
                            return; //exit recursive function prior to closing result set
                        }
 
                        console.log('Finish processing ' + rowsProcessed + ' rows');
                        console.log('Total time (in seconds):', ((Date.now() - startTime)/1000));
 
                        results.outBinds.p_record_set.close(function(err) {
                            if (err) console.error(err.message);
 
                            connection.release(function(err) {
                                if (err) console.error(err.message);
                            });
                        });
                    });
                }
 
                processResultSet();

                //    if (err) {
                //     console.error('Error executing query', err)
                // } else {
                //   console.log(result);
                //     console.log('Query successful');

                //     console.log(result.getRow());
                // }

            })

            // const result = connection.execute(
            //   `BEGIN
            //      CORP0710.get_customer_companies(:p_web_customer_id);
            //    END;`,
            //   {  // bind variables
            //     p_web_customer_id:{ dir: oracledb.BIND_IN, val: 2260, type: oracledb.NUMBER },
            //   }
            // );

           // console.log(result);    
            // connection.execute(
            //     'Select * from WEB_CUSTOMERS where WEB_CUSTOMER_ID = 2003 ',
            //     {},//no binds
            //     {
            //         outFormat: oracledb.OBJECT
            //     },
            //     function(err, results){
            //         if (err) {
            //             connection.release(function(err) {
            //                 if (err) {
            //                     console.error(err.message);
            //                 }
            //             });

            //             return next(err);
            //         }

            //         res.status(200).json(results.rows);

            //         connection.release(function(err) {
            //             if (err) {
            //                 console.error(err.message);
            //             }
            //         });
            // });
        }
    );
}