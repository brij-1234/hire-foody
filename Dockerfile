# Use official Node.js LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching dependencies)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
