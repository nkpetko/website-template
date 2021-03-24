openssl genrsa -des3 -out example.key 1024
openssl req -new -key example.key -out example.csr -config config.conf
openssl x509 -req -days 3650 -in example.csr -signkey example.key -out example.crt -extfile config.conf -extensions v3_req