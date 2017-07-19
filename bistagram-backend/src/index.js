import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

import http from 'http';
import express from 'express';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

import bodyParser from 'body-parser';
import morgan from 'morgan';

import passport from 'passport';
require('./passport');

import path from 'path';
import api from './routes';
import dbconfig from './dbinfo/database';

const app = express();
const port = process.env.PORT || 3000;

/* SETUP MIDDLEWARE */
app.use(bodyParser.json()); // parses json
// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, '../../bistagram-frontend/build/')));
app.use('/upload', express.static(path.join(__dirname, '../upload/')));

const options = {
  ...dbconfig,
  expiration: 3 * 24 * 60 * 60 * 1000
};

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000
    },
    store: new MySQLStore(options)
})); // setup session

// using passport
app.use(passport.initialize());
app.use(passport.session());

// SETUP ROUTER
app.use('/api', api);

/* handle error */
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        error: {
            message: 'Something Broke!',
            code: 0
        }
    });
    next();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../bistagram-frontend/build/index.html'));
});

// ENABLE DEBUG WHEN DEV ENVIRONMENT
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny')); // server logger
}

const server = http.createServer(app).listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
