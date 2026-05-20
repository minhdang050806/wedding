import type { Metadata } from 'next'
import {
  Be_Vietnam_Pro,
  Josefin_Sans,
  Cinzel,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FloatingPetals } from '@/components/floating-petals'
import { FireworksBackground } from '@/components/fireworks-background'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-be-vietnam',
  weight: ['300', '400', '500', '600', '700'],
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  weight: ['100', '300', '400', '600'],
})

const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cinzel',
  weight: ['400', '500', '700'],
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
      className={`${beVietnamPro.variable} ${josefinSans.variable} ${cinzel.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <FireworksBackground />
        {/* Global romantic petals — drifting across the whole site */}
        <FloatingPetals count={26} fixed />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
