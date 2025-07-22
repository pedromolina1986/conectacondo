/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6600',       // custom blue
        secondary: '#2D3C4F',     // amber
        brand: {
          light: '#E0F2FE',
          DEFAULT: '#FF6600',
          dark: '#2D3C4F',
        },
      },
    },
  },
  plugins: [],
};
