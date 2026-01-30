'use client'

interface UrlInputProps {
  url: string
  loading: boolean
  language: 'en' | 'km'
  onUrlChange: (url: string) => void
  onGetInfo: () => void
}

const translations = {
  en: {
    placeholder: 'Paste YouTube URL here...',
    getInfo: 'Convert to MP3',
    loading: 'Analyzing...'
  },
  km: {
    placeholder: 'បិទភ្ជាប់តំណ YouTube នៅទីនេះ...',
    getInfo: 'បម្លែងទៅ MP3',
    loading: 'កំពុងវិភាគ...'
  }
}

export default function UrlInput({ url, loading, language, onUrlChange, onGetInfo }: UrlInputProps) {
  const t = translations[language]
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-xl sm:blur-2xl"></div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onGetInfo()}
                placeholder={t.placeholder}
                className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                  language === 'km' ? 'khmer' : ''
                }`}
                disabled={loading}
              />
            </div>
            <button
              onClick={onGetInfo}
              disabled={loading || !url.trim()}
              className={`relative overflow-hidden btn-primary min-w-full sm:min-w-[140px] ${language === 'km' ? 'khmer' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </div>
                  {t.loading}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm sm:text-base">{t.getInfo}</span>
                </span>
              )}
              
              {/* Button animation */}
              {!loading && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}