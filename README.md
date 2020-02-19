# Clone 
git clone https://github.com/prasannawilliams/node-express-mongoose-with-logs-access-control-and-env-setup.git
cd node-express-mongoose-with-logs-access-control-and-env-setup

# MongoDb database
Add your mongodb link for "MONGO_LINK" variable in .env.development and .env.production files.
Example MongoDb Link:  mongodb://mongodb0.example.com:27017/admin

# Running the App
npm install
npm start

# Creating Accestoken to make API's work
# Run below API call in browser search url/Postman
Method: GET
http://localhost:4000/api/miscellaneous/access_key

# To create access token
http://localhost:4000/api/users/login
# Replace "x-api-key" with key provided from "http://localhost:4000/api/miscellaneous/access_key" API.
 # Import below code in postman:::
curl -X POST \
  http://localhost:4000/api/users/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 092fb4d5-c96c-3003-68a7-c21e01d34015' \
  -H 'x-api-key: U2FsdGVkX1+ooH5EJ8vIpRntTaDR+0fCFMO54cd6xsZ/vjovfLzmoGlfruLIUM5K' \
  -d '{"email":"lspaight@hotmail.com","password":"aris2020"}'
  
  
