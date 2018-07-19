'use strict';
module.exports = function(app) {
  var mockServiceController = require('./controller');

  // Add headers
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.route('/mockMemberMoverModelService/:memberID').get(mockServiceController.getMemberMoverProbability);

  app.route('/mockMemberResidencyInformation/:memberID').get(mockServiceController.getMemberResidencyInformation);

  app.route('/mockMemberLifeInsuranceInformation/:memberID').get(mockServiceController.getMemberLifeInsuranceInformation);

  app.route('/mockMovingServicesInformation').get(mockServiceController.getMovingServices);

  app.route('/mockFloodInsuranceInformation').get(mockServiceController.getFloodInsurance);

  app.route('/mockLifeInsuranceInformation').get(mockServiceController.getLifeInsurance);

  app.route('/memberSuggestedProducts/:memberID').get(mockServiceController.getMemberSuggestedProducts);
};