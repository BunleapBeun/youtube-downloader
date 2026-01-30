import type { Metadata } from 'next'
import { Inter, Kantumruy_Pro } from 'next/font/google'
import './globals.css'

// Load fonts properly
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const kantumruy = Kantumruy_Pro({
  subsets: ['khmer'],
  variable: '--font-kantumruy',
})

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter - Free & Fast',
  description: 'Convert YouTube videos to high quality MP3 audio files instantly. Free, fast, and no registration required.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${kantumruy.variable} scroll-smooth`}>
      <head>
        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 200%; }
          }
          .animate-shine {
            animation: shine 2s infinite;
          }
        `}</style>
      </head>
      <body className="font-sans bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}