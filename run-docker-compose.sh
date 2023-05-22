#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker and try again."
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose is not installed. Please install Docker Compose and try again."
  exit 1
fi

if [[ "$1" == "test" ]]; then
  docker-compose --env-file .test.env up --build
elif [[ "$1" == "development" ]]; then
  docker-compose --env-file .development.env up --build
else
  echo "Invalid option: $1"
  exit 1
fi
