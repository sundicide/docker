FROM r-base

ENV TZ Asia/Seoul

RUN apt-get update
RUN apt-get install -y git librsvg2-dev curl libssl-dev libcurl4-openssl-dev libxml2-dev

WORKDIR /volumes

RUN R < install.R --no-save