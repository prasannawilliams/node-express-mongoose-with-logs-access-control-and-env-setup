const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({message: 'You are not authorized to send the request'});
    try {
      const decoded =  jwt.verify(token,config.get('jwtPrivateKey'));
      req.user = decoded;   
      next();
    } catch (error) {
        // console.log(error)
        res.status(400).send('Invalid token');
    }
}

module.exports={
    auth
}