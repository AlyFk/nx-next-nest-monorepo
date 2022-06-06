const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './src/modules/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/pages/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
