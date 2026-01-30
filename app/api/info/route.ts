import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Simple URL validation
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json(
        { error: 'Please enter a valid YouTube URL' },
        { status: 400 }
      )
    }

    // Get video info with simple command
    const { stdout, stderr } = await execAsync(
      `yt-dlp --dump-json --no-playlist "${url}"`,
      { 
        windowsHide: true, 
        timeout: 30000,
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      }
    )

    if (stderr) {
      console.error('yt-dlp stderr:', stderr)
    }
    
    const videoData = JSON.parse(stdout)

    return NextResponse.json({
      title: videoData.title || 'Unknown Title',
      thumbnail: getBestThumbnail(videoData),
      duration: formatDuration(videoData.duration || 0),
    })
  } catch (error: any) {
    console.error('Error fetching video info:', error.message)
    
    let errorMessage = 'Failed to fetch video information'
    
    if (error.message.includes('Sign in') || error.message.includes('sign in')) {
      errorMessage = 'This video is age-restricted or private. Please try a public video.'
    } else if (error.message.includes('Private video')) {
      errorMessage = 'This is a private video'
    } else if (error.message.includes('Video unavailable')) {
      errorMessage = 'This video is unavailable'
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.'
    } else if (error.message.includes('yt-dlp') || error.message.includes('command not found')) {
      errorMessage = 'YouTube download service is currently unavailable. Please try again later.'
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function getBestThumbnail(videoData: any): string {
  if (videoData.thumbnail) return videoData.thumbnail
  
  if (videoData.thumbnails && videoData.thumbnails.length > 0) {
    const sorted = [...videoData.thumbnails].sort((a, b) => (b.width || 0) - (a.width || 0))
    return sorted[0].url
  }
  
  return 'https://img.youtube.com/vi/default/maxresdefault.jpg'
}