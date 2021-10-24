# Wallet

## Description

Wallet is a practice project inspired by financial manager application. Where you can register, sign in, create your own type of income and expense, and write down your income/expense history. So you can manage your own money easily.

## Requirements
- Docker must be installed on you local machine.

## How to run this app
- Clone this repo (you can remove the rest and take this folder only).
- Make sure you have Docker installed.
- Create an `.env` file with this config for example:
  ```text
  DB_USER=wallet_db
  DB_PASSWORD=wallet_db
  DB_NAME=wallet_db
  DB_PORT=5432
  DB_HOST=db
  PORT=3000
  SECRET_KEY=ThisIsASecretObviously
  ```
- Run command:
  ```shell
  make up-build
  ```