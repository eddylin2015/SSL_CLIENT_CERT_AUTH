# SSL_CLIENT_CERT_AUTH

Self Signed Certificate CA Cert, Server Cert and Client Cert p.12 .
建立安全TLS通道.
我使用GIT自帶OPENSSL簽CA證書.

實作如下:

#CA

openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -keyout ca/private/ca_key.pem -out ca/ca_cert.pem -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=ca.mbc.edu.mo"

#Server Cert

openssl genrsa -out server/private/server_key.pem 4096
openssl req -new -key server/private/server_key.pem -out server/server.csr -config ssl.conf 
openssl x509 -req -days 1460 -in server/server.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out server/server_cert.pem -extensions v3_req -extfile ssl.conf

#Client Cert

openssl genrsa -out client/private/client_key.pem 4096
openssl req -new -key client/private/client_key.pem -out client/client.csr -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=client.d8.mbc.edu.mo"  
openssl x509 -req -days 1460 -in client/client.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out client/client_cert.pem -extfile client_cert_ext.cnf
openssl pkcs12 -export -inkey client/private/client_key.pem -in client/client_cert.pem -out clientd8.p12

###end#####

#######NodeJS Server實作###############
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

//https or tls

const tls = require('tls');
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


Client Connect
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

##########參考資料未作實#############
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