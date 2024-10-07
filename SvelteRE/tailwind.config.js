import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0DD982',
          dark: '#0DD982',
        },
        background: {
          light: '#F3F4F6',
          dark: '#1E293B',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#334155',
        },
        text: {
          light: '#1E293B',
          dark: '#F1F5F9',
        },
        accent: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [daisyui],
};