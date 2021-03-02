###网关关闭小于TLS1.2ssl支持
1、首先接入网关要升级为最新的0705版本
2、在接入网关的配置文件config.json里面修改responseHeadersFilter值为headers['X-Frame-Options'] = 'SAMEORIGIN';
```
......
    "ipConnectionLimit": "30000",
    "ipRequestLimit": "120000",
    "responseHeadersFilter": "headers['X-Frame-Options'] = 'SAMEORIGIN';",
    "requestHeadersFilter": "",
    "MasterRedisIP": "127.0.0.1",
......
```
3、再修改配置httpsServerOptions如下(若没有这个字段，需要新增)
```
......
    "httpsPort": 443,
	"httpsServerOptions": {
        "secureOptions": 335544320,
        "ciphers": "HIGH:!aNULL:!MD5:!EXPORT56:!EXP"
    },
    "httpsCert":"********************",
......
```
