import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#76E8CD',
        'secondary': '#00414D',
        'darkSecondary': '#003c47',
        'grayColor': '#FCFCFC',
        'lightPrimary': '#F0FCFA',
        'grayMark': '#DDDDDD',
        'subGray': '#F8F8F8',
        'textColor': '#004956',
        'grayPath': '#bbbbbb',
        "lightBlack": '#666'
      },
    },
  },
  plugins: [],
} satisfies Config;
