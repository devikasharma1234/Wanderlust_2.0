
# Use an official Node.js runtime as a parent image
FROM node:22.17.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port your app runs on (usually 8080 or 3000)
EXPOSE 8080

# Command to run your app
CMD ["node", "app.js"]