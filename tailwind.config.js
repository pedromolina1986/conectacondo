/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',       // custom blue
        secondary: '#F59E0B',     // amber
        brand: {
          light: '#E0F2FE',
          DEFAULT: '#0EA5E9',
          dark: '#0369A1',
        },
      },
    },
  },
  plugins: [],
};
