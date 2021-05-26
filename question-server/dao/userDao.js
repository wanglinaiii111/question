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

module.exports = {
    login,
    create,
};
