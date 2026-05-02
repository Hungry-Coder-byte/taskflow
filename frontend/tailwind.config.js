/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#366ebf',
        'secondary': '#7299ff',
        'accent': '#ff9800',
        'neutral': {
          50: '#f8fafc',
          100: '#f4f6fe',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#88b04b',
          700: '#618876',
          800: '#4f6d40',
          900: '#333',
        },
        'blue': {
          500: '#1fb8cd',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        8: '16px',
        12: '24px',
        16: '32px',
        24: '48px',
        32: '64px',
      },
    },
  },
  plugins: [],
}