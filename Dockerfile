# ==========================================
# AuraSketch AI — Dockerfile
# Deploy no Easypanel / Docker
# ==========================================

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all source files
COPY . .

# Create data directory for session persistence (mounted as Docker volume)
RUN mkdir -p /app/data

# Expose application port
EXPOSE 4173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:4173/api/order/status?sessionId=healthcheck || exit 1

# Start the persistent Node.js server
CMD ["node", "backend/server.js"]
