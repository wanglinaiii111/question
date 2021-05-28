const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const subjectDao = require('../dao/subjectDao');

router.get('/select', async function (req, res, next) {
  let p = req.query;
  let result = await subjectDao.select(p);
  res.send(result);
});

module.exports = router;
