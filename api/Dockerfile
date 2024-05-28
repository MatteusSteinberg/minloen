# Fetching the minified node image on apline linux
FROM node:slim

ENV NODE_ENV production

WORKDIR /api

# Copying package.json, yarn.lock and interfaces folder to the container
COPY ./yarn.lock /api/yarn.lock
COPY ./interfaces /interfaces
COPY ./api/package.json /api/package.json

# Installing dependencies
RUN cd /api && yarn

COPY ./api /api
# Building the application
RUN cd /api && yarn build

# Exposing server port
EXPOSE 8080

# Starting application
CMD [ "yarn", "start:prod" ]