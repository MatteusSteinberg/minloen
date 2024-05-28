FROM node:slim

WORKDIR /app

RUN mkdir portal


WORKDIR /app/portal
COPY ./yarn.lock .
COPY ./portal .


WORKDIR /app
COPY ./interfaces ./interfaces


WORKDIR /app/portal
RUN yarn

ENV NODE_ENV production
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]