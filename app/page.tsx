'use client'

import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import LanguageSwitcher from './components/LanguageSwitcher'
import UrlInput from './components/UrlInput'
import VideoInfo from './components/VideoInfo'
import DownloadButton from './components/DownloadButton'
import ErrorMessage from './components/ErrorMessage'
import Features from './components/Features'
import LoadingSpinner from './components/LoadingSpinner'
import ProgressBar from './components/ProgressBar'
import SuccessAlert from './components/SuccessAlert'

interface VideoInfoData {
  title: string
  thumbnail: string
  duration: string
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfoData | null>(null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [language, setLanguage] = useState<'en' | 'km'>('en')
  const [mounted, setMounted] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Fix hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  const getVideoInfo = useCallback(async () => {
    if (!url.trim()) {
      setError(language === 'en' ? 'Please enter a YouTube URL' : 'សូមបញ្ចូលតំណ YouTube')
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)
    setDownloadProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch('/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      clearInterval(progressInterval)
      setDownloadProgress(100)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video info')
      }

      setVideoInfo(data)
      
      // Reset progress
      setTimeout(() => {
        setDownloadProgress(0)
      }, 500)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setDownloadProgress(0)
    } finally {
      setLoading(false)
    }
  }, [url, language])

  const handleDownload = useCallback(async () => {
    if (!videoInfo) return

    setDownloading(true)
    setError('')
    setDownloadProgress(0)

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 500)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url, 
          quality: 'audio',
          format: 'mp3'
        }),
      })

      clearInterval(progressInterval)
      setDownloadProgress(100)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Download failed')
      }

      const contentDisposition = response.headers.get('content-disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? decodeURIComponent(filenameMatch[1]) : 'audio.mp3'

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(a)

      // Show success alert
      setSuccessMessage(
        language === 'en' 
          ? `${filename} downloaded successfully!`
          : `${filename} ទាញយកបានជោគជ័យ!`
      )
      setShowSuccess(true)

      // Reset states
      setTimeout(() => {
        setDownloading(false)
        setDownloadProgress(0)
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Download failed')
      setDownloading(false)
      setDownloadProgress(0)
      clearInterval(progressInterval)
    }
  }, [url, videoInfo, language])

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="relative">
          <div className="relative animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen responsive-px responsive-py">
      {/* Success Alert */}
      {showSuccess && (
        <SuccessAlert
          message={successMessage}
          language={language}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className={`max-w-4xl mx-auto ${language === 'km' ? 'khmer-text' : ''}`}>
        {/* Header with Language Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
          <Header language={language} />
          <LanguageSwitcher 
            language={language} 
            onLanguageChange={setLanguage} 
          />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-8 sm:mb-10">
          {/* URL Input */}
          <div className="mb-6">
            <UrlInput
              url={url}
              loading={loading || downloading}
              language={language}
              onUrlChange={setUrl}
              onGetInfo={getVideoInfo}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <ErrorMessage 
                error={error} 
                language={language}
                onClose={() => setError('')}
              />
            </div>
          )}

          {/* Loading State for Analysis */}
          {loading && (
            <div className="mb-6">
              <LoadingSpinner 
                language={language}
                type="analyzing"
              />
              <div className="mt-4 sm:mt-6">
                <ProgressBar 
                  progress={downloadProgress}
                  estimatedTime={5}
                  language={language}
                />
              </div>
            </div>
          )}

          {/* Video Info */}
          {videoInfo && !loading && (
            <div className="space-y-6">
              <VideoInfo
                title={videoInfo.title}
                thumbnail={videoInfo.thumbnail}
                duration={videoInfo.duration}
                language={language}
              />
              
              {/* Download Progress */}
              {downloading && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <LoadingSpinner 
                    language={language}
                    type="downloading"
                  />
                  <ProgressBar 
                    progress={downloadProgress}
                    estimatedTime={Math.max(1, Math.floor((100 - downloadProgress) / 10))}
                    language={language}
                  />
                </div>
              )}
              
              <DownloadButton
                downloading={downloading}
                language={language}
                onClick={handleDownload}
              />
            </div>
          )}
        </div>

        {/* Features Section - Only show when not loading and no video info */}
        {!loading && !videoInfo && (
          <div className="mb-8 sm:mb-10">
            <Features language={language} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center space-y-2 sm:space-y-3">
          <p className={`text-xs sm:text-sm text-gray-600 ${language === 'km' ? 'khmer' : ''}`}>
            {language === 'en' 
              ? 'Powered by yt-dlp • Convert responsibly' 
              : 'ដំណើរការដោយ yt-dlp • បម្លែងដោយទទួលខុសត្រូវ'}
          </p>
          <p className={`text-xs text-gray-500 ${language === 'km' ? 'khmer' : ''}`}>
            {language === 'en' 
              ? 'Developed by Beun Bunleap • © 2024' 
              : 'អភិវឌ្ឍដោយ ប៊ឺន ប៊ុនលាភ • © ២០២៤'}
          </p>
        </footer>
      </div>
    </main>
  )
}