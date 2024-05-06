const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Couter.js');

const PatientSchema = new Schema ({
    id_patient: {type: String},
    name: {type : String, maxLength: 255},
    email: {type : String, maxLength: 255},
    phone: {type : String, maxLength: 15},
    age: {type : Number},
    address: {type : String, maxLength: 255},
    create_at: {type : Date, default : Date.now},
    image_eyes: {
        data: Buffer,
        contentType: String
    }
});

PatientSchema.pre('save', function(next){
    var doc = this;
    console.log(doc)
    console.log('pre save')
    Counter.findOneAndUpdate({name: 'patients'},{$inc: { sequence_value: 1}})
        .then(counter => {
            const value = counter.sequence_value;
            const currentYear = new Date().getFullYear().toString().slice(-2);
            doc.id_patient = String(currentYear) + String(value).padStart(4, '0');
            console.log('pre saved');
            next();
        })
        .catch(error => next(error));
})

module.exports = mongoose.model('Patient', PatientSchema);