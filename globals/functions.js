const crypto = require('crypto');
var CryptoJS = require("crypto-js");


global.__encrypt =(val) => {
    var ciphertext = CryptoJS.AES.encrypt(val, iv).toString();
    return ciphertext;
}


global.__decrypt= (encrypted)=> {
    var bytes  = CryptoJS.AES.decrypt(encrypted, iv);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}


global.__getUserHash = (userName, password) => {
    const secret = 'crayANDhardSALT!!';
    return 'hello';
};

global.__successResponse = (data) => {
    return {
        status: 'OK',
        ...data
    }
};

global.__badRequest = (requestData, message) => {
    // requestData._http.setCode(400);
    return {
        status: 'FAIL',
        message: message || 'Bad request'
    }
};

global.__unauthorized = (requestData, message) => {
    requestData._http.setCode(401);

    return {
        status: 'FAIL',
        message: message || 'Unauthorized'
    }
};
