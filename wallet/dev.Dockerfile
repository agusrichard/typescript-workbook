FROM node

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY ./dist ./dist
EXPOSE 3000
CMD npm run dev-server