const { execSync } = require('child_process');

// Function to start PostgreSQL Docker container before tests
const startPostgreSQLContainer = () => {
  try {
    execSync('docker run --name postgres-for-test -d --rm -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=test -p 5432:5432 postgres && sleep 5', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running PostgreSQL Docker container:', error);
  }
};

module.exports = startPostgreSQLContainer