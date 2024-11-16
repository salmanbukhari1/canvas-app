# Use an official Node.js image as the base image
FROM node:18

# Install dependencies required for the 'canvas' package
RUN apt-get update && \
    apt-get install -y \
    libjpeg-dev \
    libcairo2-dev \
    libpango1.0-dev \
    libgif-dev \
    build-essential \
    g++

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies (including canvas)
RUN npm install

RUN npm install node-libs-browser

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 to access the application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
