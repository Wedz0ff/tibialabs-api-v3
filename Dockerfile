# Use an official Node.js image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manager files first (for caching)
COPY package.json pnpm-lock.yaml prisma ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm prisma generate

# Copy the rest of the application files
COPY . .

# Build the app
RUN pnpm build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]
