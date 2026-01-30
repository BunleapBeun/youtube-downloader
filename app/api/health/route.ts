import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Test if yt-dlp is working
    const { stdout, stderr } = await execAsync('yt-dlp --version', {
      timeout: 5000
    })
    
    return NextResponse.json({
      status: 'ok',
      ytdlp_version: stdout.trim(),
      message: 'Service is operational'
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      message: 'yt-dlp is not working properly'
    }, { status: 500 })
  }
}