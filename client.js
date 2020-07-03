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