# Steps to reproduce

## Dependencies

### Packages

```sh
apt update
apt upgrade
apt install sudo curl npm nginx certbot python3-certbot-nginx
```

### Nginx Configs

```nginx
server {

        listen 80;
        listen [::]:80;

        server_name chat.nasram.net;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

```nginx
server {

        listen 80;
        listen [::]:80;

        server_name faas.nasram.net;

        location / {
                proxy_pass http://localhost:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

}
```

### get https certificates

`certbot --nginx --register-unsafely-without-email`

## Install server

### [Arkade](https://github.com/alexellis/arkade)

`curl -sLS https://get.arkade.dev | sudo sh`

### [faasd](https://github.com/openfaas/faasd)

```sh
git clone https://github.com/openfaas/faasd --depth=1
cd faasd
./hack/install.sh
```

### Check faasd is running

`ss -tna`

### Login to the gateway

`localhost` can lead to problems, so use 127.0.0.1

```sh
sudo cat /var/lib/faasd/secrets/basic-auth-password \
| faas-cli login --username admin --password-stdin --gateway http://127.0.0.1:8080
sudo cat /var/lib/faasd/secrets/basic-auth-password
```

locally

```sh
echo pass | faas-cli login --username admin --password-stdin --gateway https://faas.nasram.net
```

## Deploy test function

`faas-cli store deploy figlet`
`echo Hallo Welt | faas-cli invoke figlet`

## Deploy using squid

### On your machine

```sh
npx squid lambda build -p nasram1337 -g https://faas.nasram.net
npx squid lambda push
npx squid lambda deploy
```

### On the openfaas server

```sh
git clone https://github.com/NilsRamstoeck/SquidChat.git
cd ./SquidChat
npm i
npm run build
npm start
```
