FROM node:16.18-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD ["node", "dist/main.js"]