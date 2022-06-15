const express = require('express');
const bodyParser = require('body-parser');
var logger = require('morgan');
const routes = require('./controller/router');
const cors = require('cors');
const { ValidationError } = require('express-validation');


/**
 * Express instance
 * @public
 */
const server = express();

const whitelist = [];
const corsOptionsDelegate = (req, callback) => {
    const corsOptions = { origin: false };

    console.log("\nOrigin: ", req.header('Origin'));
    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    if (isDomainAllowed || whitelist.includes('localhost')) {
        corsOptions.origin = true;
    }
    console.log("corsOptions: ", corsOptions);
    return callback(null, corsOptions)
}

server.set('trust proxy', true);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(logger('dev'));
server.use(cors(corsOptionsDelegate)); //CORS SETTINGS

server.use('/healthcheck', (req, res) => res.send('Success'));
server.use('/api', routes);


server.use('/*', (req, res, next) => {
    console.log("Not Found");
    return next({ message: 'Route Not Found', statusCode: 500 });
});


server.use(function (err, req, res, next) {
    console.log("\nError encountered in server. Error: ", err);
    if (err instanceof ValidationError) {
        let message;
        const details = err.details[0];
        message = details[Object.keys(details)[0]];
        return res.status(err.statusCode).json({ message });
    }
    const statusCode = err.statusCode == undefined ? 500 : err.statusCode;
    return res.status(statusCode).json({ message: err.message });
});

module.exports = server;