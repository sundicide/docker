FROM r-base

ENV TZ Asia/Seoul

RUN apt-get update
RUN apt-get install -y git librsvg2-dev

RUN git clone https://github.com/dphansti/CORAL /root/copy/CORAL

COPY ./install.R /root/copy/CORAL

WORKDIR /root/copy/CORAL

RUN R < install.R --no-save
RUN R < global.R --no-save