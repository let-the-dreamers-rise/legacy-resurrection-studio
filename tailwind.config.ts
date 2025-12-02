import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'necro-purple': '#8B5CF6',
        'necro-purple-dark': '#6D28D9',
        'necro-purple-light': '#A78BFA',
        'void-black': '#0A0A0F',
        'shadow-gray': '#1A1A24',
        'mist-gray': '#2A2A3A',
        'fog-gray': '#3A3A4A',
        'ghost-white': '#F9FAFB',
        'spirit-gray': '#D1D5DB',
        'phantom-gray': '#9CA3AF',
        'whisper-gray': '#6B7280',
        'success-green': '#10B981',
        'warning-amber': '#F59E0B',
        'danger-red': '#EF4444',
        'info-blue': '#3B82F6',
        'reanimator-cyan': '#06B6D4',
        'necromancer-violet': '#8B5CF6',
        'ghost-emerald': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-strong': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
