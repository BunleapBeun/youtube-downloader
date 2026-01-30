'use client'

interface FeaturesProps {
  language: 'en' | 'km'
}

const translations = {
  en: {
    features: 'Why choose us',
    feature1: 'High Quality',
    feature1Desc: '320kbps MP3 audio',
    feature2: 'Fast Conversion',
    feature2Desc: 'Quick processing time',
    feature3: 'Free & Secure',
    feature3Desc: 'No registration needed',
    feature4: 'Easy to Use',
    feature4Desc: 'Simple 3-step process'
  },
  km: {
    features: 'ហេតុអ្វីត្រូវជ្រើសរើសយើង',
    feature1: 'គុណភាពខ្ពស់',
    feature1Desc: 'សំឡេង MP3 320kbps',
    feature2: 'បម្លែងលឿន',
    feature2Desc: 'ពេលវេលាដំណើរការលឿន',
    feature3: 'ឥតគិតថ្លៃ និងសុវត្ថិភាព',
    feature3Desc: 'មិនចាំបាច់ចុះឈ្មោះ',
    feature4: 'ងាយស្រួលប្រើ',
    feature4Desc: 'ដំណើរការ ៣ ជំហានសាមញ្ញ'
  }
}

export default function Features({ language }: FeaturesProps) {
  const t = translations[language]
  
  const features = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
      title: t.feature1,
      description: t.feature1Desc
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t.feature2,
      description: t.feature2Desc
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t.feature3,
      description: t.feature3Desc
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: t.feature4,
      description: t.feature4Desc
    }
  ]
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className={`text-lg sm:text-xl font-semibold text-center text-gray-900 ${language === 'km' ? 'khmer' : ''}`}>
        {t.features}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-3 sm:p-5 rounded-xl border border-gray-200 text-center hover:border-blue-300 transition-colors">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-lg mb-2 sm:mb-4">
              {feature.icon}
            </div>
            <h4 className={`font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 ${language === 'km' ? 'khmer' : ''}`}>
              {feature.title}
            </h4>
            <p className={`text-xs sm:text-sm text-gray-600 ${language === 'km' ? 'khmer' : ''}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}