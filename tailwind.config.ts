import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F2EA',
        ivory: '#FBF9F4',
        stone: {
          100: '#EFE9DC',
          200: '#E3DBC9',
          300: '#CBBFA6',
        },
        ink: {
          DEFAULT: '#2A241D',
          soft: '#6B6153',
        },
        clay: {
          DEFAULT: '#6E5541',
          dark: '#584331',
          light: '#8A6F58',
        },
        rose: '#B45C3E',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        blob: '55% 45% 60% 40% / 45% 40% 60% 55%',
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(42, 36, 29, 0.25)',
        card: '0 1px 2px rgba(42, 36, 29, 0.04), 0 8px 24px -12px rgba(42, 36, 29, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
