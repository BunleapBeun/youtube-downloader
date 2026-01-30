import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readFile, unlink, mkdir } from 'fs/promises'
import { existsSync, statSync } from 'fs'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  let outputPath = ''
  let tmpDir = ''
  
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json(
        { error: 'Please enter a valid YouTube URL' },
        { status: 400 }
      )
    }

    // Get video title for filename
    let videoTitle = 'audio'
    try {
      const { stdout: infoOutput } = await execAsync(
        `yt-dlp --get-title --no-playlist "${url}"`,
        { windowsHide: true, timeout: 10000 }
      )
      videoTitle = infoOutput.trim()
        .replace(/[<>:"/\\|?*]/g, '_')
        .substring(0, 60)
    } catch (err) {
      console.error('Could not get video title:', err)
    }

    // Create temp directory
    tmpDir = path.join(os.tmpdir(), 'yt-mp3-' + Date.now())
    await mkdir(tmpDir, { recursive: true })

    const outputTemplate = path.join(tmpDir, 'audio')

    // Download as MP3 with high quality - simple command
    const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 --output "${outputTemplate}.%(ext)s" --no-playlist "${url}"`

    console.log('Download command:', command)

    // Execute download
    const { stdout, stderr } = await execAsync(command, { 
      maxBuffer: 50 * 1024 * 1024,
      windowsHide: true,
      timeout: 300000 // 5 minutes timeout
    })

    if (stderr) {
      console.error('Download stderr:', stderr)
      // Check if it's a sign-in error
      if (stderr.includes('Sign in') || stderr.includes('sign in')) {
        throw new Error('This video requires sign in or is age-restricted. Please use a public video.')
      }
    }

    // Find the MP3 file
    const files = await readdir(tmpDir)
    const mp3File = files.find(f => 
      f.includes('.mp3') && 
      !f.endsWith('.part') &&
      !f.endsWith('.ytdl')
    )

    if (!mp3File) {
      throw new Error('Could not find downloaded audio file')
    }
    
    outputPath = path.join(tmpDir, mp3File)

    // Verify file
    if (!existsSync(outputPath)) {
      throw new Error('Downloaded file does not exist')
    }

    const stats = statSync(outputPath)
    if (stats.size === 0) {
      throw new Error('Downloaded file is empty')
    }

    console.log('File found:', outputPath, 'Size:', stats.size, 'bytes')

    // Read file
    const fileBuffer = await readFile(outputPath)
    
    // Set filename
    const filename = `${videoTitle}.mp3`.replace(/\s+/g, '_')

    // Clean up temp directory
    if (tmpDir && existsSync(tmpDir)) {
      await cleanup(tmpDir).catch(console.error)
    }

    // Return file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    console.error('Download error:', error.message)
    
    // Clean up on error
    if (tmpDir && existsSync(tmpDir)) {
      await cleanup(tmpDir).catch(console.error)
    }

    // User-friendly error messages
    let errorMessage = 'Failed to convert video to MP3'
    if (error.message.includes('Sign in') || error.message.includes('sign in')) {
      errorMessage = 'This video requires sign in or is age-restricted. Please use a public video.'
    } else if (error.message.includes('Private video')) {
      errorMessage = 'This is a private video'
    } else if (error.message.includes('Video unavailable')) {
      errorMessage = 'This video is unavailable'
    } else if (error.message.includes('yt-dlp') || error.message.includes('command not found')) {
      errorMessage = 'YouTube download service is currently unavailable. Please try again later.'
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Download timeout. The video might be too long or the server is busy.'
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

async function readdir(dir: string): Promise<string[]> {
  try {
    const { readdir } = require('fs/promises')
    return await readdir(dir)
  } catch {
    return []
  }
}

async function cleanup(dir: string) {
  if (existsSync(dir)) {
    const files = await readdir(dir)
    await Promise.all(
      files.map(file => unlink(path.join(dir, file)).catch(() => {}))
    )
    try {
      await require('fs/promises').rmdir(dir)
    } catch {}
  }
}

export const maxDuration = 300
export const dynamic = 'force-dynamic'