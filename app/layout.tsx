import type { Metadata } from 'next'
import {
  Playfair_Display,
  Be_Vietnam_Pro,
  Great_Vibes,
  Cormorant_Garamond,
  Cinzel,
  Italiana,
  EB_Garamond,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FloatingPetals } from '@/components/floating-petals'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam',
  weight: ['300', '400', '500', '600', '700'],
})

const greatVibes = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-great-vibes',
  weight: ['400'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
})

const italiana = Italiana({
  subsets: ['latin'],
  variable: '--font-italiana',
  weight: ['400'],
})

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Lê Phúc Tường & Nguyễn Ngọc Anh',
  description:
    'Trân trọng kính mời quý khách đến chung vui trong ngày hạnh phúc của chúng tôi',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${beVietnamPro.variable} ${greatVibes.variable} ${cormorant.variable} ${cinzel.variable} ${italiana.variable} ${ebGaramond.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Global romantic petals — drifting across the whole site */}
        <FloatingPetals count={26} fixed />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
