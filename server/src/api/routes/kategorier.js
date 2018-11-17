const express = require('express');

const router = express.Router();

const KategorierDao = require("../dao/kategorierDao.js");

var mysql = require("mysql");


var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "otskaug",
    password: "SWLtzP5H",
    database: "otskaug",
    debug: false
});

let kategorierDao = new KategorierDao(pool);

router.get('/', (req, res, next) => {
    kategorierDao.getAll((status, data) => {
        res.status(status).json(data);
    })
});

module.exports = router;