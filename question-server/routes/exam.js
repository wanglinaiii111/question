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

router.get('/delete/gradereport', async function (req, res, next) {
    let p = req.query;
    let result = await examDao.delGradeReport(p);
    res.send(result);
});

router.get('/select/gradereport', async function (req, res, next) {
    let p = req.query;
    let result = await examDao.selectGradeReport(p);
    res.send(result);
});

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

let request = require('request');
router.get('/download', async function (req, res, next) {
    let p = req.query;
    request
        .post({
            url: config.api_url + '/exam/file/download',
            json: req.query,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        })
        .on('response', function (response) {
            if (response.statusCode != '200') {
                res.send({ desc: '服务器500' });
                return;
            }

            // 直接转回前端
            this.pipe(res);
            return;
            // 下载到文本再转回前端
            let filePath = path.join(__dirname, req.query.filename);
            let file = fs.createWriteStream(filePath);
            response.pipe(file).on('close', function (err) {
                console.log('文件下载完毕');
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=' + req.query.filename,
                });
                var fileStream = fs.createReadStream(filePath);
                fileStream.on('data', function (data) {
                    res.write(data, 'binary');
                });
                fileStream.on('end', function () {
                    res.end();
                    console.log('The file has been downloaded successfully!');
                });
            });
        });

    // axios
    //     .post(
    //         config.api_url + '/exam/file/download',
    //         { filename: p.filename },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/octet-stream',
    //             },
    //         }
    //     )
    //     .then((res1) => {
    //         res.pipe(res1);
    //     })
    //     .catch((e) => {
    //         res.send({ err: e });
    //     })
    //     .finally(() => {});
});

module.exports = router;
