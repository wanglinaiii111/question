const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const userDao = require('../dao/userDao');

router.post('/login', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.login(p);
    console.log(result);
    if (false) {
        // 此处需判断登录失败
        res.send({ err: '' });
    } else {
        req.session.userId = result.id;
        req.session.user = result;
        res.send({ user: result });
    }
});

router.post('/create', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.create(p);
    console.log(result);
    res.send({});
});

module.exports = router;
