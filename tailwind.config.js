import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8f0ff',
          200: '#b4e1ff',
          300: '#83cbff',
          400: '#52b0ff',
          500: '#2c91ff',
          600: '#1874e6',
          700: '#115cc0',
          800: '#134d99',
          900: '#14427c',
        },
        accent: '#ff7a18',
        contrast: '#0e1116',
      },
      boxShadow: {
        glow: '0 20px 45px rgba(44, 145, 255, 0.25)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 20%, rgba(44,145,255,.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,122,24,.3), transparent 35%)',
      },
    },
  },
  plugins: [forms],
}

