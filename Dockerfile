FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
  curl \
  xz-utils

WORKDIR /opt

RUN curl -O https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-x64.tar.xz
RUN tar xf node-v8.9.3-linux-x64.tar.xz
ENV PATH="${PATH}:/opt/node-v8.9.3-linux-x64/bin"

WORKDIR /root

ADD . .
RUN npm install
ENTRYPOINT ["node", "/root/index.js"]
