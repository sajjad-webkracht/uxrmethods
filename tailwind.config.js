/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // If you're using a JS or TS framework
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Red Hat Display', 'ui-sans-serif', 'system-ui'], // Adjust as necessary
      },
    },
  },
  plugins: [],
}

