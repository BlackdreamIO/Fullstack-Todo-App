/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode : 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                robotoNomral: ['"RobotoRegular"'],
                robotoMedium : ['"RobotoMedium"'],
                robotoBold : ['"RobotoBold"']
                // Add more custom font families as needed
            },
        },
    },
    plugins: [],
}