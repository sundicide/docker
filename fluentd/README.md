## How To Use

1. docker-compose up
2. docker exec -it fluentd-sender-nodejs /bin/bash
    1. npm install
    2. noode index.js

## Info
* can restart fluentd service with below code

```shell
docker kill -s SIGHUP fluentd-fluentd-1
```

