/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['var(--font-poppins)', 'sans-serif'],
                montserrat: ['var(--font-montserrat)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

