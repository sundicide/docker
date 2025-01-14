# Base image 사용
FROM fluent/fluentd:v1.16-debian-1

# 시스템 패키지 및 필요한 플러그인 설치
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    ruby-dev && \
    gem install \
    fluent-plugin-elasticsearch \
    fluent-plugin-parser-cri \
    fluent-plugin-kubernetes_metadata_filter \
    fluent-plugin-rewrite-tag-filter && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/* /var/tmp/* /usr/lib/ruby/gems/*/cache/*.gem

# fluentd 설정 파일
USER fluent