# Fetching the latest node image on alpine linux
FROM node:lts-alpine

# Declaring env
#ENV NODE_ENV production

# Setting up the work directory
WORKDIR /portal

# Installing dependencies
COPY package.json yarn.lock ./

RUN yarn install

# Copying all the files in our project
COPY . .

# Building our application
RUN yarn build

EXPOSE 3000

# Starting our application
CMD ["yarn","start"]