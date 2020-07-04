# SSL_CLIENT_CERT_AUTH

## Self Signed Certificate CA Cert, Server Cert and Client Cert p.12 .
## 建立安全TLS通道.

    我使用GIT自帶OPENSSL簽CA證書.HTTPS SEVER只有分派 4096 bit CLIENT CA的用戶才能訪問,否則拒絶連接.書寫一些實作和應用場景.以下先提供一些實作代碼,往後補充操作具体內容,和支持不同WEB Site(Apahce,Ngnix)及程式例如對PYTHON支授.我認為有一定應為空間,及安全性求要高程式應用提供一種方案.

* 1.PATH
```js
md CA
md CA/PRIVATE
md SERVER
md SERVER/PRIVATE
md CLIENT
md CLIENT/PRIVATE
```
* 2.實作如下:
### Make Certificates
```js
rem CA

openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -keyout ca/private/ca_key.pem -out ca/ca_cert.pem -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=ca.mbc.edu.mo"

rem Server Cert

openssl genrsa -out server/private/server_key.pem 4096
openssl req -new -key server/private/server_key.pem -out server/server.csr -config ssl.conf 
openssl x509 -req -days 1460 -in server/server.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out server/server_cert.pem -extensions v3_req -extfile ssl.conf

rem Client Cert

openssl genrsa -out client/private/client_key.pem 4096
openssl req -new -key client/private/client_key.pem -out client/client.csr -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=client.d8.mbc.edu.mo"  
openssl x509 -req -days 1460 -in client/client.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out client/client_cert.pem -extfile client_cert_ext.cnf
openssl pkcs12 -export -inkey client/private/client_key.pem -in client/client_cert.pem -out clientd8.p12
```

### NodeJS Server實作
```js
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('server/private/server_key.pem'),
  cert: fs.readFileSync('server/server_cert.pem'),
  ca:fs.readFileSync('ca/ca_cert.pem'),
  requestCert: true, 
  rejectUnauthorized: true
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8443); 

```
### tls
```js
const tls = require('tls');
const fs = require('fs');
const options = {
  key: fs.readFileSync('server/private/server_key.pem'),
  cert: fs.readFileSync('server/server_cert.pem'),
  ca:fs.readFileSync('ca/ca_cert.pem'),
  requestCert: true, 
  rejectUnauthorized: true
};
const server = tls.createServer(options, (socket) => {
    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');    
    socket.on('error', (error) => {
        console.log(error);
    });
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(process.stdout);
    socket.pipe(socket);
});
server.listen(8443, () => {    console.log('server bound');});
```
# Client Connect
```js
const tls = require('tls');
const fs = require('fs');
const options = {
    ca: fs.readFileSync('ca/ca_cert.pem'),
    key: fs.readFileSync('client/private/client_key.pem'),
    cert: fs.readFileSync('client/client_cert.pem'),
    host: 'd8.mbc.edu.mo',
    port: 8443,
    rejectUnauthorized:true,
    requestCert:true
};
const socket = tls.connect(options, () => {
    console.log('client connected', 
        socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
    console.log(data);
});
socket.on('error', (error) => {
    console.log(error);
});
socket.on('end', (data) => {
    console.log('Socket end event');
});
```
# 參考資料未作實
```python
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('server/server_cert.pem', 'server/private/server_key.pem')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0) as sock:
    sock.bind(('127.0.0.1', 8443))
    sock.listen(5)
    
    with context.wrap_socket(sock, server_side=True) as ssock:
        conn, addr = ssock.accept()
        ...

import requests
resp = requests.get('https://d8.mbc.edu.mo:8443', cert=('client/client_cert.pem', 'client/private/client_key.pem'))

print resp.status_code
print resp.text
```
# 參考 Markdown 寫法
粗體
**bold**
標題字
# This is an <h1> tag
次標題字
## This is an <h2> tag
小標題字
###### This is an <h6> tag

列表

    在同一個主題之下要一一列出內容時，我們常用列表來表示，例如：討論專案中需要哪些功能，或是說明要修改的內容有哪些。

* Item 1
* Item 2
  * Item 2a
  * Item 2b
- [x] This is a complete item
- [ ] This is an incomplete item

區塊

`Format one word or one line`

    code (4 spaces indent)

插入圖片語法

![GITHUB]( http://icoffeebread.appspot.com/static/logo.PNG "coffee bread")

階層式區塊
   階層式區塊在表現結構或功能關係上是相當好用的呈現形式

階層式區塊語法：

> Quote one sentences
>>Quote two sentences
>>Quote two sentences
>>>Quote three sentences

https://guides.github.com/features/mastering-markdown/
