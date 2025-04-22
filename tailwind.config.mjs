/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFBB00",
        white: "#EEEEEE",
        black: "#171717",
        foreground: "#000000",
      },
      animation: {
        spin360: 'spin360 10s linear infinite',
      },
      keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      letterSpacing: {
        '4p': '-0.04em',
      },
      lineHeight: {
        '75': '0.80',
      },

    },
  },
  plugins: [],
};