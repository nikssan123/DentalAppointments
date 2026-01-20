# Use Node.js 20 Alpine as base
FROM node:20-alpine

# Set working directory to root
WORKDIR /
# --------------------
# Frontend build
# --------------------
COPY client/. ./client/
WORKDIR /client
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
# Copy frontend build to backend (optional)
# --------------------
# Uncomment and adjust if your backend serves frontend from /backend/public
# RUN cp -r dist/* /backend/public/

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
