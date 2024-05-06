const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting');
    }
}

module.exports = { connect };