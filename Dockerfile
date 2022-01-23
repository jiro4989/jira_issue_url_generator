FROM node:17.4.0-alpine

COPY . /app
WORKDIR /app
RUN npm ci
