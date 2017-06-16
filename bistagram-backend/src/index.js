import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import api from './routes';

import path from 'path';

const app = express();
const port = process.env.PORT || 3000;


/* SETUP MIDDLEWARE */
app.use(bodyParser.json()); // parses json


// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, '../../bistagram-frontend/public/')));

// SETUP ROUTER
app.use('/api', api);

/* handle error */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Something Broke!',
            code: 0
        }
    });
    next();
});


// ENABLE DEBUG WHEN DEV ENVIRONMENT
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny')); // server logger
}

const server = http.createServer(app).listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
