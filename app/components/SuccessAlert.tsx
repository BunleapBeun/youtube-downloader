'use client'

import { useEffect, useState } from 'react'

interface SuccessAlertProps {
  message: string
  language: 'en' | 'km'
  onClose: () => void
  duration?: number
}

const translations = {
  en: {
    success: 'Success!',
    downloadComplete: 'Download completed successfully!',
    close: 'Close'
  },
  km: {
    success: 'ជោគជ័យ!',
    downloadComplete: 'ទាញយកបានជោគជ័យ!',
    close: 'បិទ'
  }
}

export default function SuccessAlert({ message, language, onClose, duration = 5000 }: SuccessAlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  const t = translations[language]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 z-50 max-w-sm mx-auto sm:mx-0 alert-enter">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-green-800 text-sm sm:text-base mb-0.5 sm:mb-1 ${language === 'km' ? 'khmer' : ''}`}>
              {t.success}
            </h4>
            <p className={`text-xs sm:text-sm text-green-700 truncate ${language === 'km' ? 'khmer' : ''}`}>
              {message || t.downloadComplete}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0 ml-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress timer */}
        <div className="mt-2 sm:mt-3">
          <div className="w-full bg-green-200 rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full transition-all duration-300"
              style={{ 
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}