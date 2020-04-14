```bash
#��ȡcertbot�ͻ���
wget https://dl.eff.org/certbot-auto
#���Ȩ��
chmod a+x certbot-auto
#ֹͣnginxyunx
service nginx stop
#����֤��(������) �˲������·�������ѡһִ��
./certbot-auto certonly --standalone --email `��������ַ` -d `���������ַ`
#����֤��(������)
./certbot-auto --server https://acme-v02.api.letsencrypt.org/directory -d *.qbbkj.com -d qbbkj.com --manual --preferred-challenges dns-01 certonly
```
���������ַ��ͬ�����A����������(N)����¼IP��Y�������TXT��¼���ɹ���

������������� txt��¼  ֵ����һ������������������ڿ���̨����ļ�¼�������֤����ɺ���������֤��λ�á�

��nginx������֤��
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
