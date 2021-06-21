const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const intelligenceDao = require('../dao/intelligenceDao');

router.post('/checkreport', async function (req, res, next) {
  let p = req.body;
  let result = await intelligenceDao.checkreport(p);
  res.send(result);
});

router.post('/clevelreport', async function (req, res, next) {
  let p = req.body;
  let result = await intelligenceDao.clevelreport(p);
  res.send(result);
});

router.post('/addgroup', async function (req, res, next) {
  let p = req.body;
  let result = await intelligenceDao.addgroup(p);
  res.send(result);
});

router.get('/searchgroup', async function (req, res, next) {
  let p = req.query;
  let result = await intelligenceDao.searchgroup(p);
  res.send({ result });
});

router.get('/delgroup', async function (req, res, next) {
  let p = req.query;
  let result = await intelligenceDao.delgroup(p);
  res.send({ result });
});

router.post('/updategroup', async function (req, res, next) {
  let p = req.body;
  let result = await intelligenceDao.updategroup(p);
  res.send(result);
});

router.post('/addquestion', async function (req, res, next) {
  let p = req.body;
  let result = await intelligenceDao.addquestion(p);
  res.send(result);
});

router.get('/delquestion', async function (req, res, next) {
  let p = req.query;
  let result = await intelligenceDao.delquestion(p);
  res.send({ result });
});

module.exports = router;
