/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0A0F1C',
          50: '#0D1326',
          100: '#111827',
          200: '#1E293B',
        },
        primary: '#3B82F6',
        accent: '#06B6D4',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        syntax: {
          green: '#4ADE80',
          orange: '#FB923C',
          purple: '#C084FC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
