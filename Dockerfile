FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

RUN npm run start