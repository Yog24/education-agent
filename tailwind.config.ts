import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#7C3AED", // Violet-600
        secondary: "#A78BFA", // Violet-400
        accent: "#C4B5FD", // Violet-300
        background: "#F3F4F6", // Gray-100
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
