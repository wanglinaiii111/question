const common = require('../common/common');
const config = require('../common/config');

async function create(param) {
  return await common.service({
    url: config.api_url + '/exam/create/',
    method: 'get',
    params: param,
  });
}

async function select(param) {
  return await common.service({
    url: config.api_url + '/exam/select/',
    method: 'get',
    params: param,
  });
}

async function deleteExam(param) {
  return await common.service({
    url: config.api_url + '/exam/delete/',
    method: 'get',
    params: param,
  });
}

async function createExamSubject(param) {
  return await common.service({
    url: config.api_url + '/exam/create/examsubject',
    method: 'get',
    params: param,
  });
}

async function selectExamSubject(param) {
  return await common.service({
    url: config.api_url + '/exam/select/examsubject',
    method: 'get',
    params: param,
  });
}

async function createGradeReport(param) {
  return await common.service({
    url: config.api_url + '/exam/create/gradereport',
    method: 'get',
    params: param,
  });
}

async function delGradeReport(param) {
  return await common.service({
    url: config.api_url + '/exam/delete/gradereport',
    method: 'get',
    params: param,
  });
}

async function selectGradeReport(param) {
  return await common.service({
    url: config.api_url + '/exam/select/gradereport',
    method: 'get',
    params: param,
  });
}

async function examUpload(param) {
  return await common.service({
    url: config.api_url + '/exam/file/upload',
    method: 'post',
    data: param,
  });
}

async function notUploadExam(param) {
  return await common.service({
    url: config.api_url + '/exam/select/noupload',
    method: 'get',
    params: param,
  });
}

module.exports = {
  create,
  select,
  deleteExam,
  createExamSubject,
  selectExamSubject,
  createGradeReport,
  delGradeReport,
  selectGradeReport,
  examUpload,
  notUploadExam,
};
