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

module.exports = router;
