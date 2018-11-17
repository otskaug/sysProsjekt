const express = require('express');

const router = express.Router();

const articleDao = require("./dao/articleDao.js");

var mysql = require("mysql");


var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "otkaug",
    password: "SWLtzP5H",
    database: "otskaug",
    debug: false
});


let articleDao = new articleDao(pool);


router.get('/', (req, res, next) => {
    articleDao.getAll((status, data) => {
        res.status(status).json(data);
    })
});


router.post('/', (req, res, next) => {
    articleDao.createOne(req.body, (status, data) => {
        res.status(status).json(data);
    })
});


router.get('/:articleId', (req, res, next) => {
    articleDao.getOne(req.params.articleId, (status, data) => {
        res.status(status).json(data);
    });
});

router.patch('/:articleId', (req, res, next) => {
    articleDao.updateOne(req.body, (status, data) => {
        res.status(status).json(data);
    })
});

router.delete('/:articleId', (req, res, next) => {
    articleDao.deleteOne(req.params.articleId, (status, data) => {
        res.status(status).json(data);
    })
});




module.exports = router;