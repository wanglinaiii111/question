const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const config = require('../common/config');
const axios = require('axios');
const examDao = require('../dao/examDao');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

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

// router.post('/file/upload', async function (req, res, next) {
//     let p = req.body;
//     let result = await examDao.examUpload(p);
//     res.send(result);
// });

router.post('/file/upload', multipartMiddleware, (req, res, next) => {
    const formData = new FormData();
    const params = req.body;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            formData.append(key, value);
        }
    }
    const files = req.files;
    if (!Object.keys(files).length) return res.send({ msg: '请选择文件' });
    for (const key in files) {
        if (files.hasOwnProperty(key)) {
            const item = files[key];
            const { path: filePath, originalFilename } = item;
            const newPath = path.join(path.dirname(filePath), originalFilename); // 得到newPath新地址用于创建读取流
            console.log('filePath', filePath);
            console.log('newPath', newPath);
            fs.rename(filePath, newPath, (err) => {
                if (err) return;
                const file = fs.createReadStream(newPath); //创建读取流
                formData.append('file', file);
                axios
                    .post(config.api_url + '/exam/file/upload', formData, { headers: formData.getHeaders() })
                    .then((res1) => {
                        res.send(res1.data);
                    })
                    .catch((e) => {
                        res.send({ err: e });
                    })
                    .finally(() => {
                        fs.unlink(newPath, () => {});
                    });
            });
        }
    }
});

module.exports = router;
