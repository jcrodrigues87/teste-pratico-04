FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn",  "migrate"]