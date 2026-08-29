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
HEALTHCHECK --interval=30s --timeout=15s --start-period=20s --retries=5 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT||4173) + '/', (r) => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the persistent Node.js server
CMD ["node", "backend/server.js"]
