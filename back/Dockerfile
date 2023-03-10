FROM node:16.13.1-alpine

WORKDIR /usr/app/

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:migrate" ]