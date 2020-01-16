FROM node:12.14.0

RUN mkdir -p api_getway

WORKDIR /api_getway

COPY . .

RUN npm install -qy

CMD ["nodemon", "start"]