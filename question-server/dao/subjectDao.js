const common = require('../common/common');
const config = require('../common/config');

async function select(param) {
  return await common.service({
    url: config.api_url + '/subject/select/',
    method: 'get',
    params: param,
  });
}

module.exports = {
  select,
};
