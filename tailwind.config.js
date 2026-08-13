/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                // Dark Obsidian + Electric Acid Green Palette
                ground: '#09090B',
                surface: '#121215',
                'surface-elevated': '#1A1A1E',
                ink: '#F4F4F5',
                muted: '#A1A1AA',
                rule: '#27272A',
                hover: '#18181B',
                acid: '#CCFF00',
                'acid-hover': '#B8E600',
                'acid-tint': 'rgba(204, 255, 0, 0.08)',
                'acid-border': 'rgba(204, 255, 0, 0.3)',
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
