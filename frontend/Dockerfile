FROM node:22 as build
WORKDIR /app

RUN apt update && apt upgrade -y
RUN apt install -y nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install
COPY . .
RUN npm run build

COPY ./dist /usr/share/nginx/html

EXPOSE 80
