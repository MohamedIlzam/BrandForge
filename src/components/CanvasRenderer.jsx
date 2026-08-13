import React, { useEffect, useRef } from 'react';

export default function CanvasRenderer({
    width = 300,
    height = 300,
    headline = 'BRANDFORGE',
    subhead = 'Asset Studio',
    tokens = { primary: '#CCFF00', secondary: '#1A1A1E', accent: '#CCFF00', bg: '#09090B' },
    mode = 'grid',
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const accent = tokens.primary || '#CCFF00';
        const bg = tokens.bg || '#09090B';

        // 1. Fill Dark Background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // 2. Draw Dark Structural Grid Lines
        ctx.strokeStyle = '#27272A';
        ctx.lineWidth = 0.75;
        const step = Math.max(20, Math.floor(Math.min(width, height) / 16));
        for (let x = step; x < width; x += step) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = step; y < height; y += step) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // 3. High-Contrast Vector Graphic Modes (Acid Green / Brand Accent)
        ctx.fillStyle = accent;
        ctx.strokeStyle = accent;

        if (mode === 'circle') {
            // Off-center precision circle with sharp border ring
            ctx.beginPath();
            ctx.arc(width * 0.65, height * 0.4, Math.min(width, height) * 0.22, 0, Math.PI * 2);
            ctx.fill();

            // Outer accent line
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(width * 0.65, height * 0.4, Math.min(width, height) * 0.28, 0, Math.PI * 2);
            ctx.stroke();
        } else if (mode === 'diagonal') {
            // Bold diagonal banner strip
            ctx.save();
            ctx.translate(width * 0.5, height * 0.45);
            ctx.rotate(-Math.PI / 8);
            ctx.fillRect(-width * 0.5, -12, width * 1.0, 24);
            ctx.restore();
        } else if (mode === 'blocks') {
            // Modular architectural block layout
            ctx.fillRect(width * 0.1, height * 0.15, width * 0.35, height * 0.35);

            ctx.fillStyle = '#F4F4F5';
            ctx.fillRect(width * 0.48, height * 0.15, width * 0.22, height * 0.22);

            ctx.strokeStyle = accent;
            ctx.lineWidth = 2;
            ctx.strokeRect(width * 0.1, height * 0.54, width * 0.6, height * 0.08);
        } else {
            // Default Grid Accent Lines
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(width * 0.08, height * 0.35);
            ctx.lineTo(width * 0.6, height * 0.35);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(width * 0.08, height * 0.42);
            ctx.lineTo(width * 0.38, height * 0.42);
            ctx.stroke();
        }

        // 4. Headline Overlay — Crisp White Space Grotesk
        ctx.fillStyle = '#F4F4F5';
        const headSize = Math.max(12, Math.floor(Math.min(width, height) * 0.065));
        ctx.font = `700 ${headSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(headline.toUpperCase(), width * 0.08, height * 0.72);

        // 5. Subhead Overlay
        ctx.fillStyle = '#A1A1AA';
        const subSize = Math.max(9, Math.floor(headSize * 0.48));
        ctx.font = `400 ${subSize}px 'Inter', sans-serif`;
        ctx.fillText(subhead, width * 0.08, height * 0.72 + headSize * 1.35);

        // 6. Monospace Resolution Spec
        ctx.fillStyle = '#52525B';
        ctx.font = `400 ${Math.max(8, Math.floor(height * 0.03))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'right';
        ctx.fillText(`${width}×${height}`, width - 10, height - 10);

    }, [width, height, headline, subhead, tokens, mode]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="max-w-full h-auto border border-rule shadow-2xl bg-ground"
        />
    );
}
