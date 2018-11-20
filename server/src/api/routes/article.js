const express = require('express');

const router = express.Router();

const ArticleDao = require("../dao/articleDao.js");

var mysql = require("mysql");


var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "otskaug",
    password: "SWLtzP5H",
    database: "otskaug",
    debug: false
});


let articleDao = new ArticleDao(pool);


router.get('/', (req, res, next) => {
    articleDao.getAll((status, data) => {
        res.status(status).json(data);
    })
});

router.get('/newest', (req, res, next) => {
    articleDao.getAllLimit((status, data) => {
        res.status(status).json(data);
    })
});


router.post('/', (req, res, next) => {
    articleDao.createOne(req.body, (status, data) => {
        if(req.body.overskrift === null || req.body.innhold === null || req.body.bilde === null || req.body.kategori === null || req.body.viktighet === null || req.body.user_fk === null) return res.sendStatus(400);
        res.status(status).json(data);
    })
});


router.get('/:articleId', (req, res, next) => {
    articleDao.getOne(req.params.articleId, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/overskrift/:overskrift', (req,res) => {
    articleDao.getFromOverskrift(req.params.overskrift, (status,data) => {
        res.status(status).json(data);
    });
});

router.patch('/:articleId', (req, res, next) => {
    articleDao.updateOne(req.body, req.params.articleId, (status, data) => {
        if(req.body.overskrift === null || req.body.innhold === null || req.body.bilde === null || req.body.kategori === null || req.body.viktighet === null) return res.sendStatus(400);
        res.status(status).json(data);
    })
});

router.delete('/:articleId', (req, res, next) => {
    articleDao.deleteOne(req.params.articleId, (status, data) => {
        res.status(status).json(data);
    })
});

router.get('/kategori/:kategoriId', (req, res, next) => {
    articleDao.getKategori(req.params.kategoriId, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/user/:userId', (req, res, next) => {
    articleDao.getUserArticle(req.params.userId, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/important/:viktighet', (req, res, next) => {
    articleDao.getImportant(req.params.viktighet, (status, data) => {
        res.status(status).json(data);
    });
});



module.exports = router;