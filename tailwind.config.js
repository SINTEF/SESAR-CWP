/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', '"Roboto Mono"', 'Monaco', '"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        'sesar-dark': '#222',
        'sesar-darker': '#303030',
        'sesar-gray': '#404040',
        'sesar-light-gray': '#888',
        'sesar-blue': '#4472c4',
        'sesar-orange': '#ed7d31',
        'sesar-green': '#00bc8c',
        'sesar-cyan': '#3498db',
      },
      zIndex: {
        'max': '2147483637',
      }
    },
  },
  plugins: [
    require('daisyui'),
    function({ addUtilities }) {
      addUtilities({
        '.writing-mode-vertical-rl': {
          'writing-mode': 'vertical-rl',
          'text-orientation': 'upright',
        },
        '.slider-vertical': {
          '-webkit-appearance': 'slider-vertical',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.range-vertical': {
          'writing-mode': 'bt-lr',
          '-webkit-appearance': 'slider-vertical',
          'width': '100%',
        },
      })
    },
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#375a7f",
          "secondary": "#444",
          "accent": "#00bc8c",
          "neutral": "#303030",
          "base-100": "#222",
          "base-200": "#1a1a1a",
          "base-300": "#404040",
          "info": "#3498db",
          "success": "#00bc8c",
          "warning": "#f39c12",
          "error": "#e74c3c",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}