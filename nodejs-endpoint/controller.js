'use strict';

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
        stateOfResidency = "Arizona";
    } else if(memberID == 20) {
        ownsHome = true;
        stateOfResidency = "Florida";
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
        link: "https://www.usaa.com/pods"
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
    res.status(200).send(JSON.stringify(product));
    return;
};

exports.getLifeInsurance = function(req, res) {

    var product = { serviceName: "Life Insurance",
        description: "Think of life insurance as your promise to help protect your loved ones, no matter what. Whether the money is used to replace your income, pay off a debt, pay for education or cover burial expenses, life insurance can give your family a financial safety net when they need it most",
        memberBenefits: [],
        link: "https://www.usaa.com/inet/pages/insurance_life_main"
        };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(product));
    return;
};