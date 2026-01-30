'use client'

import { useState, useEffect } from 'react'

interface ProgressBarProps {
  progress: number
  estimatedTime?: number
  language: 'en' | 'km'
}

const translations = {
  en: {
    downloading: 'Downloading',
    processing: 'Processing',
    converting: 'Converting',
    finalizing: 'Finalizing',
    timeRemaining: 'Remaining:'
  },
  km: {
    downloading: 'កំពុងទាញយក',
    processing: 'កំពុងដំណើរការ',
    converting: 'កំពុងបម្លែង',
    finalizing: 'កំពុងបញ្ចប់',
    timeRemaining: 'នៅសល់:'
  }
}

export default function ProgressBar({ progress, estimatedTime, language }: ProgressBarProps) {
  const [phase, setPhase] = useState(0)
  const t = translations[language]

  // Simulate different phases based on progress
  useEffect(() => {
    if (progress < 25) setPhase(0) // Downloading
    else if (progress < 50) setPhase(1) // Processing
    else if (progress < 75) setPhase(2) // Converting
    else setPhase(3) // Finalizing
  }, [progress])

  const phases = [
    { 
      name: t.downloading, 
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ) 
    },
    { 
      name: t.processing, 
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ) 
    },
    { 
      name: t.converting, 
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ) 
    },
    { 
      name: t.finalizing, 
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) 
    }
  ]

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}m ${secs}s`
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Progress bar container */}
      <div className="relative h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Main progress */}
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        {/* Animated shine effect */}
        <div 
          className="absolute top-0 h-full w-8 bg-white/30 animate-shine"
          style={{ 
            left: `${progress - 20}%`,
            transform: 'translateX(-50%) skewX(-20deg)'
          }}
        />
      </div>

      {/* Progress info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-blue-600">
            {phases[phase].icon}
          </div>
          <span className={`text-xs sm:text-sm font-medium text-gray-700 ${language === 'km' ? 'khmer' : ''}`}>
            {phases[phase].name}
          </span>
        </div>
        
        <div className="text-right">
          <div className={`text-sm sm:text-base font-semibold text-gray-900 ${language === 'km' ? 'khmer' : ''}`}>
            {Math.round(progress)}%
          </div>
          {estimatedTime && (
            <div className="text-xs text-gray-500">
              {t.timeRemaining} {formatTime(estimatedTime)}
            </div>
          )}
        </div>
      </div>

      {/* Phase dots */}
      <div className="flex justify-center gap-1.5 sm:gap-2">
        {phases.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index <= phase 
                ? 'bg-blue-500 scale-125' 
                : index === phase + 1
                ? 'bg-blue-300'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}