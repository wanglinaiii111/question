const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const userDao = require('../dao/userDao');

router.post('/login', async function (req, res, next) {
  let p = req.body;
  let result = await userDao.login(p);
  res.send({
    data: result,
  });
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
