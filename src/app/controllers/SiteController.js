const Patient = require('../models/Patient.js');

class SiteController {
    //get /site
    index(req, res, next) {
        Patient.find({})
            .then(patients => { res.status(200).json({'patients': patients})})
            .catch(next);
    }

    home(req, res) {
        res.send('home');
    }
    
    homepost(req, res){
      res.send('Got a POST request')
    }
}

module.exports = new SiteController;
