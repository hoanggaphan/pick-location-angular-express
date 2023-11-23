
# Pick Location Angular Express

Let the user randomly choose a location on google map, then the admin will approve the scanned locations, the approved locations will be displayed in real time for the user to see.

<a id="top"></a>
## Table of contents
- [Tech Stack](#user-content-tech-stack)
- [Features](#features)
- [Requires](#requires)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Authors](#authors)

## Tech Stack

**Client:** Angular 17, Socket.io-client

**Server:** Node, Express, Socket.IO

**Database:** PostgreSQL 

## Features

- User pick a location in google map
- Users can view approved locations realtime
- Dashboard admin mange user's positions
- Login, register
- Authenticate, Authorization with jwt (store in local storage)
- Layout admin, user


## Requires

Software:

- [Nodejs](https://nodejs.org/en)

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

- [instructions for installing PostgreSQL](https://stackjava.com/postgresql/huong-dan-cai-dat-va-cau-hinh-postgresql-tren-windows.html)

- After installing nodejs, open terminal to install Angular 17
- ```bash
  npm install -g @angular/cli@17
  ```

You will need to create a project on Google Cloud to use Google's API at [console.cloud.google.com](https://console.cloud.google.com)

Then enable the following 2 APIs:
![image](https://github.com/hoanggaphan/pick-location-angular-express/assets/55527757/592c6ce8-2ce9-487a-92fd-f3ce959422f1)

Then create api key:
![image](https://github.com/hoanggaphan/pick-location-angular-express/assets/55527757/3ef08e77-3eca-483b-8840-eb190630b612)
## Environment Variables

Use api key that you created in the step above to add it in environment.ts, environment.development.ts, .env files

For environment.ts:

`production: true`

`serverUrl: 'server-url-in-production`

`apiUrl: 'server-url-in-production/api'`

`ggApiKey: 'your-api-key`

For environment.development.ts:

`production: false`

`serverUrl: 'http://localhost:3000`

`apiUrl: 'http://localhost:3000/api`

`ggApiKey: 'your-api-key'`

For .env files folder server:

`DB_HOST=localhost`

`DB_USER=postgres`

`DB_PASSWORD=your-postgres-password`

`DB_PORT=your-port`

`DB_NAME=database-name`

`APP_PORT=3000`

`NODE_ENV=development`

`GG_API_KEY=your-api-key`

`GG_PLACES_URL=https://places.googleapis.com/v1/places:searchNearby`

`ACCESS_TOKEN_LIFE=7d`

`ACCESS_TOKEN_SECRET=your-access-token-secret`

`REFRESH_TOKEN_LIFE=30d`

`REFRESH_TOKEN_SECRET=your-refresh-token-secre`

`CLIENT_URL=http://localhost:4200`

## Run Locally

Clone the project

```bash
  git clone https://github.com/hoanggaphan/pick-location-angular-express.git
```

Go to the project directory and open a terminal
```bash
  cd client
```

Install dependencies for client use npm
```bash
  npm install
```

Start the client
```bash
  ng serve --open
```

Open another terminal and
```bash
  cd server
```

Install dependencies for server use yarn or npm
```bash
  yarn
```

Start the server
```bash
  yarn dev
```


## Authors

- [@hoanggaphan](https://www.github.com/hoanggaphan)

---

<a style="float: right" href="#top"><g-emoji class="g-emoji" alias="arrow_up" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2b06.png">⬆</g-emoji>Lên đầu trang</a>
