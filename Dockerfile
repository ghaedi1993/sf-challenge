# Use the official Node.js image as the base image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project for the production in /dist folder
RUN npm run build

# Expose the port that the NestJS application will run on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
