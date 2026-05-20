import type { Config } from 'tailwindcss'

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-be-vietnam), system-ui, -apple-system, sans-serif',
        garamond: 'var(--font-eb-garamond), Georgia, serif',
        luxe: 'var(--font-cinzel), Georgia, serif',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
