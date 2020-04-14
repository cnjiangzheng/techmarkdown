### 带header参数的curl请求方式
```bash
curl -X GET \
  http://127.0.0.1/ebus/acc/account/list?version=2018-12-18 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: dcb3eec8-a8ba-406c-80aa-454e2cedcd84' \
  -H 'cache-control: no-cache' \
  -H 'x-tif-nonce: 2fc62edd-03ee-4c32-8db8-e7e9c77ed05a' \
  -H 'x-tif-paasid: acc' \
  -H 'x-tif-signature: 92B5D23852D6F3F19EE9F4FCC777085D3B65F48939D87D8CB5982E71A4CE39F1' \
  -H 'x-tif-timestamp: 1556191447'
```