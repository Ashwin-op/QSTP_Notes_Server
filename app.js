let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let mongoose = require('./config/database');

let app = express();

// Initializing the routes
let notesRouter = require('./routes/notes');
let usersRouter = require('./routes/users');

// Setting the secret key
app.set('secretKey', 'api');
app.use(bodyParser.urlencoded({extended: false}));

// Defining the routes
app.use('/api/users', usersRouter);
app.use('/api/notes', validateUser, notesRouter);

// Validate jwt
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}

// Welcome page return
app.get('/', (req, res) => {
    res.json({
        "Name": "Notes app",
        "Description": "A simple CRUD notes app that can be controlled through APIs with login and register functionality"
    });
});


module.exports = app;
