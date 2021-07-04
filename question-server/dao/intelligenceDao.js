const common = require('../common/common');
const config = require('../common/config');

async function checkreport(param) {
    return await common.service({
        url: config.api_url + '/intelligence/checkreport/',
        method: 'post',
        data: param,
    });
}

async function pushReport(param) {
    return await common.service({
        url: config.api_url + '/intelligence/push/',
        method: 'post',
        data: param,
    });
}

async function getgroup(param) {
    return await common.service({
        url: config.api_url2 + '/analyse',
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

async function getProblem(param) {
    return await common.service({
        url: config.api_url2 + '/getProblem',
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

async function selectquestion(param) {
    return await common.service({
        url: config.api_url + '/intelligence/selectquestion/',
        method: 'get',
        params: param,
    });
}

async function selnogroup(param) {
    return await common.service({
        url: config.api_url + '/intelligence/selnogroup/',
        method: 'get',
        params: param,
    });
}

async function addnogroup(param) {
    return await common.service({
        url: config.api_url + '/intelligence/addnogroup/',
        method: 'post',
        data: param,
    });
}

async function updnogroup(param) {
    return await common.service({
        url: config.api_url + '/intelligence/updnogroup/',
        method: 'post',
        data: param,
    });
}

module.exports = {
    checkreport,
    pushReport,
    getgroup,
    addgroup,
    searchgroup,
    updategroup,
    delgroup,
    getProblem,
    addquestion,
    delquestion,
    selectquestion,
    selnogroup,
    addnogroup,
    updnogroup,
};
