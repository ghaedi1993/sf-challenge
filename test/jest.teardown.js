const { execSync } = require('child_process');

// Function to stop the PostgreSQL Docker container after all tests
const stopPostgreSQLContainer = () => {
  try {
    execSync('docker stop postgres-for-test', { stdio: 'ignore' });
  } catch (error) {
    console.error('Error stopping PostgreSQL Docker container:', error);
  }
};

module.exports = stopPostgreSQLContainer