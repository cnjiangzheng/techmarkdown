###进入docker容器和mongo
```bash
sudo docker exec -it mongo /bin/bash
mongo
```
###用网关用户登录admin库
```js
use admin;
db.auth("rio","ee06167b10a177f60766d35baa81955d");
show dbs;
```