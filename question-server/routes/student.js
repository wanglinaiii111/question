const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const studentDao = require('../dao/studentDao');

router.post('/create', async function (req, res, next) {
  let p = req.body;
  let result = await studentDao.create(p);
  res.send(result);
});

router.post('/update', async function (req, res, next) {
  let p = req.body;
  let result = await studentDao.update(p);
  res.send(result);
});

router.get('/select', async function (req, res, next) {
  let p = req.query;
  let result = await studentDao.select(p);
  res.send({ result });
});

router.get('/delete', async function (req, res, next) {
  let p = req.query;
  let result = await studentDao.deleteStudent(p);
  res.send({ result });
});

module.exports = router;
