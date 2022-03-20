# How to setup development server using TypeScript and Docker

## Setup TypeScript Project
- Run `npm init -y` to initialize the project
- Run `npm i typescript --save-dev` to initialize TypeScript configuration
- Now, you have package.json (with package-lock).
- To initialize TypeScript project, run `npx tsc --init`. Then you'll have tsconfig.json
- Inside tsconfig.json there are compiler options that you could use or not use.
- Simplify tsconfig.json into this:
  ```json
  {
    "compilerOptions": {
      /* Visit https://aka.ms/tsconfig.json to read more about this file */

      /* Language and Environment */
      "target": "es6",                                     /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */

      /* Modules */
      "module": "commonjs",                                /* Specify what module code is generated. */
      "rootDir": "./src",                                  /* Specify the root folder within your source files. */
      "moduleResolution": "node",                          /* Specify how TypeScript looks up a file from a given module specifier. */
      "baseUrl": ".",                                      /* Specify the base directory to resolve non-relative module names. */
      "paths": {                                           /* Specify a set of entries that re-map imports to additional lookup locations. */ 
        "*": [
          "node_modules/*"
        ]
      },                                      
      "resolveJsonModule": true,                           /* Enable importing .json files */

      /* Emit */
      "sourceMap": true,                                   /* Create source map files for emitted JavaScript files. */
      "outDir": "./build",                                      /* Specify an output folder for all emitted files. */

      /* Interop Constraints */
      "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables allowSyntheticDefaultImports` for type compatibility. */
      "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

      /* Type Checking */
      "strict": true,                                      /* Enable all strict type-checking options. */
      "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
    }
  }
  ```
- Make a folder `src` and have a file `index.ts` inside it.
- You can write a sanity check code inside `index.ts`
- Compile typescript code by running command: `npx tsc`
- You can also watch the code by running `npx tsc -w`
- Write script commands inside `package.json`:
  ```json
  "scripts": {
    "build": "tsc",
    "dev": "node ./build/index.js"
  },
  ```

## Setup the server
- Run install `npm install express @types/express`
- Write your very first express server:
  ```javascript
  import express from 'express'


  const app = express()

  app.get('/', (req, res) => {
      res.send('Hello World!')
  })

  app.listen(5000, () => {
      console.log(`Server listening on port ${5000}`)
  })
  ```

## Setup eslint for TypeScript project
- Install:
  ```javascript
  npm install eslint eslint-config-airbnb-base eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```
- Create an `.eslintrc.json` file and write:
  ```json
  {
      "env": {
          "browser": true,
          "es2021": true
      },
      "extends": [
          "airbnb-base",
          "eslint:recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
          "ecmaVersion": 12,
          "sourceType": "module"
      },
      "plugins": [
          "@typescript-eslint"
      ],
      "rules": {
          "semi": [2, "never"],
          "import/no-unresolved": "off",
          "no-console": "off",
          "import/extensions": "off",
          "max-len": ["error", { "code": 150 }],
          "import/prefer-default-export": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "arrow-body-style": "off",
          "camelcase": "off"
      }
  }
  ```
- Add package.json scripts:
  ```json
  "scripts": {
    "build": "tsc",
    "dev": "node ./build/index.js",
    "lint": "eslint --fix --ext .ts ./src"
  },
  ```

## Setup nodemon for live reload
- Run `npm install nodemon`
- Create a file `nodemon.json` inside project's root directory. Then write this inside it:
  ```json
  {
      "watch": ["src"],
      "ext": "ts, json",
      "exec": "tsc && node ./build/index.js"
  }
  ```
- Change `dev` script inside `package.json`:
  ```json
  "scripts": {
    "build": "tsc",
    "dev": "eslint --fix --ext .ts ./src && nodemon",
    "lint": "eslint --fix --ext .ts ./src"
  },
  ```
- Now, when you run `npm run dev`, you'll see that if you change your code inside src folder. It'll live reload your server.

### Setup Docker and docker-compose
- Create a `Dockerfile` and write this:
  ```Dockerfile
  FROM node

  WORKDIR /usr/app
  COPY package*.json ./
  RUN npm install
  COPY . ./
  EXPOSE 5000
  CMD npm run dev
  ```
- Create a `docker-compose.yaml` file and write this:
  ```yaml
  version: "3"
  services:
    server:
      build:
        context: .
        dockerfile: Dockerfile
      container_name: server
      image: server
      restart: always
      volumes:
        - /usr/app/node_modules
        - ./src:/usr/app/src
        - ./build:/usr/app/build
      networks:
        - app-network
      ports:
        - "5000:5000"
  networks:
    app-network:
      driver: bridge
  ```
- Now you can build the docker image by running `docker-compose build`
- Then you can run the container by running `docker-compose up`
- Or you can simple run command `docker-compose up --build` (you'll build the images first)

### Create Makefile for simpler commands
- Create a `Makefile` and write this:
  ```Makefile
  build:
    docker-compose build

  up:
    docker-compose up

  run:
    docker-compose up --build

  down:
    docker-compose down --remove-orphans
  ```
- Now, you can build by running `make build`, etc

### Adding Postgres database service to docker-compose file
- Rewrite `docker-compose.yaml` into this:
  ```yaml
  version: "3"
  services:
    server:
      build:
        context: .
        dockerfile: Dockerfile
      container_name: server
      image: server
      restart: always
      volumes:
        - /usr/app/node_modules
        - ./src:/usr/app/src
        - ./build:/usr/app/build
      networks:
        - app-network
      ports:
        - "5000:5000"
    db:
      image: postgres
      ports:
        - "5432:5432"
      container_name: db
      env_file:
        - ".env"
      environment:
        - POSTGRES_USER=${DB_USER}
        - POSTGRES_PASSWORD=${DB_PASSWORD}
        - POSTGRES_DB=${DB_NAME}
      volumes:
        - db-volume:/var/lib/postgresql/data
  networks:
    app-network:
      driver: bridge
  volumes:
    db-volume:
      driver: local
  ```
- You can re-run by running command `make run`


## Resources:
- https://www.digitalocean.com/community/tutorials/typescript-new-project
