# YouTube Video & MP3 Downloader - Complete Setup Instructions

## 📋 What You Get

A fully functional Next.js web application that allows users to:
- ✅ Download YouTube videos in any available quality (360p to 2160p)
- ✅ Convert YouTube videos to high-quality MP3 audio
- ✅ Modern, responsive UI with real-time progress
- ✅ Backend API powered by yt-dlp
- ✅ Production-ready code

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Prerequisites

You need these tools installed on your system:

#### **yt-dlp** (YouTube downloader)
```bash
# Option 1: Using pip (recommended)
pip install --break-system-packages yt-dlp

# Option 2: On Ubuntu/Debian
sudo apt update && sudo apt install yt-dlp

# Option 3: On macOS
brew install yt-dlp

# Verify installation
yt-dlp --version
```

#### **FFmpeg** (for MP3 conversion)
```bash
# On Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# On macOS
brew install ffmpeg

# Verify installation
ffmpeg -version
```

#### **Node.js** (v18 or higher)
```bash
# Check if already installed
node --version

# If not installed, download from: https://nodejs.org/
```

---

### Step 2: Install & Run

```bash
# Navigate to the project folder
cd youtube-downloader

# Run the automated setup script
chmod +x setup.sh
./setup.sh

# The script will:
# - Check all prerequisites
# - Install npm dependencies
# - Create necessary directories
# - Verify everything is working
```

---

### Step 3: Start the Application

```bash
# Start development server
npm run dev
```

Open your browser and go to: **http://localhost:3000**

---

## 💡 How to Use

1. **Paste YouTube URL**
   - Copy any YouTube video URL
   - Paste it into the input field
   - Click "Get Info"

2. **Download Options**
   - **For MP3**: Click the green "Download MP3" button
   - **For Video**: Choose your quality (360p, 720p, 1080p, etc.) and click "Download"

3. **Wait & Save**
   - The video/audio will be processed
   - Your browser will automatically download the file

---

## 🏗️ Project Structure

```
youtube-downloader/
├── app/
│   ├── api/
│   │   ├── download/route.ts    # Handles video/MP3 downloads
│   │   └── info/route.ts        # Fetches video information
│   ├── page.tsx                 # Main UI component
│   ├── layout.tsx               # App layout
│   └── globals.css              # Global styles
├── public/                      # Static assets
├── package.json                 # Dependencies
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind CSS config
├── setup.sh                     # Automated setup script
├── README.md                    # Detailed documentation
└── QUICKSTART.md               # Quick reference guide
```

---

## 🔧 Manual Installation (Alternative)

If the setup script doesn't work, follow these manual steps:

```bash
# 1. Navigate to project
cd youtube-downloader

# 2. Install Node dependencies
npm install

# 3. Create temp directory
mkdir -p /tmp/youtube-downloads
chmod 777 /tmp/youtube-downloads

# 4. Start development server
npm run dev
```

---

## 🌐 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Note**: For production deployment, you'll need a server that can run Node.js and has yt-dlp/FFmpeg installed.

---

## ❗ Troubleshooting

### Problem: "yt-dlp: command not found"
**Solution**:
```bash
# Install yt-dlp
pip install --break-system-packages yt-dlp

# Add to PATH if needed
export PATH="$HOME/.local/bin:$PATH"
```

### Problem: "ffmpeg: command not found"
**Solution**:
```bash
# Install FFmpeg
sudo apt install ffmpeg  # Ubuntu/Debian
brew install ffmpeg      # macOS
```

### Problem: Downloads fail or timeout
**Solution**:
- Update yt-dlp: `pip install --break-system-packages -U yt-dlp`
- Check internet connection
- Some videos may be age-restricted or region-locked
- Try a different video URL

### Problem: Port 3000 already in use
**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev
```

### Problem: npm install fails
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Features

- ✅ **Multiple Quality Options**: Download in 360p, 480p, 720p, 1080p, 1440p, or 2160p
- ✅ **MP3 Conversion**: High-quality audio extraction
- ✅ **Real-time Info**: Shows video title, thumbnail, and duration
- ✅ **Progress Indicators**: Visual feedback during downloads
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **TypeScript**: Full type safety
- ✅ **Modern Stack**: Next.js 14, React 18, Tailwind CSS

---

## 📝 API Endpoints

### GET Video Info
```bash
POST /api/info
Body: { "url": "https://youtube.com/watch?v=..." }
```

### Download Video/MP3
```bash
POST /api/download
Body: { 
  "url": "https://youtube.com/watch?v=...",
  "quality": "1080p",
  "format": "mp4"  # or "mp3"
}
```

---

## ⚖️ Legal Notice

This tool is for **educational purposes** only. 

- Only download videos you have permission to download
- Respect copyright laws and YouTube's Terms of Service
- This tool should not be used to infringe on content creators' rights

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Tools**: yt-dlp (video download), FFmpeg (conversion)

---

## 📞 Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Verify all prerequisites are installed correctly
3. Make sure you're using a valid YouTube URL
4. Check the browser console for error messages

---

## 🎉 You're All Set!

Run `npm run dev` and start downloading! 🚀

Your application will be available at: **http://localhost:3000**
