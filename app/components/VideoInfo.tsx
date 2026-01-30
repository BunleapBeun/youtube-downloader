'use client'

interface VideoInfoProps {
  title: string
  thumbnail: string
  duration: string
  language: 'en' | 'km'
}

const translations = {
  en: {
    duration: 'Duration',
    convert: 'Convert to MP3'
  },
  km: {
    duration: 'រយៈពេល',
    convert: 'បម្លែងទៅ MP3'
  }
}

export default function VideoInfo({ title, thumbnail, duration, language }: VideoInfoProps) {
  const t = translations[language]
  
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full sm:w-48">
            <div className="relative w-full aspect-video sm:w-48 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {duration}
                </span>
              </div>
            </div>
          </div>
          
          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-responsive-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 ${
              language === 'km' ? 'khmer' : ''
            }`}>
              {title}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`text-sm ${language === 'km' ? 'khmer' : ''}`}>
                  {t.duration}: {duration}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className={`text-sm ${language === 'km' ? 'khmer' : ''}`}>
                  {t.convert}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}