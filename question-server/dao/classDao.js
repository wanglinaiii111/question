const common = require('../common/common');
const config = require('../common/config');

async function create(param) {
  return await common.service({
    url: config.api_url + '/class/create/',
    method: 'post',
    data: param,
  });
}

async function update(param) {
  return await common.service({
    url: config.api_url + '/class/update/',
    method: 'post',
    data: param,
  });
}

async function select(param) {
  return await common.service({
    url: config.api_url + '/class/select/',
    method: 'get',
    params: param,
  });
}

async function deleteClass(param) {
  return await common.service({
    url: config.api_url + '/class/delete/',
    method: 'get',
    params: param,
  });
}

module.exports = {
  create,
  select,
  deleteClass,
  update,
};
