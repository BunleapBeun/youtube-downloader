'use client'

interface DownloadButtonProps {
  downloading: boolean
  language: 'en' | 'km'
  onClick: () => void
}

const translations = {
  en: {
    download: 'Download MP3',
    downloading: 'Downloading...',
    preparing: 'Preparing...'
  },
  km: {
    download: 'ទាញយក MP3',
    downloading: 'កំពុងទាញយក...',
    preparing: 'កំពុងរៀបចំ...'
  }
}

export default function DownloadButton({ downloading, language, onClick }: DownloadButtonProps) {
  const t = translations[language]
  
  return (
    <button
      onClick={onClick}
      disabled={downloading}
      className={`relative overflow-hidden btn-primary w-full py-3 sm:py-4 text-base sm:text-lg ${language === 'km' ? 'khmer' : ''}`}
    >
      {downloading ? (
        <span className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="relative w-5 h-5 sm:w-6 sm:h-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          </div>
          <span className="text-sm sm:text-base">{t.downloading}</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 sm:gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="text-sm sm:text-base">{t.download}</span>
        </span>
      )}
      
      {/* Ripple effect on hover */}
      <span className="absolute inset-0 scale-0 rounded-full bg-white/20 transition-transform duration-500 group-hover:scale-150"></span>
    </button>
  )
}