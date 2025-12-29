# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build NestJS project
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=builder /app/dist ./dist

# Expose the NestJS port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]
