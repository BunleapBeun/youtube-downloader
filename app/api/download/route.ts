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
        { windowsHide: true }
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

    // Download as MP3 with high quality
    const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 --output "${outputTemplate}.%(ext)s" --no-playlist "${url}"`

    console.log('Download command:', command)

    // Execute download
    const { stdout, stderr } = await execAsync(command, { 
      maxBuffer: 50 * 1024 * 1024,
      windowsHide: true,
    })

    if (stderr && !stderr.includes('WARNING:')) {
      console.error('Download error:', stderr)
    }

    // Find the MP3 file
    const mp3File = 'audio.mp3'
    outputPath = path.join(tmpDir, mp3File)

    // Verify file
    if (!existsSync(outputPath)) {
      throw new Error('Could not find downloaded MP3 file')
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
      const files = await readdir(tmpDir)
      await Promise.all(
        files.map(file => unlink(path.join(tmpDir, file)).catch(() => {}))
      )
      try {
        await require('fs/promises').rmdir(tmpDir)
      } catch {}
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
    console.error('Download error:', error)
    
    // Clean up on error
    if (tmpDir && existsSync(tmpDir)) {
      await cleanup(tmpDir).catch(console.error)
    }

    // User-friendly error messages
    let errorMessage = 'Failed to convert video to MP3'
    if (error.message.includes('Video unavailable')) {
      errorMessage = 'This video is unavailable'
    } else if (error.message.includes('Private video')) {
      errorMessage = 'This is a private video'
    } else if (error.message.includes('Sign in')) {
      errorMessage = 'This video requires sign in'
    } else if (error.message.includes('yt-dlp')) {
      errorMessage = 'yt-dlp is not installed. Please install it first.'
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