'use client'

interface LanguageSwitcherProps {
  language: 'en' | 'km'
  onLanguageChange: (lang: 'en' | 'km') => void
}

export default function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('km')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${language === 'km' ? 'khmer' : ''} ${
          language === 'km'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ខ្មែរ
      </button>
    </div>
  )
}