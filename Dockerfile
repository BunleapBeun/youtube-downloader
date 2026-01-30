# Use Node.js base image
FROM node:18-alpine

# Install Python, yt-dlp, and FFmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg

# Install yt-dlp
RUN pip3 install --break-system-packages yt-dlp

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
