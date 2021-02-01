FROM node:14.15.0-alpine

WORKDIR /app
COPY package.json /app
RUN npm install --quiet

COPY . /app
RUN npm run build --quiet

ENV PORT=3000

EXPOSE 3000

