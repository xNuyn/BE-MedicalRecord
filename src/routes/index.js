const patientRouter = require('./patient.js');
const siteRouter = require('./site.js');


function route(app) {
    app.use('/patient', patientRouter);
    app.use('/' , siteRouter);
}
module.exports = route;