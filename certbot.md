<!-- #certbot #letsencrypt-->

# Manually obtain a certificate

```sh
certbot certonly --webroot -w /var/www/html -d ${domain}
```

The web server must listen on port 80 and serve the files in the directory `/var/www/html`. `certbot` creates challenge files in the directory `/var/www/html/.well-known/acme-challenge`.

# Automatically configure nginx

```sh
certbot --nginx
```