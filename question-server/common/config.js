const Config = {
    sys_mongo: "127.0.0.1:27017",
    mongo_db: "main_htgl",
    log_db: "log_htgl",
    hasUser: false, //数据库是否需要用户登录
    DB_USER: "adminUser",
    DB_PW: "adminPass",
    errLog: "../app.err",
    api_url: "http://8.140.105.168:5002",
    api_url2: "http://101.34.63.122:80",
    // api_url: "http://127.0.0.1:8001",
};

module.exports = Config;