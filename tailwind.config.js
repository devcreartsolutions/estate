/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fd',
          100: '#b3e8f9',
          200: '#80d9f5',
          300: '#4dcaf1',
          400: '#1abbed',
          500: '#12b0df',
          600: '#0e8bb3',
          700: '#0a6787',
          800: '#06435b',
          900: '#021f2f',
        },
      },
    },
  },
  plugins: [],
  // Safelist to ensure primary colors are not purged
  safelist: [
    {
      pattern: /bg-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /via-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /to-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
}
