###����docker������mongo
```bash
sudo docker exec -it mongo /bin/bash
mongo
```
###�������û���¼admin��
```js
use admin;
db.auth("rio","ee06167b10a177f60766d35baa81955d");
show dbs;
```