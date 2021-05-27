const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const classDao = require('../dao/classDao');

router.post('/create', async function (req, res, next) {
  let p = req.body;
  let result = await classDao.create(p);
  res.send(result);
});

router.post('/update', async function (req, res, next) {
  let p = req.body;
  let result = await classDao.update(p);
  res.send(result);
});

router.get('/select', async function (req, res, next) {
  let p = req.query;
  let result = await classDao.select(p);
  res.send({ result });
});

router.get('/delete', async function (req, res, next) {
  let p = req.query;
  let result = await classDao.deleteClass(p);
  res.send({ result });
});

module.exports = router;
