# Use the official Node.js image as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN npm run build

ARG APPLICATION_PORT
# We add DOCKER_CONTAINER as ENV_VAR 
# so on we check it for solving the POSTGRE_HOST problem(localhost or postgres using dns inside docker)
ARG DOCKER_CONTAINER
ENV DOCKER_CONTAINER=${DOCKER_CONTAINER}

# Expose the port that the NestJS application will run on
EXPOSE ${APPLICATION_PORT}

# Start the NestJS application
CMD ["npm", "run", "start"]
