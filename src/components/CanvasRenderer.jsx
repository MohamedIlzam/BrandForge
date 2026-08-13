import React, { useEffect, useRef } from 'react';

export default function CanvasRenderer({
    width = 300,
    height = 300,
    headline = "UNLEASH YOUR BRAND",
    subhead = "Design at the speed of thought",
    tokens = { primary: '#5D5DFF', secondary: '#8B5CF6', accent: '#0EA5E9', bg: '#111317' },
    mode = "lattice", // "lattice", "grid", "neural", "aurora", "blueprint"
    complexity = 70,
    glow = 85,
    geometric = 90
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 1. Radial Background Gradient
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height));
        bgGrad.addColorStop(0, '#161920');
        bgGrad.addColorStop(1, tokens.bg || '#111317');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Helpers
        const hexToRgba = (hex, alpha) => {
            let c = (hex || '#5D5DFF').replace('#', '');
            if (c.length === 3) c = c.split('').map(x => x + x).join('');
            const num = parseInt(c, 16);
            return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
        };

        // 2. Ambient Glow Orbs
        const numOrbs = Math.floor(complexity / 25) + 2;
        for (let i = 0; i < numOrbs; i++) {
            const cx = (Math.sin(i * 45 + glow) * 0.35 + 0.5) * width;
            const cy = (Math.cos(i * 25 + complexity) * 0.35 + 0.5) * height;
            const radius = Math.min(width, height) * (0.2 + (glow / 300));

            const orbGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, radius);
            const colorHex = i % 3 === 0 ? tokens.primary : (i % 3 === 1 ? tokens.secondary : tokens.accent);
            orbGrad.addColorStop(0, hexToRgba(colorHex, (glow / 100) * 0.4));
            orbGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // 3. Render Selected Visual Mode Artwork
        if (mode === 'grid') {
            // 3D Perspective Cyberpunk Grid
            ctx.strokeStyle = hexToRgba(tokens.primary, 0.25);
            ctx.lineWidth = 1;
            const horizonY = height * 0.55;

            // Perspective vanishing lines
            const numVLines = Math.floor(geometric / 6) + 4;
            for (let i = 0; i <= numVLines; i++) {
                const x = (i / numVLines) * width;
                ctx.beginPath();
                ctx.moveTo(width / 2, horizonY);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Horizontal floor grid lines
            const numHLines = 8;
            for (let i = 1; i <= numHLines; i++) {
                const y = horizonY + (height - horizonY) * Math.pow(i / numHLines, 2.2);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Horizon Glow Line
            ctx.strokeStyle = hexToRgba(tokens.accent, 0.8);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, horizonY);
            ctx.lineTo(width, horizonY);
            ctx.stroke();

        } else if (mode === 'neural') {
            // Connected Neural Circuit Nodes
            const nodes = [];
            const nodeCount = Math.floor(complexity / 6) + 8;
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: (Math.sin(i * 99) * 0.4 + 0.5) * width,
                    y: (Math.cos(i * 33) * 0.4 + 0.5) * height
                });
            }

            // Draw connections
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < width * 0.35) {
                        ctx.strokeStyle = hexToRgba(tokens.primary, 0.25 * (1 - dist / (width * 0.35)));
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw glowing node points
            nodes.forEach((n, idx) => {
                ctx.fillStyle = idx % 2 === 0 ? tokens.accent : tokens.secondary;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });

        } else if (mode === 'aurora') {
            // Synthetic Sine Waves
            const waves = 5;
            for (let w = 0; w < waves; w++) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = w % 2 === 0 ? hexToRgba(tokens.primary, 0.5) : hexToRgba(tokens.accent, 0.5);
                for (let x = 0; x <= width; x += 10) {
                    const y = height / 2 + Math.sin(x * 0.015 + w * 1.5) * (height * 0.22) + (w * 10 - 20);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

        } else if (mode === 'blueprint') {
            // Technical Specs Blueprint Grid
            ctx.strokeStyle = hexToRgba(tokens.accent, 0.2);
            ctx.lineWidth = 1;
            const step = 30;
            for (let x = 0; x < width; x += step) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y < height; y += step) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            // Crosshair Target
            ctx.strokeStyle = hexToRgba(tokens.primary, 0.7);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.25, 0, Math.PI * 2);
            ctx.stroke();

        } else {
            // Geometric Lattice (Default)
            ctx.save();
            ctx.translate(width / 2, height / 2);
            const rotCount = Math.floor(geometric / 15) + 3;
            for (let i = 0; i < rotCount; i++) {
                ctx.rotate((Math.PI * 2) / rotCount);
                ctx.strokeStyle = i % 2 === 0 ? hexToRgba(tokens.primary, 0.5) : hexToRgba(tokens.secondary, 0.5);
                ctx.lineWidth = 1.5;
                const sz = Math.min(width, height) * 0.24;
                ctx.beginPath();
                ctx.rect(-sz / 2, -sz / 2, sz, sz);
                ctx.stroke();
            }
            ctx.restore();
        }

        // 4. Monospaced Spec Watermark
        ctx.fillStyle = hexToRgba(tokens.accent, 0.85);
        ctx.font = `600 ${Math.max(9, Math.floor(height * 0.04))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'right';
        ctx.fillText(`BRANDFORGE // ${mode.toUpperCase()}`, width - 12, 20);

        // 5. Bold Headline & Subhead Overlay
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFFFFF';
        const headlineFontSize = Math.max(14, Math.floor(Math.min(width, height) * 0.068));
        ctx.font = `800 ${headlineFontSize}px 'Geist', sans-serif`;

        ctx.shadowColor = tokens.primary;
        ctx.shadowBlur = glow / 7;
        ctx.fillText(headline.toUpperCase(), 16, height - 32);

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#9CA3AF';
        const subFontSize = Math.max(9, Math.floor(headlineFontSize * 0.42));
        ctx.font = `400 ${subFontSize}px 'Inter', sans-serif`;
        ctx.fillText(subhead, 16, height - 12);

    }, [width, height, headline, subhead, tokens, mode, complexity, glow, geometric]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="max-w-full h-auto rounded-lg border border-white/10 shadow-2xl transition-all duration-300"
        />
    );
}
