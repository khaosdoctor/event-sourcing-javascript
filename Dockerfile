FROM node:16-alpine

ENV DEBUG expresso:*

RUN mkdir -p /app
COPY ["./package.json", "./package-lock.json", "/app/"]
COPY ["./src/", "/app/src/"]
WORKDIR /app

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
