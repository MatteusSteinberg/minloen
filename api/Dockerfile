# Fetching the minified node image on apline linux
FROM node:slim

WORKDIR /app

RUN mkdir api


WORKDIR /app/api
COPY ./yarn.lock .
COPY ./api/package.json .

RUN yarn
COPY ./api .

WORKDIR /app
COPY ./interfaces ./interfaces


WORKDIR /app/api
ENV NODE_ENV production
ENV CI true
RUN yarn build


EXPOSE 8080

CMD [ "yarn", "start:prod" ]