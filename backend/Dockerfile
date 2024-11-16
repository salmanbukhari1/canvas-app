# Use Node.js as the base image
FROM node:18

# Set the working directory to `/app`
WORKDIR /app

# Copy root package.json and install root dependencies (if any)
# COPY package.json /app/
# COPY package-lock.json /app/
# RUN npm install

# WORKDIR /app
COPY . /app

# Copy functions directory separately and install dependencies there
WORKDIR /app/functions
# COPY functions/package.json .

# Install dependencies for Firebase functions
RUN npm install

# Install Firebase CLI globally
RUN npm install -g firebase-tools@latest

# Copy the entire backend directory, including functions, to the container
# WORKDIR /app
# COPY . /app

# Expose Firebase Emulator port
EXPOSE 5001

# Start Firebase Emulator
# CMD ["firebase", "emulators:start", "--only", "functions", "--project", "canvas-app-d8547"]
