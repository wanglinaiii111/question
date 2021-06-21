const common = require('../common/common');
const config = require('../common/config');

async function checkreport(param) {
  return await common.service({
    url: config.api_url + '/intelligence/checkreport/',
    method: 'post',
    data: param,
  });
}

async function clevelreport(param) {
  return await common.service({
    url: config.api_url + '/intelligence/clevelreport/',
    method: 'post',
    data: param,
  });
}

async function addgroup(param) {
  return await common.service({
    url: config.api_url + '/intelligence/addgroup/',
    method: 'post',
    data: param,
  });
}

async function searchgroup(param) {
    return await common.service({
        url: config.api_url + '/intelligence/sgroup/',
        method: 'get',
        params: param,
    });
}

async function delgroup(param) {
    return await common.service({
        url: config.api_url + '/intelligence/delgroup/',
        method: 'get',
        params: param,
    });
}

async function updategroup(param) {
  return await common.service({
    url: config.api_url + '/intelligence/ugroup/',
    method: 'post',
    data: param,
  });
}

async function addquestion(param) {
  return await common.service({
    url: config.api_url + '/intelligence/addquestion/',
    method: 'post',
    data: param,
  });
}

async function delquestion(param) {
    return await common.service({
        url: config.api_url + '/intelligence/delquestion/',
        method: 'get',
        params: param,
    });
}

module.exports = {
  checkreport,
  clevelreport,
  addgroup,
  searchgroup,
  updategroup,
  delgroup,
  addquestion,
  delquestion,
};
