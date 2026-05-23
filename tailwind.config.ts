import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px -32px rgb(24 24 27 / 0.45)",
        glow: "0 16px 50px -28px rgb(14 165 233 / 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
