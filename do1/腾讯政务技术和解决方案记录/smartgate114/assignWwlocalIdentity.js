if (!rule._initialized) {
    rule._initialized = true;
    let enc = encodeURIComponent, gotoLogin = (paasId, config, req, protocol, res) => {
        if (req.headers['host'] === 'smartgate.shuzhigy.com') {
            protocol = 'https://';
        }
        if (!config || !paasId || paasId === 'undefined' || (/xmlhttprequest/).test(req.headers['x-requested-with'])) {
            res.writeHead(401);
            res.write('Unauthorized: config missing or api session expired.');
        } else {
            let homeUrl = protocol + req.headers['host'] + req.url,
                authUrl = protocol + req.headers['host'] + '/_tif_wwlocal_login_/?url=' + enc(homeUrl),
                redirectUrl = req.sp_wwl_oauth_url.replace('{appid}', config.appId).replace('{agentid}', config.agentId).replace('{paasid}', paasId).replace('{redirect}', enc(authUrl));
            res.writeHead(302, {location: redirectUrl});
        }
        res.end();
    };
    let goProviceLogin = (req, res, rf, rule) => {
        let query = req.parsedUrl.query;
        let host = req.headers['host'];
        let regexp = rule.regexp;
        let username = query.username, password = query.password;
        if (username && password) {
            let getProvinceUserUrl = 'http://127.0.0.1/orgdev/sso/login?username=' + username + '&password=' + password;
            let onError = msg => {
                res.writeHead(500);
                res.end(msg.message || msg);
            };
            let data = [];
            let req3 = process.mainModule.require('http').post(getProvinceUserUrl, rest3 => {
                rest3.on('error', onError).on('data', d => data.push(d)).on('end', () => {
                    try {
                        let obj = JSON.parse(Buffer.concat(data).toString());
                        if (obj.errcode == 0 || obj.errcode == 40029) {
                            let id = Math.random().toString(16).slice(2) + Date.now().toString(16) + Math.random().toString(16).slice(2);
                            return new Promise(function (resolve, reject) {
                                if (obj.errcode == 0) {
                                    rf.cache.setCache(`tif:auth:wwl:${id}`, JSON.stringify(obj), rule.ticketValidity, function (err) {
                                        err ? reject(err) : resolve()
                                    })
                                } else {
                                    resolve();
                                }
                            }).then(() => {
                                let redirect_url = query.url;
                                let cookie = `tif_wwlid=${id};path=/;HttpOnly`;
                                if (new RegExp(regexp, 'i').test(host)) {
                                    cookie = `tif_wwlid=${id};path=/;domain=.shuzhigy.com;HttpOnly`;
                                }
                                let homeUrl = 'https://' + req.headers['host'] + req.url;
                                res.writeHead(302, {'location': homeUrl, 'set-cookie': cookie});
                                res.end();
                            })
                        } else {
                            onError(`OAuth error, get user info failed: code[${obj.errcode}], message[${obj.errmsg}]`);
                        }
                    } catch (e) {
                        onError(e);
                    }
                });
            }).on('error', onError).setTimeout(rule.timeout, () => onError('timeout'));
            req.pipe(req3);
        }
    };
    rf.assignWwlocalIdentity = (paasId, corpwxConfig, req, protocol, res, callback) => {
        let id = req.cookies['tif_wwlid'];
        let query = req.parsedUrl.query;
        let username = query.username, password = query.password;
        if (!id) {
            if (username && password) {
                goProviceLogin(req, res, rf, rule)
            } else {
                gotoLogin(paasId, corpwxConfig, req, protocol, res);
            }
        } else {
            rf.cache.getCache(`tif:auth:wwl:${id}`, true, (err, ret) => {
                if (!err && ret) {
                    ret = JSON.parse(ret);
                    callback(null, {UserId: ret.UserId, UserInfo: ret.DeviceId, ExtData: '', tags: ['0']});
                } else {
                    if (username && password) {
                        goProviceLogin(req, res, rf, rule)
                    } else {
                        gotoLogin(paasId, corpwxConfig, req, protocol, res);
                    }
                }
            });
        }
    };
}
if ((req.headers['user-agent'] || '').indexOf('wwlocal/') > -1) {
    req.sp_wwl_oauth_url = rule.authUrl;
    req.sp_assignIdentity = rf.assignWwlocalIdentity;
} else {
    req.sp_wwl_oauth_url = rule.qrandrzUrl;
}