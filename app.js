const https = require('https');

const fs = require('fs');



const options = {

  key: fs.readFileSync('server/private/server_key.pem'),

  cert: fs.readFileSync('server/server_cert.pem'),

  ca:fs.readFileSync('ca/ca_cert.pem'),
  //fs.readFileSync('ca/ca/ca_cert.pem'),//fs.readFileSync('ca/client/client_cert.pem'),],
  // only required if used while certificate creation
  requestCert: true, 
  rejectUnauthorized: true
  //ca: [ fs.readFileSync('ca/client/client_cert.pem') ]
};

const tls = require('tls');
/*
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
*/

https.createServer(options, (req, res) => {

  res.writeHead(200);

  res.end('hello world\n');

}).listen(8443);