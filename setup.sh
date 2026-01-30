#!/bin/bash

# Update yt-dlp
pip install --upgrade yt-dlp

# Install ffmpeg for audio conversion
apt-get update && apt-get install -y ffmpeg

echo "Setup completed successfully"