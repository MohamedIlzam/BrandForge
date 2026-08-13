import React, { useEffect, useRef } from 'react';

export default function CanvasRenderer({ width = 300, height = 300, headline = "UNLEASH YOUR BRAND", subhead = "Design at the speed of thought", tokens = { primary: '#5D5DFF', secondary: '#8B5CF6', accent: '#0EA5E9', bg: '#111317' } }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 1. Radial Background Gradient
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height));
        bgGrad.addColorStop(0, '#181A20');
        bgGrad.addColorStop(1, tokens.bg || '#111317');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Generative Ambient Glowing Orbs
        const numOrbs = 4;
        for (let i = 0; i < numOrbs; i++) {
            const cx = (Math.sin(i * 45 + 10) * 0.35 + 0.5) * width;
            const cy = (Math.cos(i * 25 + 15) * 0.35 + 0.5) * height;
            const radius = Math.min(width, height) * 0.4;

            const orbGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, radius);
            const colorHex = i % 3 === 0 ? tokens.primary : (i % 3 === 1 ? tokens.secondary : tokens.accent);

            // Parse Hex to RGBA
            let c = colorHex.replace('#', '');
            if (c.length === 3) c = c.split('').map(x => x + x).join('');
            const num = parseInt(c, 16);
            const rgba = `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, 0.35)`;

            orbGrad.addColorStop(0, rgba);
            orbGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // 3. Precision Technical Lines & Grid
        ctx.lineWidth = 1;
        const lines = 8;
        for (let i = 0; i < lines; i++) {
            const y = (i / lines) * height;
            ctx.strokeStyle = 'rgba(93, 93, 255, 0.12)';
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();

            const x = (i / lines) * width;
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }

        // 4. Central Geometric Lattice Accent
        ctx.save();
        ctx.translate(width / 2, height / 2);
        for (let i = 0; i < 4; i++) {
            ctx.rotate((Math.PI * 2) / 4);
            ctx.strokeStyle = i % 2 === 0 ? 'rgba(93, 93, 255, 0.5)' : 'rgba(139, 92, 246, 0.5)';
            ctx.lineWidth = 1.5;
            const sz = Math.min(width, height) * 0.25;
            ctx.beginPath();
            ctx.rect(-sz / 2, -sz / 2, sz, sz);
            ctx.stroke();
        }
        ctx.restore();

        // 5. Monospaced Watermark
        ctx.fillStyle = 'rgba(14, 165, 233, 0.85)';
        ctx.font = `600 ${Math.max(9, Math.floor(height * 0.04))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'right';
        ctx.fillText('BRANDFORGE // PRO', width - 12, 20);

        // 6. Bold Headline & Subhead
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFFFFF';
        const headlineFontSize = Math.max(14, Math.floor(Math.min(width, height) * 0.07));
        ctx.font = `800 ${headlineFontSize}px 'Geist', sans-serif`;

        ctx.shadowColor = tokens.primary;
        ctx.shadowBlur = 10;
        ctx.fillText(headline.toUpperCase(), 16, height - 32);

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#9CA3AF';
        const subFontSize = Math.max(9, Math.floor(headlineFontSize * 0.42));
        ctx.font = `400 ${subFontSize}px 'Inter', sans-serif`;
        ctx.fillText(subhead, 16, height - 12);

    }, [width, height, headline, subhead, tokens]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="max-w-full h-auto rounded border border-white/10 shadow-lg"
        />
    );
}
