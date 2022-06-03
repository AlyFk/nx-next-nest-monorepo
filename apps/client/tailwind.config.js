const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx)"),
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ],
}