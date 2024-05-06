const express = require('express');
const router = express.Router();
const upload = require('../app/middlewares/PostMdw.js');

const PatientController = require('../app/controllers/PatientController.js');


//create
router.post('/create', upload.single('image_eyes'), PatientController.create);

//search
router.get('/search', PatientController.search);

//update
router.get('/:id' , PatientController.retrieve);
router.patch('/update/:id', upload.single('image_eyes'), PatientController.update);

//delete
router.delete('/delete/:id' , PatientController.delete);

//read
router.get('/' , PatientController.read);


module.exports = router;