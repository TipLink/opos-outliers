/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['"Space Mono"', 'monospace'],
      },
    },
  },

  daisyui: {
    themes: [
      {
        // Sampled from magiceden.io
        magiceden: {
          "primary": "#007CBF",   
          "secondary": "#1b1f44", 
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          "base-300": "#00324C",
          "base-200": "#007CBF",
          "base-100": "#00324C",  
          "info": "#3abff8",  
          "success": "#00965c",  
          "warning": "#f7aa00",
          "error": "#f87272",
        },
      },
    ],
  },
  
  plugins: [require("daisyui")],}
