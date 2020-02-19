/*** GLOBAL FILE IMPORT ****/
require('./globals/functions');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const config = require('config');
var cors = require('cors');

var routes = require('./routes');

// console.log('config',config);

/*** JWT KEY ****/
if (!config.get('jwtPrivateKey')) {
  console.error("Jwt private key not defined");
  process.exit(1);
}

/*** JWT KEY ****/

var port = process.env.port || 3000;

var app = express();

app.use(morgan('combined')); 
app.use(bodyParser.json());
app.use(cors());
router = express.Router();
app.use('', routes);

app.listen(port, function () {
  console.log('Web server listening on localhost:' + port);
});