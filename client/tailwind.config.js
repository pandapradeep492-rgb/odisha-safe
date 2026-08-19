/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette - deep "safety navy" + trustworthy teal/cyan accent.
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec4ff',
          400: '#59a2ff',
          500: '#337dff',
          600: '#1f5ce6',
          700: '#1a48b4',
          800: '#1b3f8f',
          900: '#1c3a72',
          950: '#122447',
        },
        // Risk-level semantic colors (also paired with icons + text, never color-only).
        risk: {
          low: '#16a34a',
          moderate: '#d97706',
          high: '#ea580c',
          critical: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)',
        'card-lg': '0 10px 15px -3px rgba(16,24,40,0.08), 0 4px 6px -4px rgba(16,24,40,0.05)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(220,38,38,0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgba(220,38,38,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(220,38,38,0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'pulse-ring': 'pulse-ring 2s infinite',
      },
    },
  },
  plugins: [],
};
