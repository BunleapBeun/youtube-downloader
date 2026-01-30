#!/bin/bash

echo "🚀 YouTube Downloader - Setup Script"
echo "===================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js is installed: $NODE_VERSION"
else
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo ""
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm is installed: $NPM_VERSION"
else
    echo "❌ npm is not installed"
    exit 1
fi

# Check yt-dlp
echo ""
echo "Checking yt-dlp installation..."
if command -v yt-dlp &> /dev/null; then
    YTDLP_VERSION=$(yt-dlp --version)
    echo "✅ yt-dlp is installed: $YTDLP_VERSION"
else
    echo "⚠️  yt-dlp is not installed"
    echo ""
    echo "Installing yt-dlp..."
    if command -v pip &> /dev/null || command -v pip3 &> /dev/null; then
        pip install --break-system-packages yt-dlp || pip3 install --break-system-packages yt-dlp
        echo "✅ yt-dlp installed successfully"
    else
        echo "❌ pip is not available"
        echo "Please install yt-dlp manually:"
        echo "  - Ubuntu/Debian: sudo apt install yt-dlp"
        echo "  - macOS: brew install yt-dlp"
        echo "  - Or visit: https://github.com/yt-dlp/yt-dlp#installation"
        exit 1
    fi
fi

# Check FFmpeg
echo ""
echo "Checking FFmpeg installation..."
if command -v ffmpeg &> /dev/null; then
    FFMPEG_VERSION=$(ffmpeg -version | head -n1)
    echo "✅ FFmpeg is installed: $FFMPEG_VERSION"
else
    echo "⚠️  FFmpeg is not installed"
    echo ""
    echo "Installing FFmpeg..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y ffmpeg
            echo "✅ FFmpeg installed successfully"
        else
            echo "❌ apt-get is not available"
            echo "Please install FFmpeg manually:"
            echo "  - Visit: https://ffmpeg.org/download.html"
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install ffmpeg
            echo "✅ FFmpeg installed successfully"
        else
            echo "❌ Homebrew is not installed"
            echo "Please install FFmpeg manually or install Homebrew first"
            exit 1
        fi
    else
        echo "Please install FFmpeg manually:"
        echo "  - Visit: https://ffmpeg.org/download.html"
        exit 1
    fi
fi

# Install npm dependencies
echo ""
echo "Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create tmp directory
echo ""
echo "Creating temporary download directory..."
mkdir -p /tmp/youtube-downloads
chmod 777 /tmp/youtube-downloads
echo "✅ Temporary directory created"

echo ""
echo "===================================="
echo "✅ Setup completed successfully!"
echo "===================================="
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
