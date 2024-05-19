# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /api

COPY package.json yarn.lock ./

# Installing dependencies
RUN yarn install

# Copying all the files in our project
COPY . .

run yarn build

# Exposing server port
EXPOSE 8080

# Starting our application
CMD [ "yarn", "start:prod" ]