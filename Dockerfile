FROM node:16.13.2-alpine

COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run test-coverage
RUN npm run build
