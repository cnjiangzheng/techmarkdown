```bash
#获取certbot客户端
wget https://dl.eff.org/certbot-auto
#添加权限
chmod a+x certbot-auto
#停止nginxyunx
service nginx stop
#生成证书(单域名) 此步和以下泛域名二选一执行
./certbot-auto certonly --standalone --email `你的邮箱地址` -d `你的域名地址`
#生成证书(泛域名)
./certbot-auto --server https://acme-v02.api.letsencrypt.org/directory -d *.qbbkj.com -d qbbkj.com --manual --preferred-challenges dns-01 certonly
```
填入邮箱地址，同意服务（A），不参与(N)，记录IP（Y），添加TXT记录，成功！

在域名解析添加 txt记录  值是上一步操作过程中输出，在控制台输出的记录后继续验证，完成后会输出两个证书位置。

在nginx中配置证书
```conf
server {
    listen 443;
    ssl on;
    ssl_certificate  /etc/letsencrypt/live/xxx.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xxx.cn/privkey.pem;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
      proxy_connect_timeout   60;
      proxy_send_timeout      60;
      proxy_read_timeout      60;
      proxy_redirect off; 
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr; 
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
      client_max_body_size 10m;
      proxy_pass http://***.***.***.***:**;
    }
}
```
