module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'items-cols': 'repeat(auto-fit, minmax(280px, 1fr))'
      }
    }
  },
  plugins: []
};
