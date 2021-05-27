const common = require('../common/common');
const config = require('../common/config');

async function create(param) {
  return await common.service({
    url: config.api_url + '/student/create/',
    method: 'post',
    data: param,
  });
}

async function update(param) {
  return await common.service({
    url: config.api_url + '/student/update/',
    method: 'post',
    data: param,
  });
}

async function select(param) {
  return await common.service({
    url: config.api_url + '/student/select/',
    method: 'get',
    params: param,
  });
}

async function deleteStudent(param) {
  return await common.service({
    url: config.api_url + '/student/delete/',
    method: 'get',
    params: param,
  });
}

module.exports = {
  create,
  select,
  deleteStudent,
  update,
};
