FROM node:20.16.0-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

RUN npm run build

CMD ["npm", "start"]