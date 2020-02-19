const config = require('../config/config');
const helper = require('../utils/helper');
const lang = require('../language/en');
const crypto = require('crypto');
const algorithmType = 'aes-256-cbc';
const moment= require('moment');
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; 
const IV = "5183666c72eec9e4"; 

const {encryptPhrase} = require('../utils/helper');

function shaAccess(req, res, next) {
    const sha_key = req.header('x-api-key'); 
    console.log('sha_key',sha_key);   
    try {
        if(sha_key) {
            // encrypting and checking whether allowed or not
            try {
                const mainPhrase = helper.finalPhrase();
                var received_phrase = helper.decrypt(sha_key);
                if (received_phrase === mainPhrase) {
                    next();
                }
                else res.status(401).send(lang.INVALID_KEY);

            } catch (error) {
                res.status(401).send(lang.INVALID_KEY);
            }
            // encrypting and checking whether allowed or not

        } else {
            res.status(401).send(lang.INVALID_KEY);
        }
    } catch (error) {
        res.status(400).send(lang.INVALID_KEY);
    }
}

module.exports={
 shaAccess
}