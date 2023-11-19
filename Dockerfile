FROM node:18.16.0-alpine3.17

EXPOSE 7777

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

CMD [ "npm", "start"]
