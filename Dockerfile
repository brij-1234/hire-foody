# Stage 1: Build the app
FROM node:20-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built app (dist folder) from builder
COPY --from=builder /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/src/main.js"]
