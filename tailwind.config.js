/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                // Swiss palette — warm off-white ground, single cobalt accent
                ground: '#F5F5F0',
                surface: '#FFFFFF',
                ink: '#1A1A1A',
                muted: '#6B6B6B',
                rule: '#D4D4D0',
                hover: '#EBEBEA',
                cobalt: '#0052CC',
                'cobalt-light': '#E8F0FE',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                sm: '2px',
                DEFAULT: '3px',
            },
        },
    },
    plugins: [],
};
