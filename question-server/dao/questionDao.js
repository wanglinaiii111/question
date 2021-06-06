const common = require('../common/common');
const config = require('../common/config');

async function getKnowledge(param) {
  return await common.service({
    url: config.api_url + '/knowledge/getnode',
    method: 'get',
    params: param,
  });
}

async function select(param) {
  return await common.service({
    url: config.api_url + '/question/select/',
    method: 'post',
    data: param,
  });
}

async function add(param) {
  return await common.service({
    url: config.api_url + '/question/add/',
    method: 'post',
    data: param,
  });
}

async function update(param) {
  return await common.service({
    url: config.api_url + '/question/update/',
    method: 'post',
    data: param,
  });
}

async function del(param) {
  return await common.service({
    url: config.api_url + '/question/delete/',
    method: 'get',
    params: param,
  });
}

async function matching(param) {
  return await common.service({
    url: config.api_url + '/question/matching/',
    method: 'post',
    data: param,
  });
}

module.exports = {
  getKnowledge,
  select,
  add,
  update,
  del,
  matching
};
