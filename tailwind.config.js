const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
export default 
{
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius : {
                tenpixel : '10px',
            },
            borderWidth : {
                regulerBorder : '1px',
            },
        },
    },
    plugins: [
        createThemes(({ light, dark }) => ({
           'light-theme': light({
                theme : {
                    'primary': 'rgb(255,255,255)',
                    'secondary': 'rgb(200,200,200)',
                    'brand': 'rgb(127, 255, 212)',
                    'accent': '#643dff',
                    'tertiary' : 'rgb(225,225,225)'
                }
           }),
           'dark-theme': dark({
                theme : {
                    'bgPrimary': 'rgb(5,5,5)', "hoverBgPrimary" : 'rgb(10,10,10)',
                    'bgSecondary': 'rgb(10,10,10)', "hoverBgSecondary" : 'rgb(15,15,15)',
                    'bgTertiary' : 'rgb(20,20,20)', "hoverBgTertiary" : 'rgb(30, 30, 30)',
                    'bgAbsolute': 'rgb(2,2,2)',
                    'bgPrimaryLight': 'rgb(255,255,255)', "hoverBgPrimaryLight" : 'rgb(220,220,220)',
                    'bgSecondaryLight': 'rgb(220,220,220)', "hoverBgSecondaryLight" : 'rgb(190,190,190)',
                    
                    'textPrimary' : 'rgb(255,255,255)',
                    'textSecondary' : 'rgb(200,200,200)',
                    'textTertiary' : 'rgb(130,130,130)', 'hoverTextTertiary' : 'rgb(255,255,255)',

                    'borderPrimary' : 'rgb(30,30,30)',
                    'borderSecondary' : 'rgb(90,90,90)',
                    'borderTertiary' : 'rgb(200,200,200)',

                    'brand': 'rgb(127, 255, 212)', "hoverBrand" : 'rgb(117, 225, 202)',
                    'accent': '#643dff', "hoverAccent" : 'rgb(80, 51, 225)',
                    "bgNavigation" : "rgb(37 99 235)",
                    "primaryLight" : 'rgb(255,255,255)',
                }
           }),
           'green-theme': dark({
                theme : {
                    'bgPrimary': 'rgb(0,5,0)', "hoverBgPrimary" : 'rgb(5,10,5)',
                    'bgSecondary': 'rgb(5,10,5)', "hoverBgSecondary" : 'rgb(10,15,10)',
                    'bgTertiary' : 'rgb(10,20,10)', "hoverBgTertiary" : 'rgb(20, 30, 20)',
                    'bgPrimaryLight': 'rgb(255,255,255)', "hoverBgPrimaryLight" : 'rgb(220,220,220)',
                    'bgSecondaryLight': 'rgb(220,220,220)', "hoverBgSecondaryLight" : 'rgb(190,190,190)',
                    
                    'textPrimary' : 'rgb(255,255,255)',
                    'textSecondary' : 'rgb(200,200,200)',
                    'textTertiary' : 'rgb(130,130,130)', 'hoverTextTertiary' : 'rgb(255,255,255)',

                    'brand': 'rgb(127, 255, 212)', "hoverBrand" : 'rgb(117, 225, 202)',
                    'accent': '#643dff', "hoverAccent" : 'rgb(80, 51, 225)',
                    "bgNavigation" : "rgb(37 99 235)",
                    "primaryLight" : 'rgb(255,255,255)',
                }
           }),
        }))
    ],
}