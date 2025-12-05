import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Trust" Blue (Primary)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb', // Royal Blue
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // The "Growth" Green (Action/Success)
        action: {
          400: '#34d399',
          500: '#10b981', // Emerald
          600: '#059669',
        },
        // The "Warmth" Gold (Highlights/Gifts)
        warmth: {
          100: '#fef3c7',
          400: '#fbbf24', // Amber
          500: '#f59e0b',
        },
        // The "Clean" Backgrounds
        surface: {
          50: '#f8fafc', // Slate 50 (Main BG)
          100: '#f1f5f9', // Slate 100 (Cards)
          200: '#e2e8f0', // Borders
          900: '#0f172a', // Text
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
};
export default config;