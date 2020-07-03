
openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -keyout ca/private/ca_key.pem -out ca/ca_cert.pem -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=ca.mbc.edu.mo"

openssl genrsa -out server/private/server_key.pem 4096
#method1
openssl req -new -key server/private/server_key.pem -out server/server.csr -config ssl.conf 
openssl x509 -req -days 1460 -in server/server.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out server/server_cert.pem -extensions v3_req -extfile ssl.openssl genrsa -out client/private/client_key.pem 4096

openssl genrsa -out client/private/client_key.pem 4096
#method1
openssl req -new -key client/private/client_key.pem -out client/client.csr -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=client.d8.mbc.edu.mo"  
openssl x509 -req -days 1460 -in client/client.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out client/client_cert.pem -extfile client_cert_ext.cnf
openssl pkcs12 -export -inkey client/private/client_key.pem -in client/client_cert.pem -out client/clientd8.p12
###end#####