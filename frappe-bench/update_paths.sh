#!/bin/bash

# Get the current directory where the project is cloned
PROJECT_PATH=$(pwd)

# Update paths in Redis config files
sed -i "s|PROJECT_PATH|$PROJECT_PATH|g" config/redis_cache.conf
sed -i "s|PROJECT_PATH|$PROJECT_PATH|g" config/redis_queue.conf

# Update paths in Supervisor config files
sed -i "s|PROJECT_PATH|$PROJECT_PATH|g" config/supervisor.conf

echo "Paths updated successfully to $PROJECT_PATH"
