# syntax=docker/dockerfile:1.7
FROM node:slim AS base
WORKDIR /usr/src/app

# Copy only what’s needed first to maximize cache
COPY app/package.json ./

# If you had deps, you'd run: npm ci --only=production
# For this demo with no deps, just proceed
COPY app/ ./

EXPOSE 8080
CMD ["node", "server.js"]
