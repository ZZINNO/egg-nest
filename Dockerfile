FROM node:latest

COPY . /eggnest
WORKDIR /eggnest
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 安装包

RUN npm i yarn -g --registry=https://registry.npm.taobao.org

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn

# 暴露容器端口
EXPOSE 7001

CMD yarn docker