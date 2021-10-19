FROM node:14.17.1

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start"]
