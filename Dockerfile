FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg

# Install yt-dlp
RUN pip3 install --upgrade yt-dlp

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]