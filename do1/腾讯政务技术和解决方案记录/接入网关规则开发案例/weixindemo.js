(() => {
    function getWxToken() {
        let wxSetting = {'appId': 'wxbd9d6d1e0ae315c5', 'appSecret': 'e9fe955ffb396c5399b37e5244aa9120'};
        let wxParam = {};
        wxParam.appId = wxSetting.appId;
        wxParam.appSecret = wxSetting.appSecret;
        let apiUrl = 'https://api.weixin.qq.com/cgi-bin/token';
        rf.writeLog('getWxToken_devlog', ['1']);
        return new Promise(function (resolve, reject) {
            let reqHeaders = {'x-tif-paasid': "huawei", 'content-type': 'application/x-www-form-urlencoded'};
            let reqBody = {};
            let token = {};
            rf.http.post(apiUrl + '?grant_type=client_credential&appid=' + wxParam.appId + '&secret=' + wxParam.appSecret, '{}', reqHeaders).then(function (ret) {
                rf.writeLog('getWxToken_devlog', ['2']);
                let obj = ret;
                console.log(ret);
                if (obj.access_token) {
                    rf.writeLog('getWxToken_devlog', ['resolve']);
                    resolve(obj);
                    rf.writeLog('getWxToken_devlog', ['resolve_end']);
                } else {
                    rf.writeLog('getWxToken_devlog', ['reject']);
                    reject(obj);
                    rf.writeLog('getWxToken_devlog', ['reject_end']);
                }
            }).catch(function (err) {
                rf.writeLog('getWxToken_devlog', ['3']);
                reject(err);
            })
        })
    }

    return getWxToken().then(value => {
        console.log(value);
        context.response.statusCode = 200;
        context.response.end(JSON.stringify(value));
    }).catch(err => {
        console.log(err);
        context.response.statusCode = 500;
        context.response.end(JSON.stringify(err));
    });
})()


// context.response.statusCode = 200;
// context.response.end(rf.stringify(v));

// getWxToken().then(function (v) {
//     context.response.statusCode = 200;
//     context.response.end(rf.stringify(v));
// }).catch(function (err) {
//     context.response.statusCode = 500;
//     context.response.end(rf.stringify(err));
// })