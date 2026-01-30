# YouTube Video & MP3 Downloader

A full-stack Next.js application for downloading YouTube videos in various qualities or converting them to MP3 format.

## Features

- 🎥 Download YouTube videos in original quality
- 🎵 Convert YouTube videos to MP3 audio
- 📊 Multiple quality options (2160p, 1440p, 1080p, 720p, 480p, 360p)
- 🚀 Fast and reliable downloads
- 💎 Modern, responsive UI built with Tailwind CSS
- ⚡ Real-time video information fetching

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (v18 or higher)
   ```bash
   # Check if installed
   node --version
   ```

2. **yt-dlp** (YouTube downloader)
   ```bash
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install yt-dlp
   
   # On macOS
   brew install yt-dlp
   
   # Using pip
   pip install yt-dlp
   
   # Or download binary from: https://github.com/yt-dlp/yt-dlp#installation
   ```

3. **FFmpeg** (for audio conversion)
   ```bash
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install ffmpeg
   
   # On macOS
   brew install ffmpeg
   ```

## Installation

1. **Navigate to the project directory**
   ```bash
   cd youtube-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste YouTube URL**
   - Enter any valid YouTube video URL in the input field
   - Click "Get Info" to fetch video information

2. **Choose Download Option**
   - **Download as MP3**: Click the green "Download MP3" button for audio only
   - **Download Video**: Select your preferred quality and click "Download"

3. **Wait for Download**
   - The file will be processed and automatically downloaded to your device

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Project Structure

```
youtube-downloader/
├── app/
│   ├── api/
│   │   ├── download/
│   │   │   └── route.ts       # Download endpoint
│   │   └── info/
│   │       └── route.ts       # Video info endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page component
├── public/                    # Static files
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## API Endpoints

### POST /api/info
Fetches video information including title, thumbnail, duration, and available formats.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": "5:32",
  "formats": [
    {
      "quality": "1080p",
      "format": "mp4",
      "filesize": "45.2MB"
    }
  ]
}
```

### POST /api/download
Downloads the video in specified quality or converts to MP3.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "quality": "1080p",
  "format": "mp4"
}
```

**Response:** Binary file stream

## Troubleshooting

### yt-dlp not found
Make sure yt-dlp is installed and available in your system PATH:
```bash
which yt-dlp
yt-dlp --version
```

### FFmpeg not found
Install FFmpeg for audio conversion:
```bash
# Check if installed
ffmpeg -version
```

### Permission errors
Ensure the /tmp directory has write permissions:
```bash
sudo chmod 777 /tmp
```

### Video download fails
- Check your internet connection
- Verify the YouTube URL is valid
- Some videos may be restricted or age-gated
- Try updating yt-dlp: `pip install -U yt-dlp`

## Legal Notice

This tool is for educational purposes only. Please respect copyright laws and YouTube's Terms of Service. Only download videos you have the right to download.

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **yt-dlp** - YouTube video downloader
- **FFmpeg** - Audio/video processing

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues, please check the troubleshooting section or open an issue on GitHub.
