# Use Node base image
FROM node:16

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose API port
EXPOSE 3500

# Start server
CMD ["node", "server.js"]
