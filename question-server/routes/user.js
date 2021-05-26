const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const userDao = require('../dao/userDao');

router.post('/login', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.login(p);
    console.log(result)
    res.send({});
});

router.post('/create', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.create(p);
    console.log(result)
    res.send({});
});

module.exports = router;
