/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: [
        {"inst-blue": "#004aad"},
        {"heliotrope": "#cb6ce6"},
        {"electric-blue": "#5ce1e6"}
      ],
      textColor: [
        {"cool-gray": "#837FA7"},
        {"hookers-green": "#4C6D64"},
        {"smooky-black": "#1C140B"}
      ]
    },
  },
  plugins: [],
}

