let req = context.request, res = context.response, query = context.sourceUrl.query, cookies = [],
    domain = '; domain=' + encodeURIComponent((req.headers['host'] || '').replace(/:[0-9]+$/, '')),
    expiredDate = new Date(0).toGMTString();
let redisClient = rf.redis.GetMasterRedisClient();
let delFromRedis = key => {
    return new Promise((resolve, reject) => {
        redisClient.del(key, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
};
try {
    let reqcookies = rf.require('querystring').parse([].concat(req.headers['cookie'] || []).join('; ').replace(/&/g, '%26'), '; ');
    let wwlid = reqcookies['tif_wwlid'];
    if (wwlid) {
        delFromRedis(`tif:auth:wwl:${wwlid}`).then(() => {
            rf.writeLog('orgwwl-logout', ['redis cache delete successfully'])
        }).catch(err => {
            rf.writeLog('orgwwl-logout', ['wwlid deletion failed: ', err.stack])
        })
    }
    for (let k in reqcookies) {
        k = encodeURIComponent(k);
        cookies.push(k + '=; path=/; expires=' + expiredDate);
        cookies.push(k + '=; path=/' + domain + '; expires=' + expiredDate)
    }
    rf.writeLog('orgwwl-logout', ['cookies.length=' + cookies.length])
    let returnUrl = rf.require('url').parse(query.returnUrl || '/').path;
    res.writeHead(302, {'Set-Cookie': cookies, 'Cache-Control': 'no-cache', 'Location': returnUrl});
    res.end()
} catch (err) {
    rf.writeLog('logout_error', [req.url, err.stack]);
    res.statusCode = 500;
    res.end('SmartGate logout error')
}