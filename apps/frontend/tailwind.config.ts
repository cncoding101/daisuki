import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        primary: '#163137',
        secondary: '#93c572',
        highlight: '#e3a448',
        contrast: '#fefdf5',
      },
      animation: {
        'bounce-pulse': 'bounce 1s ease-in-out infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
