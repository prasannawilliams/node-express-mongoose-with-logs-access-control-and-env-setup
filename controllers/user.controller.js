const lang = require('../language/en');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model')
const jwConfig = require('config');

/********/
//user login controller
exports.post = async (requestData, res) => {
    const email_id = requestData.body ? requestData.body.email : false;
    const password = requestData.body ? requestData.body.password : false;
    if (email_id && password) {
        try {
            let userData = await usermodel.queryres('get_web_customer','p_email_address',email_id);
            if (Object.keys(userData).length > 0) {
                if (userData['CUSTOMER_PASSWORD'] != password) {
                    res.status(404).send({ message: 'FAILURE', data: lang.INVALID_PASSWORD });
                }
                else {
                    userData.EMAIL_ADDRESS = email_id
                    let accessToken = jwt.sign({_id:userData.WEB_CUSTOMER_ID},jwConfig.get('jwtPrivateKey'),{expiresIn:'5h'});
                    res.header('x-auth-token',accessToken).status(200).send({ message: 'SUCCESS',data: userData,accessToken});
                }
            }
            else {
                res.status(404).send({ message: 'FAILURE', data: lang.USER_NOTEXITS });
            }
        }
        catch(err) {
            res.status(404).send({ message: 'FAILURE', data: lang.WENT_WRONG });
        }
    } else {
        res.status(404).send({ message: 'FAILURE', data: lang.EMAIL_PWD_REQ });
    }

}