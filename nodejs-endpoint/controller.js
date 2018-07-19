'use strict';
const rp = require('request-promise');

exports.getMemberMoverProbability = function(req, res) {
    var memberID = req.params.memberID;

    var movingProbability;
    if(memberID == 10) {
        movingProbability = "0.20"
    } else if(memberID == 20) {
        movingProbability = "0.75"
    } else {
        res.status(404).send();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ probability: movingProbability }));
    return;
};

exports.getMemberResidencyInformation = function(req, res) {
    var memberID = req.params.memberID;

    var ownsHome;
    var stateOfResidency;
    if(memberID == 10) {
        ownsHome = true;
        stateOfResidency = "AZ";
    } else if(memberID == 20) {
        ownsHome = true;
        stateOfResidency = "FL";
    } else {
        res.status(404).send();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ ownsHome: ownsHome, stateOfResidency: stateOfResidency }));
    return;
};

exports.getMemberLifeInsuranceInformation = function(req, res) {
    var memberID = req.params.memberID;

    var age;
    var hasLifeInsurance;
    if(memberID == 10) {
        age = 25;
        hasLifeInsurance = false;
    } else if(memberID == 20) {
        age = 50;
        hasLifeInsurance = true;
    } else {
        res.status(404).send();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ age: age, hasLifeInsurance: hasLifeInsurance }));
    return;
};

exports.getMovingServices = function(req, res) {

    var products = [
        { serviceName: "ADT Security Services",
        description: "Help keep your home protected and your family feeling safe",
        memberBenefits: ["3 months free monitoring every 24 months upon deployment", 
                            "Move credit up to $349", 
                            "Money back service guarentee if not satisfied within 6 months"],
        link: "https://www.usaa.com/adt"
        },
        { serviceName: "PODS Moving & Storage",
        description: "Reduce your moving and storage hassels when you move, deploy, or PCS",
        memberBenefits: ["10% off the first months storage", 
                           "10% off initial and long distance transportation", 
                           "Performace monitoring"],
        link: "https://www.usaa.com/pods"
       }
    ];

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(products));
    return;
};

exports.getFloodInsurance = function(req, res) {

    var product = { serviceName: "Flood Insurance",
        description: "[Flood insurance description placeholder]",
        memberBenefits: ["[Flood insurance benefit #1 placeholder]", "[Flood insurance benefit #2 placeholder]"],
        link: "https://home.usaa.com/sites/connect/ASC/Pages/Product.aspx?page=Flood%2520Program"
        };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify([product]));
    return;
};

exports.getLifeInsurance = function(req, res) {

    var product = { serviceName: "Life Insurance",
        description: "Think of life insurance as your promise to help protect your loved ones, no matter what. Whether the money is used to replace your income, pay off a debt, pay for education or cover burial expenses, life insurance can give your family a financial safety net when they need it most",
        memberBenefits: [],
        link: "https://www.usaa.com/inet/pages/insurance_life_main"
        };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify([product]));
    return;
};

exports.getMemberSuggestedProducts = function(req, res) {

    var memberID = req.params.memberID;

    var options = {
        uri: 'https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries',
        json: true // Automatically parses the JSON string in the response
    };
     
    var femaDisasterInformationPromise = rp(options).then(function (data) {
        return data;
    }).catch(function (err) {
        // API call failed...
    });

    var options2 = {
        uri: 'http://localhost:3000/mockMemberResidencyInformation/' + memberID,
        json: true // Automatically parses the JSON string in the response
    };
     
    var memberResidencyInformationPromise = rp(options2).then(function (data) {
        return data;
    }).catch(function (err) {
        // API call failed...
    });

    var stateFloodCountPromise = Promise.all([femaDisasterInformationPromise, memberResidencyInformationPromise]).then((data) => {
        var memberResidencyInformation = data[1];
        var memberOwnsHome = memberResidencyInformation.ownsHome;
        var memberResidencyState = memberResidencyInformation.stateOfResidency;

        var femaDisasterInformation = data[0];
        var femaDisasters = femaDisasterInformation.DisasterDeclarationsSummaries;

        var floodCount = 0;
        femaDisasters.forEach(function(disaster) {

            if(disaster.state == memberResidencyState && (disaster.incidentType == "Flood" || disaster.incidentType == "Hurricane")) {
                floodCount++;
            }
        });

        return floodCount;
    });

    var suggestedProducts = [];
    var floodSuggestedProductsPromise = stateFloodCountPromise.then(floodCount => {
        if(floodCount > 10) {
            var options3 = {
                uri: 'http://localhost:3000/mockFloodInsuranceInformation',
                json: true // Automatically parses the JSON string in the response
            };
             
            return rp(options3).then(function (data) {
                console.log("FLOOD SUGGESTED");
                return data;
            }).catch(function (err) {
                // API call failed...
            });
        }
    });




    var options4 = {
        uri: 'http://localhost:3000/mockMemberMoverModelService/' + memberID,
        json: true // Automatically parses the JSON string in the response
    };
     
    var memberMovingProbabilityPromise = rp(options4).then(function (data) {
        return data;
    }).catch(function (err) {
        // API call failed...
    });

    var movingSuggestedProductsPromise = memberMovingProbabilityPromise.then(data => {
        var moveProbability = data.probability;

        if(moveProbability >= 0.75) {
            var options5 = {
                uri: 'http://localhost:3000/mockMovingServicesInformation',
                json: true // Automatically parses the JSON string in the response
            };
             
            return rp(options5).then(function (data) {
                console.log("MOVING SUGGESTED");
                return data;
            }).catch(function (err) {
                // API call failed...
            });
        }
    });




    var options5 = {
        uri: 'http://localhost:3000/mockMemberLifeInsuranceInformation/' + memberID,
        json: true // Automatically parses the JSON string in the response
    };
     
    var memberLifeInsuranceInformationPromise = rp(options5).then(function (data) {
        return data;
    }).catch(function (err) {
        // API call failed...
    });

    var lifeInsuranceSuggestedProductsPromise = memberLifeInsuranceInformationPromise.then(data => {
        var hasLifeInsurance = data.hasLifeInsurance;

        if(!hasLifeInsurance) {
            var options6 = {
                uri: 'http://localhost:3000/mockLifeInsuranceInformation',
                json: true // Automatically parses the JSON string in the response
            };
             
            return rp(options6).then(function (data) {
                console.log("LIFE INSURANCE SUGGESTED");
                return data;
            }).catch(function (err) {
                // API call failed...
            });
        }
    });

    Promise.all([movingSuggestedProductsPromise,floodSuggestedProductsPromise,lifeInsuranceSuggestedProductsPromise]).then(data => {

        var movingSuggestedProducts = data[0];
        var floodSuggestedProducts = data[1];
        var lifeInsuranceSuggestedProducts = data[2];

        if(movingSuggestedProducts) {
            movingSuggestedProducts.forEach(function(product) {
                suggestedProducts.push(product);
            });
        }
        
        if(floodSuggestedProducts) {
            floodSuggestedProducts.forEach(function(product) {
                suggestedProducts.push(product);
            });
        }

        if(lifeInsuranceSuggestedProducts) {
            lifeInsuranceSuggestedProducts.forEach(function(product) {
                suggestedProducts.push(product);
            });
        }

        console.log(suggestedProducts);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(suggestedProducts));
        return;

        
    });
};