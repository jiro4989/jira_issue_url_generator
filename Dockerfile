FROM node:17.4.0-alpine

COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run test-coverage
RUN npm run build
