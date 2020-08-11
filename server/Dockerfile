FROM node:lts-jessie

WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
COPY . .


CMD ["npm","run","start"]