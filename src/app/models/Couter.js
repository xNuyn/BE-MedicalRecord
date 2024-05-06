const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouterSchema = new Schema({
    name: String,
    sequence_value: Number
});

const Couter = mongoose.model('Couter', CouterSchema);

module.exports = Couter;