import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF8F5',         // Soft luxury warm off-white / parchment
          card: '#F2ECE4',       // Cream neutral card bg
          surface: '#150510',    // Deep velvet noir
          burgundy: '#3D0C24',   // Dominant rich editorial burgundy
          dark: '#12040B',       // Deepest espresso dark
          gold: '#CFA052',       // Champagne gold accent
          goldLight: '#E8C88A',  // Lighter champagne gold
          coral: '#E5583B',      // Vibrant highlight coral
          muted: '#736B63',      // Soft editorial gray-brown
          subtle: '#EDE6DD',     // Subtle border line color
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      lineHeight: {
        tightest: '0.92',
      },
      letterSpacing: {
        widestEditorial: '0.25em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
