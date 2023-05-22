## Installation

1- Install Docker & Docker-compose version 3


```bash
# Install nvm and node
$ curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
$ export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
$ nvm  install node
```


```bash
#Install dependencies 

$ npm install
```

## Running the app
```bash
#start database 
$ docker run --name development-postgres --rm -e POSTGRES_PASSWORD=development -e POSTGRES_USER=development -e POSTGRES_DB=development -p 5432:5432 postgres
```


```bash
#Remove .example from .development.env.example and .test.env.example files and provide respected data for bootstraping  


# migration 
$ npm run migration 

# seed 
$ npm run seed

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
$ npm run test:integration
```
