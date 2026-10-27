# Secure React App

A small React client for the sibling Rust API in `rust-workbook/secure-rest-api`.

## Run locally

Start the backend first (it listens on port 3000):

```sh
cd /Users/agusrichard/Documents/personal/workbook/rust-workbook/secure-rest-api
cargo run
```

Then start this frontend:

```sh
npm run dev
```

Open the URL printed by Vite. Development requests to `/auth` and `/api` are proxied to `http://localhost:3000`, which also keeps the refresh cookie same-origin from the browser's point of view.

## Included flows

- Create an account
- Sign in
- Restore a session with the HTTP-only refresh cookie
- Request the protected `/api/me` endpoint
- Sign out

The short-lived access token is kept in memory rather than local storage.
