/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bcddff',
          300: '#8ec8ff',
          400: '#58a9ff',
          500: '#3188ff',
          600: '#1f6bf0',
          700: '#1855d1',
          800: '#1946a6',
          900: '#1b3f82',
          950: '#142858',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffbf71',
          400: '#ff9a38',
          500: '#ff7b11',
          600: '#f05f07',
          700: '#c74608',
          800: '#9e380f',
          900: '#7f3010',
          950: '#451a06',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(17, 24, 39, 0.15)',
        glow: '0 0 0 1px rgba(49, 136, 255, 0.15), 0 10px 30px -12px rgba(49, 136, 255, 0.45)',
      },
      backgroundImage: {
        'grid-slate':
          'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(ellipse at top, rgba(49,136,255,0.25), transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,123,17,0.15), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
