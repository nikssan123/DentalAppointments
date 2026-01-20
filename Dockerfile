# Use Node.js 20 Alpine as base
FROM node:20-alpine

# Set working directory to root
WORKDIR /
# --------------------
# Frontend build
# --------------------
COPY client/. ./client/
WORKDIR /client

ENV REACT_APP_API_URL=https://smileupgrade.net/

RUN npm install && npm run build

# Set working directory to root
WORKDIR /

# --------------------
# Backend dependencies
# --------------------
COPY backend/. ./backend/
WORKDIR /backend
RUN npm install

# --------------------
# Final backend
# --------------------
WORKDIR /backend
# Copy backend again if needed (optional)
# COPY backend/. ./backend/

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["npm", "start"]
