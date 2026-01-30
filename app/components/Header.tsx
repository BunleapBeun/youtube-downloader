'use client'

interface HeaderProps {
  language: 'en' | 'km'
}

const translations = {
  en: {
    title: 'YouTube to MP3',
    subtitle: 'Convert YouTube videos to high quality MP3 audio'
  },
  km: {
    title: 'YouTube ទៅ MP3',
    subtitle: 'បម្លែងវីដេអូ YouTube ទៅជាសំឡេង MP3 គុណភាពខ្ពស់'
  }
}

export default function Header({ language }: HeaderProps) {
  const t = translations[language]
  
  return (
    <header className="text-center space-y-3 sm:space-y-4">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      
      <h1 className={`text-responsive-3xl sm:text-responsive-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${
        language === 'km' ? 'khmer' : ''
      }`}>
        {t.title}
      </h1>
      
      <p className={`text-gray-600 text-sm sm:text-base max-w-md mx-auto px-2 ${language === 'km' ? 'khmer' : ''}`}>
        {t.subtitle}
      </p>
    </header>
  )
}