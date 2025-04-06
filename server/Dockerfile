# Use Node.js base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your backend runs on
EXPOSE 5005

# Start the backend server
CMD ["npm", "start"]
