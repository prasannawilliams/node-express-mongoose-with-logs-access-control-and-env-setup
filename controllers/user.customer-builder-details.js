const usermodel = require('../models/user.customer.model')
const lang = require('../language/en');

//get customer bookmarks list
exports.get = async (requestData, res) => {
    const webcustomerid = requestData.query ? parseInt(requestData.query.web_customer_id): false;
    if(webcustomerid){    
      try {
        let web_customer_result = await usermodel.customer_records('get_web_customer_jobs','p_web_customer_id',webcustomerid);
        if (web_customer_result.length > 0) {
          res.status(200).send({ message: 'SUCCESS', data: web_customer_result });
      }
      else {
          res.status(404).send({ message: 'FAILURE', data: lang.NO_BUILDERS_FOUND });
      }
      }
      catch(err) {
        res.status(404).send({ message: 'FAILURE', data: lang.WENT_WRONG });
      }
    }
    else{
      res.status(404).send({message: 'FAILURE',data: lang.NO_CUSTOMER_FOUND});
  }
}