import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config