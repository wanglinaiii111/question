const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const questionDao = require('../dao/questionDao');

router.get('/getKnowledge', async function (req, res, next) {
  let p = req.query;
  let result = await questionDao.getKnowledge(p);
  res.send(result);
});

router.post('/select', async function (req, res, next) {
  let p = req.body;
  let result = await questionDao.select(p);
  res.send(result);
});

router.post('/add', async function (req, res, next) {
  let p = req.body;
  let result = await questionDao.add(p);
  res.send(result);
});

router.post('/update', async function (req, res, next) {
  let p = req.body;
  let result = await questionDao.update(p);
  res.send(result);
});

router.get('/del', async function (req, res, next) {
  let p = req.query;
  let result = await questionDao.del(p);
  res.send(result);
});

router.post('/matching', async function (req, res, next) {
  let p = req.body;
  let result = await questionDao.matching(p);
  res.send(result);
});

router.get('/qtype', async function (req, res, next) {
  let p = req.query;
  let result = await questionDao.qtype(p);
  res.send(result);
});

module.exports = router;
