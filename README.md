## Installation

1- Install Docker & Docker-compose

2- Install Nodejs 

3- Install dependencies 

```bash
$ npm install
```

## Running the app
```bash
#start database 
docker run --name development-postgres --rm -e POSTGRES_PASSWORD=development -e POSTGRES_USER=development -e POSTGRES_DB=development -p 5432:5432 postgres
```


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
