import path from "path";

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const public_path = path.join(__dirname, '/../../client/public');
app.use(express.static(public_path));

const articleRoutes = require('./api/routes/article');
const kategorierRoutes = require('./api/routes/kategorier');
const usersRoutes = require('./api/routes/users');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/article', articleRoutes);
app.use('/kategorier', kategorierRoutes);
app.use('/users', usersRoutes);



app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;