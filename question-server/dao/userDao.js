const common = require('../common/common');
const config = require('../common/config');

async function login(param) {
  return await common.service({
    url: config.api_url + '/user/login/',
    method: 'post',
    data: param,
  });
}

async function create(param) {
  return await common.service({
    url: config.api_url + '/user/create/',
    method: 'post',
    data: param,
  });
}

async function update(param) {
  return await common.service({
    url: config.api_url + '/user/update/',
    method: 'post',
    data: param,
  });
}

async function select(param) {
  return await common.service({
    url: config.api_url + '/user/select/',
    method: 'get',
    params: param,
  });
}

async function deleteUser(param) {
  return await common.service({
    url: config.api_url + '/user/delete/',
    method: 'get',
    params: param,
  });
}

module.exports = {
  login,
  create,
  select,
  deleteUser,
  update,
};
