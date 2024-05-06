const Patient = require('../models/Patient.js');
const path = require('path');
const fs = require('fs');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose.js');
class PatientController {

    //get /Patient
    read(req, res, next) {
        Patient.find({})
            .then(patients => {
                patients = multipleMongooseToObject(patients);
                res.status(200).json({'patients': patients});
                // res.render('imagePage', {items: patients});
            })
            .catch(next);
    }

    async create(req, res, next) {
        console.log('create');
        try {
            console.log('22');
            console.log(__dirname);
            console.log(req.file.filename);
            console.log(path.join('/src/public/uploads/' + req.file.filename));
            const newPatient = {
                id_patient: req.body.id_patient, 
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                image_eyes: {
                    data: fs.readFileSync(path.join('D:/TLHT/Hk2-nam4/PBL7/MedicalRecords/BE-MedicalRecords/src/public/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            const patient = await Patient.create(newPatient);
            return res.status(200).send({ message: "Patient created successfully!", patient });
        }
        catch (error) {
            if (error.code === 11000) return res.status(200).send({ message: "patient already exists", product });
            console.log(error);
            return res.status(400).send({ message: "Error creating patient", error });
        }
    }

    retrieve(req, res, next) {
        Patient.findOne({id_patient: req.params.id}).exec()
           .then(patient => {
                patient = mongooseToObject(patient);
                res.status(200).json({'patient': patient})})
           .catch(next);
    }

    update(req, res, next) {
        console.log('update');
        var updatePatient;
        try {
            updatePatient = {
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                image_eyes: {
                    data: fs.readFileSync(path.join('D:/TLHT/Hk2-nam4/PBL7/MedicalRecords/BE-MedicalRecords/src/public/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
        } catch (e) {
            updatePatient = {
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email
            }
        }
        Patient.findOneAndUpdate({id_patient: req.params.id}, updatePatient, {new: true}).exec()
           .then(patient => {
                console.log(patient);
                patient = mongooseToObject(patient);
                res.status(200).json({'message': "Patient updated successfully!", 'patient': patient})})
           .catch(next);
    }

    delete(req, res, next) {
        Patient.findOneAndDelete({id_patient: req.params.id}).exec()
           .then(patient => {
                patient = mongooseToObject(patient);
                res.status(200).json({'message': "Patient deleted successfully!", 'patient': patient})})
           .catch(next);
    }

    search(req, res, next) {
        console.log('search');
        console.log(req.query.key);
        // if req.query.key is number
        var conditions; 
        if ( !isNaN(req.query.key) ) {
            conditions = [
                {id_patient: req.query.key},
                {name: { $regex: req.query.key, $options : 'i'}},
                {age: req.query.key},
                {address:  { $regex: req.query.key, $options : 'i'}},
                {phone: req.query.key},
                {email: req.query.key}
            ]
        }
        // else 
        else {
            conditions = [
                {id_patient: req.query.key},
                {name: { $regex: req.query.key, $options : 'i'}},
                {address:  { $regex: req.query.key, $options : 'i'}},
                {phone: req.query.key},
                {email: req.query.key}
            ]
        }
        Patient.find({$or: conditions}).exec()
           .then(patients => {
                patients = multipleMongooseToObject(patients);
                res.status(200).json({'patients': patients})})
           .catch(next);    
    }
}

module.exports = new PatientController;
