const isRunningInDocker = process.env.DOCKER_CONTAINER === 'true';
module.exports = {
    development: {
      username: "development",
      password: "development",
      database: "development",
      host: isRunningInDocker ? "postgres" : "127.0.0.1",
      dialect: "postgres"
    }, 
    test: {
      username: 'test',
      password: 'test',
      database: 'test',
      host: isRunningInDocker ? "postgres" : "127.0.0.1",
      dialect: 'postgres',
    },
  }
  