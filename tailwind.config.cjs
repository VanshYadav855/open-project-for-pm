/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'linkedin-blue': '#0A66C2',
                'linkedin-gray': '#F3F2EF',
                'linkedin-purple': '#7C3AED'
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif']
            }
        },
    },
    plugins: [],
}
