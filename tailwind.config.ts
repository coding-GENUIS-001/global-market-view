module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#04080f',
        panel: '#0b1220',
        accent: '#7c3aed',
        green: '#19c37d',
        red: '#ff5d73',
        amber: '#f7b955',
        cyan: '#3ec9ff'
      },
      boxShadow: {
        glow: '0 0 25px rgba(124, 58, 237, 0.35)'
      }
    }
  },
  plugins: []
};
