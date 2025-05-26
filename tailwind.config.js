/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        'primary-dark': '#7C3AED',
        'primary-light': '#A78BFA',
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
        foreground: {
          DEFAULT: '#1E293B',
          dark: '#F8FAFC',
        },
        card: {
          DEFAULT: '#F9FAFB',
          dark: '#1E293B',
        },
        text: {
          DEFAULT: '#1E293B',
          dark: '#F8FAFC',
          muted: {
            DEFAULT: '#64748B',
            dark: '#94A3B8',
          }
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} 