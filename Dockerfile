FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /var/log && chmod -R 777 /var/log

EXPOSE 3000

CMD [ "node", "server.js" ]
