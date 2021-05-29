const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const userDao = require('../dao/userDao');

router.post('/login', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.login(p);
    let msg = {
        data: result,
    };
    if (!result.account && !result.rid) {
        msg = { err: '用户名或密码不正确' };
    } else {
        req.session.userId = p.account;
        req.session.user = result;
    }
    res.send(msg);
});

router.get('/userInfo', async function (req, res, next) {
    res.send({ user: req.session.user });
});

router.get('/loginOut', async function (req, res, next) {
    req.session.userId = undefined;
    req.session.user = undefined;
    res.send({});
});

router.post('/create', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.create(p);
    res.send(result);
});

router.post('/update', async function (req, res, next) {
    let p = req.body;
    let result = await userDao.update(p);
    res.send(result);
});

router.get('/select', async function (req, res, next) {
    let p = req.query;
    let result = await userDao.select(p);
    res.send({ result });
});

router.get('/delete', async function (req, res, next) {
    let p = req.query;
    let result = await userDao.deleteUser(p);
    res.send({ result });
});

module.exports = router;
