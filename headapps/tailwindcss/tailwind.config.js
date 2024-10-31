/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    'scChromeData',
    'scpm',
    '!px-0',
    {
      pattern: /basis-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /text-/,
    },
    {
      pattern: /bg-/,
    },
    {
      pattern: /grid-/,
    },
    {
      pattern: /hidden/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /block/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(0, 79, 155)',
      },
    },
  },
  plugins: [],
};
