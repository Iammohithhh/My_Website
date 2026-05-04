import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F7F4EE',
          dark: '#EDE8DF',
          darker: '#E0D9CE',
        },
        ink: {
          DEFAULT: '#1C1C2E',
          light: '#3D3D5C',
          muted: '#6B6B8A',
          faint: '#A0A0B8',
        },
        indigo: {
          DEFAULT: '#5B4FD9',
          light: '#7B70E8',
          dark: '#4038B0',
          pale: '#ECEAFA',
        },
        science: {
          DEFAULT: '#2E9E6B',
          light: '#4DB885',
          dark: '#1F7050',
          pale: '#E6F7F0',
        },
        amber: {
          DEFAULT: '#F0A500',
          light: '#F5C040',
          dark: '#C87B00',
          pale: '#FEF5D9',
        },
        rust: {
          DEFAULT: '#B05A2F',
          light: '#D07848',
          pale: '#F9EDE6',
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
