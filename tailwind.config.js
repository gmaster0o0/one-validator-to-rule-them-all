module.exports = {
  darkMode: 'class',
  presets: [require('@spartan-ng/brain/hlm-tailwind-preset')],
  content: [
    './frontend/src/**/*.{html,ts,scss}',
    './shared/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
