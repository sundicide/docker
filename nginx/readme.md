# customization
http://nginx.org/en/docs/beginners_guide.html
> The way nginx and its modules work is determined in the configuration file. By default, the configuration file is named nginx.conf and placed in the directory /usr/local/nginx/conf, /etc/nginx, or /usr/local/etc/nginx.

example of `nginx.conf`
```
server {
  listen 7060;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

# example of SSL

## docker-compose.yml
```yml
version: "3"
services:
  nginx:
    image: nginx:latest
    container_name: ${CONTAINER_NAME}
    volumes:
      - ${DIST}:/dist
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl/example.crt:/etc/nginx/example.crt
      - ./ssl/example.key:/etc/nginx/example.key
      - ./logs:/etc/nginx/logs
    ports:
      - ${PORT}:80
      - 443:443
    tty: true
```

## nginx.conf

ssl_certificate와 ssl_certificate_key의 기본 위치는 `/etc/nginx` 이다.

```conf
events {
  worker_connections  4096;  ## Default: 1024
}

http {
  default_type application/octet-stream;
  log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log   logs/access.log  main;
  sendfile     on;
  tcp_nopush   on;
  server_names_hash_bucket_size 128; # this seems to be required for some vhosts

  server {
    listen 80;
    location / {
    proxy_set_header   X-Forwarded-For $remote_addr;
    proxy_set_header   Host $http_host;
    proxy_pass         "http://example.com:9000";
    }
  }

  server {
    listen       443;
    server_name  example.com;

    ssl                  on;
    ssl_certificate      example.crt;
    ssl_certificate_key  example.key;

    ssl_session_timeout  5m;

    ssl_protocols  SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers   on;

    location ~ /\.ht {
      deny  all;
    }

    location / {
      proxy_set_header   X-Forwarded-For $remote_addr;
      proxy_set_header   Host $http_host;
      proxy_pass         "http://example.com:9000";
    }
  }
}
```
