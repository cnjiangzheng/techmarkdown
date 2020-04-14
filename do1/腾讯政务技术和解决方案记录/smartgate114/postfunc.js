// let http = process.mainModule.require('http');
let http = require('http');
console.log(1);
http.request({
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    path: '/',
    hostname: 'www.qq.com',
    port: 80
}, (res) => {
    let arr = [];
    res.on("data", buffer => {
        arr.push(buffer);
    });
    res.on("end", () => {
        console.log('' + arr);
    });

}).on('error', (e) => {
    console.log(123)
}).end();
console.log(3);