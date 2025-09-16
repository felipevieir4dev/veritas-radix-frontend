/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./main.tsx"
  ],
  safelist: [
    { pattern: /border-\[var\(--color-.+\)\]/ },
    { pattern: /bg-\[var\(--color-.+\)\]/ },
    { pattern: /text-\[var\(--color-.+\)\]/ }
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Cinzel', 'EB Garamond', 'serif'],
        'body': ['EB Garamond', 'Times New Roman', 'serif'],
      },
      colors: {
        'parchment': '#f7f3e9',
        'parchment-dark': '#f0e6d2',
        'parchment-aged': '#e8dcc6',
        'deep-red': '#8b0000',
        'deep-red-light': '#a04040',
        'deep-red-dark': '#660000',
        'sepia': '#704214',
        'sepia-light': '#8b6914',
        'antique-white': '#faebd7',
        'aged-paper': '#f4f1e8',
        'ink-brown': '#3c2415',
        'faded-black': '#2c2c2c',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}