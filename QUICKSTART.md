# Quick Start Guide

## Step 1: Install Prerequisites

### Install yt-dlp
```bash
# Using pip
pip install --break-system-packages yt-dlp

# Or on Ubuntu/Debian
sudo apt install yt-dlp

# Or on macOS
brew install yt-dlp
```

### Install FFmpeg
```bash
# On Ubuntu/Debian
sudo apt install ffmpeg

# On macOS
brew install ffmpeg
```

## Step 2: Run Setup Script

```bash
cd youtube-downloader
chmod +x setup.sh
./setup.sh
```

## Step 3: Start the Application

```bash
npm run dev
```

## Step 4: Open in Browser

Navigate to: http://localhost:3000

## How to Use

1. **Paste YouTube URL** in the input field
2. **Click "Get Info"** to load video details
3. **Choose download option:**
   - Click **"Download MP3"** for audio only
   - Or select video quality and click **"Download"**

## Troubleshooting

### If downloads fail:
```bash
# Update yt-dlp
pip install --break-system-packages -U yt-dlp

# Check if yt-dlp works
yt-dlp --version

# Check if FFmpeg works
ffmpeg -version
```

### If you see "command not found":
Make sure yt-dlp and FFmpeg are in your system PATH.

## Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Your app will be running on http://localhost:3000

## Notes

- Downloads are processed server-side
- Files are temporarily stored in /tmp/youtube-downloads
- Large videos may take a few minutes to process
- Respect copyright and YouTube's Terms of Service
