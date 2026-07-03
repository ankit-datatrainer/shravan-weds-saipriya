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
        ivory: "#faf5ea",
        sage: "#8a9a5b",
        leaf: {
          500: "#6f7f54",
          600: "#5b6b46",
          700: "#47543a",
        },
        marigold: {
          400: "#f5a623",
          500: "#e8890c",
          600: "#c96f06",
        },
        peacock: {
          500: "#0e7c7b",
          700: "#0a5c66",
        },
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
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.6)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        swing: "swing 3s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
