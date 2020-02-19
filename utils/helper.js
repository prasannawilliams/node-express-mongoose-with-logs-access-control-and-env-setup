const CryptoJS = require("crypto-js");
const config = require('../config/config');
const moment = require('moment');
let check = global.__badRequest('requestData', 'hello');
let shaAccessData = config.shaAccess;

function finalPhrase() {	
	  const phrase1 = shaAccessData.phrase1;
      const phrase2 = moment(new Date()).format("DD_MM_YYYY");
      const phrase3 = shaAccessData.phrase3;
      const comPhrase = `${phrase1}${phrase2}${phrase3}`
    return comPhrase;
}

function encrypt(val) {
    var ciphertext = CryptoJS.AES.encrypt(val, shaAccessData.IV).toString();
    return ciphertext;
}

function decrypt(encrypted) {
    var bytes  = CryptoJS.AES.decrypt(encrypted, shaAccessData.IV);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

module.exports = {encrypt,decrypt,finalPhrase}