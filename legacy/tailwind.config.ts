import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e6eaf5",
          200: "#c8cee7",
          300: "#a2b0d6",
          400: "#7387c0",
          500: "#4f65aa",
          600: "#3b4d91",
          700: "#2f3c74",
          800: "#26305d",
          900: "#1f284d"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
