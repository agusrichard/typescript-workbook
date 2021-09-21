## this is the stage one , also know as the build step

FROM node
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm start