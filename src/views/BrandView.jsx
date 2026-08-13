import React, { useState } from 'react';
import { Palette, Check, FileText, Sparkles, ShieldCheck, CheckCircle2, Copy, Eye, MousePointer } from 'lucide-react';

export default function BrandView({ tokens, setTokens, onSaveTokens }) {
    const [headlineFont, setHeadlineFont] = useState("'Geist', sans-serif");
    const [radius, setRadius] = useState('4px');
    const [copiedHex, setCopiedHex] = useState(null);
    const [buttonState, setButtonState] = useState('default'); // 'default', 'hover', 'disabled', 'pulse'

    const presets = [
        { name: 'Forge Core', primary: '#5D5DFF', secondary: '#8B5CF6', accent: '#0EA5E9', bg: '#111317' },
        { name: 'Synthetic Aurora', primary: '#00F0FF', secondary: '#7701D0', accent: '#00DCE5', bg: '#051424' },
        { name: 'Industrial Signal', primary: '#FF3800', secondary: '#2E2E3A', accent: '#3A90FF', bg: '#12121D' },
        { name: 'Atelier Gold', primary: '#E9C176', secondary: '#C5A059', accent: '#4B4E6D', bg: '#131313' }
    ];

    const updateColor = (key, val) => {
        setTokens(prev => ({ ...prev, [key]: val }));
    };

    const copyHexToClipboard = (hex) => {
        navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        setTimeout(() => setCopiedHex(null), 2000);
    };

    const designMdContent = `---
name: Forge Custom Brand System
colors:
  surface: '${tokens.bg}'
  primary: '${tokens.primary}'
  secondary: '${tokens.secondary}'
  accent: '${tokens.accent}'
typography:
  headline: ${headlineFont.split(',')[0].replace(/'/g, '')}
  body: Inter
  label: JetBrains Mono
radius: ${radius}
---
# Brand & Style Guidelines
Surgical precision with dark-mode default, high-contrast accents, and strict geometric structure.`;

    return (
        <div className="flex-1 flex h-full overflow-hidden bg-forge-bg text-forge-text relative">
            <div className="ambient-mesh"></div>

            {/* 1. Left Token Control Panel */}
            <div className="w-80 glass-panel border-r border-forge-border flex flex-col h-full shrink-0 overflow-y-auto z-10">
                <div className="p-4 border-b border-forge-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-forge-primary" />
                        <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">Brand Tokens</h2>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Realtime Sync
                    </span>
                </div>

                <div className="p-5 space-y-6">
                    {/* Preset Palettes */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Curated Theme Presets
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setTokens({ primary: p.primary, secondary: p.secondary, accent: p.accent, bg: p.bg })}
                                    className="glass-card p-2.5 rounded-xl text-left transition group"
                                >
                                    <div className="text-xs font-geist font-bold text-gray-200 group-hover:text-white mb-1.5">
                                        {p.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ background: p.primary }}></span>
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ background: p.secondary }}></span>
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ background: p.accent }}></span>
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ background: p.bg }}></span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Tokens Picker */}
                    <div className="space-y-3 pt-2 border-t border-forge-border/60">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Core Color Palette Tokens
                        </label>

                        {[
                            { label: 'Primary Brand Color', key: 'primary' },
                            { label: 'Secondary Violet', key: 'secondary' },
                            { label: 'Electric Accent', key: 'accent' },
                            { label: 'Canvas Dark Surface', key: 'bg' }
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between p-2.5 rounded-xl glass-card">
                                <div>
                                    <span className="text-xs font-medium text-gray-200 block">{item.label}</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="font-mono text-[11px] text-gray-400 uppercase">{tokens[item.key]}</span>
                                        <button
                                            onClick={() => copyHexToClipboard(tokens[item.key])}
                                            className="text-gray-500 hover:text-white transition"
                                            title="Copy Hex Code"
                                        >
                                            {copiedHex === tokens[item.key] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="color"
                                    value={tokens[item.key]}
                                    onChange={(e) => updateColor(item.key, e.target.value)}
                                    className="w-8 h-8 rounded-lg border-none cursor-pointer bg-transparent"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Typography Token */}
                    <div className="space-y-2 pt-2 border-t border-forge-border/60">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Headline Font Family
                        </label>
                        <select
                            value={headlineFont}
                            onChange={(e) => setHeadlineFont(e.target.value)}
                            className="w-full bg-forge-card border border-forge-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-forge-primary"
                        >
                            <option value="'Geist', sans-serif">Geist (Modern Geometric)</option>
                            <option value="'Inter', sans-serif">Inter (Clean Technical)</option>
                            <option value="'JetBrains Mono', monospace">JetBrains Mono (Developer)</option>
                        </select>
                    </div>

                    {/* Corner Radius Token */}
                    <div className="space-y-2 pt-2 border-t border-forge-border/60">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Corner Roundness Token
                        </label>
                        <div className="grid grid-cols-4 gap-1.5 bg-forge-card p-1.5 rounded-xl border border-forge-border">
                            {['0px', '4px', '8px', '16px'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRadius(r)}
                                    className={`py-1 text-center rounded-lg text-xs font-mono font-semibold transition ${radius === r ? 'bg-forge-primary text-white shadow-glow-primary' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Save Action */}
                <div className="p-4 border-t border-forge-border glass-panel mt-auto">
                    <button
                        onClick={() => onSaveTokens && onSaveTokens()}
                        className="w-full py-2.5 rounded-xl bg-forge-primary hover:bg-indigo-600 text-white font-geist font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-primary transition"
                    >
                        <Check className="w-4 h-4" />
                        <span>Lock Brand System</span>
                    </button>
                </div>
            </div>

            {/* 2. Main Live Component System Kit Stage */}
            <div className="flex-1 flex flex-col h-full overflow-hidden z-10">
                <div className="h-14 border-b border-forge-border px-6 flex items-center justify-between glass-panel">
                    <h2 className="font-geist font-extrabold text-base text-white tracking-wide flex items-center gap-2">
                        STEP 2: LIVE BRAND SYSTEM KIT
                        <span className="text-[10px] font-mono font-semibold bg-forge-primary/20 text-forge-primary border border-forge-primary/30 px-2 py-0.5 rounded-full">
                            Interactive State Machine
                        </span>
                    </h2>

                    {/* Interactive State Toggle */}
                    <div className="flex items-center gap-1 bg-forge-card/80 p-1 rounded-xl border border-white/5">
                        <span className="text-[11px] font-mono text-gray-400 px-2 flex items-center gap-1">
                            <MousePointer className="w-3 h-3 text-forge-accent" /> State:
                        </span>
                        {['default', 'hover', 'pulse', 'disabled'].map(st => (
                            <button
                                key={st}
                                onClick={() => setButtonState(st)}
                                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-semibold capitalize transition ${buttonState === st
                                        ? 'bg-forge-primary text-white'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Component Showcase Grid */}
                <div className="flex-1 p-8 overflow-y-auto space-y-8 max-w-5xl mx-auto w-full">
                    {/* Action Buttons */}
                    <div className="glass-panel p-6 rounded-2xl border border-forge-border space-y-4">
                        <h3 className="font-geist font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-forge-accent" />
                            Primary & Secondary Interactive CTA Buttons
                        </h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                style={{ backgroundColor: tokens.primary, borderRadius: radius }}
                                disabled={buttonState === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-geist font-bold text-white transition active:scale-95 ${buttonState === 'hover' ? 'scale-105 shadow-glow-primary' : ''
                                    } ${buttonState === 'pulse' ? 'animate-pulse shadow-glow-primary' : ''} ${buttonState === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''
                                    }`}
                            >
                                Primary Brand CTA
                            </button>

                            <button
                                style={{ backgroundColor: tokens.secondary, borderRadius: radius }}
                                disabled={buttonState === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-geist font-bold text-white transition active:scale-95 ${buttonState === 'hover' ? 'scale-105 shadow-glow-secondary' : ''
                                    } ${buttonState === 'pulse' ? 'animate-pulse shadow-glow-secondary' : ''} ${buttonState === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''
                                    }`}
                            >
                                Secondary Action
                            </button>

                            <button
                                style={{ borderColor: tokens.accent, color: tokens.accent, borderRadius: radius }}
                                disabled={buttonState === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-mono font-bold bg-transparent border hover:bg-forge-card transition ${buttonState === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''
                                    }`}
                            >
                                Outline Accent Button
                            </button>
                        </div>
                    </div>

                    {/* Badges & Micro Chips */}
                    <div className="glass-panel p-6 rounded-2xl border border-forge-border space-y-4">
                        <h3 className="font-geist font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Status Badges & Tokens
                        </h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <span
                                style={{ backgroundColor: `${tokens.primary}20`, borderColor: `${tokens.primary}60`, color: tokens.primary, borderRadius: radius }}
                                className="px-3 py-1 text-xs font-mono font-bold border flex items-center gap-1.5"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                PRIMARY TOKEN SYNCED
                            </span>

                            <span
                                style={{ backgroundColor: `${tokens.accent}20`, borderColor: `${tokens.accent}60`, color: tokens.accent, borderRadius: radius }}
                                className="px-3 py-1 text-xs font-mono font-bold border"
                            >
                                ACCENT TAG // 100%
                            </span>

                            <span className="px-3 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                                LIVE SYNC OK
                            </span>
                        </div>
                    </div>

                    {/* Form Input Components */}
                    <div className="glass-panel p-6 rounded-2xl border border-forge-border space-y-4">
                        <h3 className="font-geist font-bold text-sm text-white uppercase tracking-wider">
                            Form Control Components
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-mono text-gray-400 mb-1 block">Brand Directive Field</label>
                                <input
                                    type="text"
                                    readOnly
                                    value="Cyberpunk Launch Banner directives"
                                    style={{ borderRadius: radius }}
                                    className="w-full bg-forge-card border border-forge-border px-3 py-2 text-xs font-geist text-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-gray-400 mb-1 block">Generative Density Slider</label>
                                <input
                                    type="range"
                                    readOnly
                                    value="85"
                                    style={{ accentColor: tokens.primary }}
                                    className="w-full mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Right DESIGN.MD Spec Reader */}
            <div className="w-80 glass-panel border-l border-forge-border flex flex-col h-full shrink-0 z-10">
                <div className="p-4 border-b border-forge-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-forge-accent" />
                        <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">DESIGN.MD Spec</h2>
                    </div>
                    <button
                        onClick={() => copyHexToClipboard(designMdContent)}
                        className="p-1.5 rounded bg-forge-card hover:bg-forge-border text-gray-400 hover:text-white transition"
                        title="Copy Markdown Spec"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <pre className="font-mono text-[11px] leading-relaxed text-forge-accent bg-black/60 p-4 rounded-xl border border-white/10 whitespace-pre-wrap select-all">
                        {designMdContent}
                    </pre>
                </div>
            </div>
        </div>
    );
}
