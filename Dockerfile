FROM node:12-alpine

ENV DEBUG expresso:*,gg:*

RUN mkdir -p /usr/src/app
COPY ["./package.json", "./package-lock.json", "/usr/src/app/"]
COPY ["./src", "/usr/src/app/"]
WORKDIR /usr/src/app

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
