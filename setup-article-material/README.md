# How to setup development server using TypeScript and Docker

## Setup TypeScript Project
- Run `npm init -y` to initialize the project
- Run `npm i typescript --save-dev` to initialize TypeScript configuration
- Now, you have package.json (with package-lock) and tsconfig.json
- Inside tsconfig.json there are compiler options that you could use or not use.
- Uncomment:
  - "outDir": "./build",

## Resources:
- https://www.digitalocean.com/community/tutorials/typescript-new-project