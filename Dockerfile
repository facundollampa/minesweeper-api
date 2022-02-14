FROM node:16.14.0-alpine3.15

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]