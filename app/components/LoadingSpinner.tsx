'use client'

interface LoadingSpinnerProps {
  text?: string
  language: 'en' | 'km'
  type?: 'analyzing' | 'downloading'
}

const translations = {
  en: {
    analyzing: 'Analyzing video...',
    downloading: 'Downloading MP3...'
  },
  km: {
    analyzing: 'កំពុងវិភាគវីដេអូ...',
    downloading: 'កំពុងទាញយក MP3...'
  }
}

export default function LoadingSpinner({ text, language, type = 'analyzing' }: LoadingSpinnerProps) {
  const t = translations[language]
  const displayText = text || t[type]

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8">
      <div className="relative">
        {/* Main spinner */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          
          {/* Inner icon based on type */}
          <div className="absolute inset-0 flex items-center justify-center">
            {type === 'analyzing' ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-1 sm:space-y-2">
        <p className={`font-medium text-gray-700 text-sm sm:text-base ${language === 'km' ? 'khmer' : ''}`}>
          {displayText}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          {type === 'analyzing' 
            ? language === 'en' ? 'Please wait...' : 'សូមរង់ចាំ...'
            : language === 'en' ? 'Preparing your file...' : 'កំពុងរៀបចំឯកសារ...'
          }
        </p>
      </div>
    </div>
  )
}