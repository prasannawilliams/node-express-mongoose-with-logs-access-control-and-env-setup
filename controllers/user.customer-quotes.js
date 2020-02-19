const usermodel = require('../models/user.quotes.model')
const lang = require('../language/en');

//get customer bookmarks list
exports.get = async (requestData, res) => {
    const customerId = requestData.query ? parseInt(requestData.query.customer_id): false;
    if(customerId){    
      try {
        let customer_result = await usermodel.customer_quotes('get_customer_quotes','p_customer_id',customerId);
        if (customer_result.length > 0) {
          res.status(200).send({ message: 'SUCCESS', data: customer_result });
      }
      else {
          res.status(404).send({ message: 'FAILURE', data: lang.NO_QUOTES_FOUND });
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