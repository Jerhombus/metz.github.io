/******** tailwind.config.cjs ********/
/**** Witchy dark theme with accessible contrasts ****/
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0C10",
        ink: "#151824",
        surface: "#1E2230",
        moon: "#E6E7EB",
        mist: "#C8CBD4",
        glyph: "#6C4AB6",
        aether: "#3E6FFF",
        verdigris: "#2CB39A",
        ember: "#F39C12"
      },
      boxShadow: {
        glow: "0 0 24px rgba(108,74,182,0.45)",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      }
    },
  },
};
