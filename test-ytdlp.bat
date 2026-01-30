@echo off
echo Testing yt-dlp installation...
echo.

echo Checking yt-dlp version:
yt-dlp --version
echo.

echo Updating yt-dlp to latest version:
pip install -U yt-dlp
echo.

echo Testing YouTube download (info only):
yt-dlp --dump-json --no-playlist "https://www.youtube.com/watch?v=jNQXAC9IVRw"
echo.

echo.
echo If you see video information above, yt-dlp is working correctly!
echo.
pause
