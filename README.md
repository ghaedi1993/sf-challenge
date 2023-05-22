## Installation

Install Docker 

```bash
Install Docker-compose version 3
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

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
#start a database for develepment
$ docker run --name development-postgres --rm -e POSTGRES_PASSWORD=development -e POSTGRES_USER=development -e POSTGRES_DB=development -p 5432:5432 postgres
```


```bash
#Remove .example from .development.env.example and .test.env.example files and provide respected data for bootstraping  


# migration 
$ npm run migration 

# seed 
$ npm run seed

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test:unit

# integration tests
# the setup file in test folder will launch postgres container for test itself just make sure port 5432 is free and .test.env
# credentials are aligned with those in setup.js for jest which spin up the container  
$ npm run test:integration
```

## Docker-Compose 
## Feel free to chang postgres & node images to alpine version if its taking long to pull

```bash 
# Boostrapping the application for development
$ npm run docker-compose:development

# Boostrapping the application for tests
$ npm run docker-compose:test
```
