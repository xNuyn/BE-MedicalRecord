const path = require('path');
const express = require('express');
const morgan = require('morgan');
const route = require('./routes');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || '8000';
const bodyParser = require('body-parser');
const methodOverride= require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));


// app.use(bodyParser.urlencoded({ extended: false, limit: 10000, parameterLimit: 2 }));
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

app.use(methodOverride('_method'));


route(app);

app.get("/", (req, res) => {
    res.send('API IS NOW WORKING, append "/docs" to the current url to access API documentation');
});

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = "Not Found";
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));