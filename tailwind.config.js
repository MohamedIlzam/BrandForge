/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                forge: {
                    bg: '#111317',
                    surface: '#181A20',
                    card: '#1F232B',
                    border: '#2E3440',
                    primary: '#5D5DFF',
                    secondary: '#8B5CF6',
                    accent: '#0EA5E9',
                    muted: '#8A92A6',
                    text: '#F3F4F6'
                }
            },
            fontFamily: {
                geist: ['Geist', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            },
            boxShadow: {
                'glow-primary': '0 0 25px rgba(93, 93, 255, 0.35)',
                'glow-secondary': '0 0 25px rgba(139, 92, 246, 0.35)',
                'glow-accent': '0 0 25px rgba(14, 165, 233, 0.35)'
            }
        },
    },
    plugins: [],
}
