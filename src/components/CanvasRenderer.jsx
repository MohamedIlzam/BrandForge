import React, { useEffect, useRef } from 'react';

export default function CanvasRenderer({
    width = 300,
    height = 300,
    headline = 'BRANDFORGE',
    subhead = 'Asset Studio',
    tokens = { primary: '#0052CC', secondary: '#1A1A1A', accent: '#0052CC', bg: '#F5F5F0' },
    mode = 'grid',
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const accent = tokens.primary || '#0052CC';

        // 1. Fill background — use user's bg token or off-white
        ctx.fillStyle = tokens.bg || '#F5F5F0';
        ctx.fillRect(0, 0, width, height);

        // 2. Draw a clean structural grid (Swiss-style)
        ctx.strokeStyle = '#D4D4D0';
        ctx.lineWidth = 0.5;
        const step = Math.max(20, Math.floor(Math.min(width, height) / 16));
        for (let x = step; x < width; x += step) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = step; y < height; y += step) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // 3. Accent element — geometric shape language based on mode
        if (mode === 'circle') {
            // Large off-center circle
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(width * 0.65, height * 0.4, Math.min(width, height) * 0.22, 0, Math.PI * 2);
            ctx.fill();
        } else if (mode === 'diagonal') {
            // Diagonal bar
            ctx.fillStyle = accent;
            ctx.save();
            ctx.translate(width * 0.5, height * 0.5);
            ctx.rotate(Math.PI / 6);
            ctx.fillRect(-width * 0.4, -8, width * 0.8, 16);
            ctx.restore();
        } else if (mode === 'blocks') {
            // Overlapping rectangles
            ctx.fillStyle = accent;
            ctx.fillRect(width * 0.1, height * 0.15, width * 0.35, height * 0.35);
            ctx.globalAlpha = 0.25;
            ctx.fillRect(width * 0.25, height * 0.3, width * 0.35, height * 0.35);
            ctx.globalAlpha = 1;
        } else {
            // Default: strict horizontal/vertical accent lines
            ctx.strokeStyle = accent;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(width * 0.08, height * 0.35);
            ctx.lineTo(width * 0.55, height * 0.35);
            ctx.stroke();

            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(width * 0.08, height * 0.42);
            ctx.lineTo(width * 0.35, height * 0.42);
            ctx.stroke();
        }

        // 4. Headline — flush-left, tight tracking
        ctx.fillStyle = '#1A1A1A';
        const headSize = Math.max(12, Math.floor(Math.min(width, height) * 0.065));
        ctx.font = `700 ${headSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(headline.toUpperCase(), width * 0.08, height * 0.72);

        // 5. Subhead
        ctx.fillStyle = '#6B6B6B';
        const subSize = Math.max(9, Math.floor(headSize * 0.5));
        ctx.font = `400 ${subSize}px 'Inter', sans-serif`;
        ctx.fillText(subhead, width * 0.08, height * 0.72 + headSize * 1.3);

        // 6. Spec label — bottom-right, monospace, only for actual data
        ctx.fillStyle = '#D4D4D0';
        ctx.font = `400 ${Math.max(8, Math.floor(height * 0.03))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'right';
        ctx.fillText(`${width}×${height}`, width - 8, height - 8);

    }, [width, height, headline, subhead, tokens, mode]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="max-w-full h-auto border border-rule"
        />
    );
}
