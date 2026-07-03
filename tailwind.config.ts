import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fdf6f4",
          100: "#fbe9e6",
          200: "#f6d3cd",
          300: "#efb3a9",
          400: "#e48a7c",
          500: "#d5654f",
        },
        rosegold: "#b76e79",
        maroon: {
          700: "#7a1f2b",
          800: "#5e1721",
          900: "#421018",
        },
        gold: {
          300: "#e9d8a6",
          400: "#d4af37",
          500: "#b8912e",
          600: "#9a7524",
        },
        cream: "#fffaf3",
        sage: "#8a9a5b",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-greatvibes)", "cursive"],
        body: ["var(--font-jost)", "sans-serif"],
        devanagari: ["var(--font-tiro)", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        swing: "swing 3s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
