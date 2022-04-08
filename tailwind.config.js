module.exports = {
    content: ['./templates/**/*.html', './core/templates/**/*.html'],
    theme: {
        extend: {
            fontFamily: {
                futurabold: ['FuturaBold', 'sans-serif'],
                futuraheavy: ['FuturaHeavy', 'sans-serif'],
                futuramedium: ['FuturaMedium', 'sans-serif'],
                body: ['Helvetica', 'sans-serif'],
            },
            colors: {
                gray: {
                    '900': '#000000',
                    '800': '#2a2a2a',
                    '700': '#444444',
                    '600': '#5c5c5c',
                    '500': '#767676',
                    '400': '#929292',
                    '300': '#b2b2b2',
                    '200': '#d6d6d6',
                    '100': '#F6F6F6',
                },
                green: {
                    '900': '#002701',
                    '800': '#004202',
                    '700': '#005c02',
                    '600': '#007603',
                    '500': '#008404',
                    '400': '#19901d',
                    '300': '#4ca84f',
                    '200': '#7fc181',
                    '100': '#b2dab3',
                }
            },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
