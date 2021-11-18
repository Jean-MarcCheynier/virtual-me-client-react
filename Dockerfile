# syntax=docker/dockerfile:1
FROM node:14-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app

# install app dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . ./
RUN yarn build --production

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]