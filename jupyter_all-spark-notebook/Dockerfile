FROM jupyter/all-spark-notebook:latest

USER root

# NVM 설치
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 12.18.3
RUN mkdir -p $NVM_DIR && \
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
  . $NVM_DIR/nvm.sh && \
  nvm install $NODE_VERSION && \
  nvm alias default $NODE_VERSION && \
  nvm use default

# NVM 환경변수 설정
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# IJavascript 커널 설치
RUN npm install -g ijavascript
RUN ijsinstall

# Spark 환경 변수 설정
ENV APACHE_SPARK_VERSION=3.2.0
ENV HADOOP_VERSION=3.2

# Apache Toree 설치
RUN pip install --no-cache-dir toree && \
  jupyter toree install --sys-prefix

# Scala 커널 (Almond) 설치
RUN curl -Lo coursier https://git.io/coursier-cli && \
  chmod +x coursier && \
  ./coursier launch --fork almond -- --install && \
  rm -f coursier

# NVM 설정을 위한 스크립트 추가
RUN echo '#!/bin/bash\n\
  export NVM_DIR="/usr/local/nvm"\n\
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"\n\
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' > /usr/local/bin/setup-nvm.sh && \
  chmod +x /usr/local/bin/setup-nvm.sh

# jovyan 사용자에게 필요한 디렉토리에 대한 권한 부여
RUN mkdir -p /home/jovyan/.local/share/jupyter && \
  chown -R jovyan:users /home/jovyan/.local

USER $NB_UID

# 작업 디렉토리 설정
WORKDIR /home/jovyan/work

CMD ["/bin/bash", "-c", "source /usr/local/bin/setup-nvm.sh && start-notebook.sh --NotebookApp.token=''"]