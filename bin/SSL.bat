@echo off

call openssl genrsa -out ssl\key.pem
call openssl req -new -key ssl\key.pem -out ssl\csr.pem
call openssl x509 -req -days 9999 -in ssl\csr.pem -signkey ssl\key.pem -out ssl\cert.pem
del ssl\csr.pem
