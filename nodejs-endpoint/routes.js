'use strict';
module.exports = function(app) {
  var mockServiceController = require('./controller');

  app.route('/mockMemberMoverModelService/:memberID').get(mockServiceController.getMemberMoverProbability);

  app.route('/mockMemberResidencyInformation/:memberID').get(mockServiceController.getMemberResidencyInformation);

  app.route('/mockMemberLifeInsuranceInformation/:memberID').get(mockServiceController.getMemberLifeInsuranceInformation);

  app.route('/mockMovingServicesInformation').get(mockServiceController.getMovingServices);

  app.route('/mockFloodInsuranceInformation').get(mockServiceController.getFloodInsurance);

  app.route('/mockLifeInsuranceInformation').get(mockServiceController.getLifeInsurance);

  app.route('/memberSuggestedProducts/:memberID').get(mockServiceController.getMemberSuggestedProducts);
};