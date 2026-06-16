import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // MCM Rent a Car brand palette (reused from the original logo)
        ink: "#121212",
        charcoal: "#1c1c1e",
        graphite: "#2a2a2d",
        brand: {
          DEFAULT: "#ee8a1e", // sunset orange from the logo glow
          50: "#fff7ec",
          100: "#fdebcf",
          200: "#fad59f",
          300: "#f7bb66",
          400: "#f2a23a",
          500: "#ee8a1e",
          600: "#d4760f",
          700: "#ad5b0e",
          800: "#8a4814",
          900: "#713c14",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -18px rgba(0,0,0,0.35)",
        glow: "0 12px 40px -8px rgba(238,138,30,0.45)",
      },
      backgroundImage: {
        "brand-grad": "linear-gradient(135deg, #ee8a1e 0%, #f2a23a 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 28s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
