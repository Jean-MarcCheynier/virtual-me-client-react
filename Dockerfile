# syntax=docker/dockerfile:1
FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /virtual-me-react

# install app dependencies
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install --production
COPY . ./
RUN yarn build --production


CMD ["serve", "-s", "build"]

