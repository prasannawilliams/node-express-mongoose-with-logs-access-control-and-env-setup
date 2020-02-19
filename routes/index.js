const routes = require('express').Router()
const customerBookmarks = require('../controllers/user.customer-bookmarks');
const customerCompanies = require('../controllers/user.customer-companies');
const customerDocuments = require('../controllers/user.customer-documents');
const customerDesignContact = require('../controllers/user.customer-design-contact');
const customerEmails = require('../controllers/user.customer-emails');
const customerPhones = require('../controllers/user.customer-phones');
const customerSalesContact = require('../controllers/user.customer-sales-contact');
const customerQuotes = require('../controllers/user.customer-quotes');
const customerProfileImage = require('../controllers/user.customer-profile-image');
const customerBuilderDetails = require('../controllers/user.customer-builder-details');
const userController = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { shaAccess } = require('../middleware/shaValidation');

//api routes call
routes.post('/login', shaAccess, userController.post);
routes.get('/customer-bookmarks',shaAccess,auth,customerBookmarks.get)
routes.get('/customer-companies', shaAccess,auth,customerCompanies.get);
routes.get('/customer-design-contact', shaAccess,auth,customerDesignContact.get);
routes.get('/customer-emails', shaAccess,auth,customerEmails.get);
routes.get('/customer-phones', shaAccess,auth,customerPhones.get);
routes.get('/customer-documents', shaAccess,auth,customerDocuments.get);
routes.get('/customer-sales-contact', shaAccess,auth,customerSalesContact.get);
routes.get('/customer-quotes', shaAccess,auth,customerQuotes.get);
routes.get('/customer-profile-image', shaAccess,auth,customerProfileImage.get);
routes.get('/customer-builder-details', shaAccess,auth,customerBuilderDetails.get);

module.exports = routes;
