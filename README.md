# Restful & Socket API for getting cryptocurrency prices from [CryptoCompare]("https://min-api.cryptocompare.com/")


### Technologies used 🌟🌟🌍🌟🌟🌍🌟🌟
---

- [__Node.js__]("https://nodejs.org/en/"): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.


- [__Express.js__]("https://expressjs.com/") : Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.


- [__Typescript__]("https://www.typescriptlang.org/"): TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor.


- [__Ajv JSON schema validator__]("https://ajv.js.org/"): It allows implementing complex data validation logic via declarative schemas for your JSON data, without writing code.

- [__Axios__]("https://github.com/axios/axios"): Promise based HTTP client for the browser and node.js


- [__CORS(Cross-Origin Resource Sharing)__]("https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"): Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources


- [__Dotenv__]("https://www.npmjs.com/package/dotenv"): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env


- [__Helmet__]("https://github.com/helmetjs/helmet"): Helmet helps you secure your Express apps by setting various HTTP headers


- [__PostgreSQL__]("https://www.postgresql.org/"): PostgreSQL is a powerful, open source object-relational database.

- [__Redis__]("https://redis.io/"): Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker


- [__Sequelize__]("https://sequelize.org/"): Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

- [__Socket.IO__]("https://socket.io/"): Bidirectional and low-latency communication for every platform

- [__Docker__]("https://www.docker.com/"): Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels


## Request Flow
---

![First Request](https://github.com/shaban00/cryptocompare-api/raw/master/screenshots/first.png)

---

![Second Request (if data is in redis)](https://github.com/shaban00/cryptocompare-api/raw/master/screenshots/postgres.png)

---

![Second Request (if data is not in redis)](https://github.com/shaban00/cryptocompare-api/raw/master/screenshots/redis.png)



## Restful API Usage
---

- __Single Symbol Price__

URL: http://localhost:4000/api/v1/price

Query parameters:

Paramters | Type | Required
---|---|---
tryConversion | boolean | No
fsym | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No


`Eg: http://localhost:4000/api/v1/price?fsym=BTC,ETH&tsyms=usd,JPY,EUR&tryConversion=false&sign=false`


- __Multi Symbols Price__

URL: http://localhost:4000/api/v1/pricemulti

Query parameters:

Paramters | Type | Required
---|---|---
tryConversion | boolean | No
fsyms | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No

`Eg: http://localhost:4000/api/v1/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR`


- __Multi Symbols Full Data__

URL: http://localhost:4000/api/v1/pricemultifull

Query parameters:

Paramters | Type | Required
---|---|---
tryConversion | boolean | No
fsyms | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No

`Eg: http://localhost:4000/api/v1/pricemultifull?fsyms=BTC&tsyms=USD,EUR`


## Socket API Usage
---

- __Single Symbol Price__

URL: http://localhost:4000/

Query parameters:

Paramters | Type | Required
---|---|---
url_path | string | Yes (value is "price")
tryConversion | boolean | No
fsym | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No


`Eg: http://localhost:4000/?fsyms=BTC,MKR&tsyms=eur,jpy,usd&url_path=pricemulti`

- __Multi Symbols Full Data__

URL: http://localhost:4000/

Query parameters:

Paramters | Type | Required
---|---|---
url_path | string | Yes (value is "pricemulti")
tryConversion | boolean | No
fsyms | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No


- __Multi Symbols Full Data__

URL: http://localhost:4000/


Query parameters:

Paramters | Type | Required
---|---|---
url_path | string | Yes (value is "pricemultifull")
tryConversion | boolean | No
fsyms | string | Yes
tsyms | string | Yes
relaxedValidation | boolean | No
e | string | No
extraParams | string | No
sign | boolean | No


## Run application locally

`Development mode`

```bash

yarn run dev

```

`Production mode`

```bash

yarn run build

yarn start

```

## Run application with PM2

```bash

yarn run start:pm2

```


## Docker Usage
---

`Install Docker`

```bash

sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```

`Install Docker Engine`

```bash

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

```

`Install Docker Compose`

```bash

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```

## Start application on docker
---

```bash

docker-compose up

docker run --publish 8080:8080 docker-gs-ping

```


## Pull image from Docker Hub

```bash

docker pull shaban00/cryptocompare-api:1.0.0

docker run --publish 4000:4000 shaban00/cryptocompare-api

```