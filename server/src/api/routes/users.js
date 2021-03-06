const express = require('express');

const router = express.Router();

const UsersDao = require("../dao/usersDao.js");

var mysql = require("mysql");


var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "otskaug",
    password: "SWLtzP5H",
    database: "otskaug",
    debug: false
});

let usersDao = new UsersDao(pool);

router.get('/', (req, res, next) => {
    usersDao.getAll((status, data) => {
        res.status(status).json(data);
    })
});


router.post('/', (req, res, next) => {
    usersDao.createOne(req.body, (status, data) => {
        res.status(status).json(data);
    })
});


router.get('/:userId', (req, res, next) => {
    usersDao.getOne(req.params.userId, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/email/:email', (req, res, next) => {
    usersDao.getOnebyEmail(req.params.email, (status, data) => {

        res.status(status).json(data);
    });
});

router.post('/login', (req, res, next) => {
    usersDao.getOnebyEmail(req.body.email, (status, data) => {
        if(data[0].password !== req.body.password) return res.sendStatus(401);
        else return res.status(status).json(data);
    });
});

router.patch('/:userId', (req, res, next) => {
    console.log("reachee");
    console.log(req.body);
    usersDao.updateOne(req.body, req.params.userId, (status, data) => {
        res.status(status).json(data);
    })
});

router.delete('/:userId', (req, res, next) => {
    usersDao.deleteOne(req.params.userId, (status, data) => {
        res.status(status).json(data);
    })
});





module.exports = router;