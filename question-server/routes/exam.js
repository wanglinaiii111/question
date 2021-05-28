const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const CONFIG = require('../common/config');
const examDao = require('../dao/examDao');

router.get('/create', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.create(p);
  res.send(result);
});

router.get('/select', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.select(p);
  res.send({ result });
});

router.get('/delete', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.deleteExam(p);
  res.send({ result });
});

router.get('/createExamsubject', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.createExamSubject(p);
  res.send(result);
});

router.get('/select/examsubject', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.selectExamSubject(p);
  res.send(result);
});

router.get('/create/gradereport', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.createGradeReport(p);
  res.send(result);
});

router.get('/select/gradereport', async function (req, res, next) {
  let p = req.query;
  let result = await examDao.selectGradeReport(p);
  res.send(result);
});

router.post('/file/upload', async function (req, res, next) {
  let p = req.body;
  let result = await examDao.examUpload(p);
  res.send(result);
});

module.exports = router;
