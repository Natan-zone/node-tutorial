FROM node:18-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm ci --production

COPY . .

ENTRYPOINT [ "node", "app.js" ]
