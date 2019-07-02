FROM node:10-alpine as builder

WORKDIR /usr/src/build

ADD package.json /usr/src/build
ADD package-lock.json /usr/src/build
RUN npm install --registry=https://registry.npm.taobao.org

COPY . /usr/src/build
RUN npm run build

FROM node:10-alpine

COPY --from=builder /usr/src/build/dist /usr/src/app/dist
COPY --from=builder /usr/src/build/index.js /usr/src/app
COPY --from=builder /usr/src/build/package.server.json /usr/src/app/package.json

RUN npm install --registry=https://registry.npm.taobao.org

ENTRYPOINT ["node","index"] 
EXPOSE 3000

