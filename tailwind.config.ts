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
        pastel: {
          pink: "#FDE2E4",
          rose: "#FFD1DC",
          lavender: "#E2ECE9",
          lilac: "#DFCCF1",
          purple: "#E8D7F1",
          mint: "#D8F3DC",
          sage: "#D3E0EA",
          sky: "#D0F4DE",
          babyblue: "#CCE3DE",
          peach: "#FFE5D9",
          butter: "#FFF1C5",
          cream: "#FFFDF9",
          warm: "#FAF7F2",
        },
        themePrimary: {
          lavender: "#E8D7F1",
          blue: "#BDE0FE",
          pink: "#FFCCD5",
        },
        studio: {
          50: "#FAF7F5",
          100: "#F5EFEB",
          200: "#EBDDD4",
          300: "#DEC4B5",
          400: "#CFA793",
          500: "#B88A75",
          600: "#9A6E5A",
          700: "#7C5545",
          800: "#5E3E32",
          900: "#442B22",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-outfit)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(184, 138, 117, 0.08)",
        "soft-lg": "0 10px 30px -3px rgba(184, 138, 117, 0.12)",
        "soft-xl": "0 20px 40px -5px rgba(184, 138, 117, 0.16)",
        glow: "0 0 25px rgba(223, 204, 241, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
