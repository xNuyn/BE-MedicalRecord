const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController.js');

//newsController.index

router.get('/' , siteController.index);

router.get('/home', siteController.home);

router.post('/home', siteController.homepost);

module.exports = router;