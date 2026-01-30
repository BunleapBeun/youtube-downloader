'use client'

import { useState, useEffect } from 'react'

interface ErrorMessageProps {
  error: string
  language: 'en' | 'km'
  onClose: () => void
}

export default function ErrorMessage({ error, language, onClose }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!isVisible) return null

  return (
    <div className="mb-4 sm:mb-6 alert-enter">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs sm:text-sm text-red-800 ${language === 'km' ? 'khmer' : ''}`}>
              {error}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Error timer */}
        <div className="mt-2 sm:mt-3">
          <div className="w-full bg-red-200 rounded-full h-1">
            <div 
              className="bg-red-500 h-1 rounded-full transition-all duration-5000"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}