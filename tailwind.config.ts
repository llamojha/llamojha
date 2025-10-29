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
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        accent: {
          DEFAULT: "var(--accent-srgb)",
          strong: "var(--accent-strong-srgb)",
          muted: "var(--accent-muted-srgb)"
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)"
        },
        border: "var(--border)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)"
      },
      boxShadow: {
        "elevation-1": "var(--shadow-1)",
        "elevation-2": "var(--shadow-2)",
        "elevation-3": "var(--shadow-3)",
        "elevation-4": "var(--shadow-4)"
      },
      transitionDuration: {
        150: "var(--duration-1)",
        240: "var(--duration-2)",
        360: "var(--duration-3)",
        560: "var(--duration-4)"
      },
      transitionTimingFunction: {
        "ease-out-1": "var(--ease-out-1)",
        "ease-out-2": "var(--ease-out-2)",
        "ease-in-out-1": "var(--ease-in-out-1)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
