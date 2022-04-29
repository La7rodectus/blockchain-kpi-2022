FROM node:16 AS build

ENV NODE_ENV=production

WORKDIR /usr/src/

COPY . .
COPY package.json ./

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start"]
