import React, { useState } from 'react';
import { Palette, Check, Sliders, FileText, Code2, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BrandView({ tokens, setTokens, onSaveTokens }) {
    const [headlineFont, setHeadlineFont] = useState("'Geist', sans-serif");
    const [radius, setRadius] = useState('4px');
    const [toastMsg, setToastMsg] = useState(null);

    const presets = [
        { name: 'Forge Core', primary: '#5D5DFF', secondary: '#8B5CF6', accent: '#0EA5E9', bg: '#111317' },
        { name: 'Synthetic Aurora', primary: '#00F0FF', secondary: '#7701D0', accent: '#00DCE5', bg: '#051424' },
        { name: 'Industrial Signal', primary: '#FF3800', secondary: '#2E2E3A', accent: '#3A90FF', bg: '#12121D' },
        { name: 'Atelier Gold', primary: '#E9C176', secondary: '#C5A059', accent: '#4B4E6D', bg: '#131313' }
    ];

    const updateColor = (key, val) => {
        setTokens(prev => ({ ...prev, [key]: val }));
    };

    const handleApplyPreset = (p) => {
        setTokens({
            primary: p.primary,
            secondary: p.secondary,
            accent: p.accent,
            bg: p.bg
        });
        setToastMsg(`Applied ${p.name} theme tokens!`);
        setTimeout(() => setToastMsg(null), 2500);
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
        <div className="flex-1 flex h-full overflow-hidden bg-forge-bg text-forge-text">
            {/* 1. Left Token Control Panel */}
            <div className="w-80 bg-forge-surface border-r border-forge-border flex flex-col h-full shrink-0 overflow-y-auto">
                <div className="p-4 border-b border-forge-border flex items-center gap-2">
                    <Palette className="w-4 h-4 text-forge-primary" />
                    <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">Brand Tokens Editor</h2>
                </div>

                <div className="p-5 space-y-6">
                    {/* Preset Palettes */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Preset Color Palettes
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => handleApplyPreset(p)}
                                    className="p-2.5 rounded-lg bg-forge-card hover:bg-forge-border/60 border border-forge-border text-left transition group"
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
                            <div key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-forge-card border border-forge-border">
                                <div>
                                    <span className="text-xs font-medium text-gray-200 block">{item.label}</span>
                                    <span className="font-mono text-[11px] text-gray-400 uppercase">{tokens[item.key]}</span>
                                </div>
                                <input
                                    type="color"
                                    value={tokens[item.key]}
                                    onChange={(e) => updateColor(item.key, e.target.value)}
                                    className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
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
                            className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-forge-primary"
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
                        <div className="grid grid-cols-4 gap-1.5 bg-forge-card p-1.5 rounded-lg border border-forge-border">
                            {['0px', '4px', '8px', '16px'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRadius(r)}
                                    className={`py-1 text-center rounded text-xs font-mono font-semibold transition ${radius === r ? 'bg-forge-primary text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Save Action */}
                <div className="p-4 border-t border-forge-border bg-forge-surface mt-auto">
                    <button
                        onClick={() => {
                            onSaveTokens && onSaveTokens();
                            setToastMsg('Brand Tokens Saved & Applied across System!');
                            setTimeout(() => setToastMsg(null), 3000);
                        }}
                        className="w-full py-2.5 rounded-lg bg-forge-primary hover:bg-indigo-600 text-white font-geist font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-primary transition"
                    >
                        <Check className="w-4 h-4" />
                        <span>Lock Brand System</span>
                    </button>
                </div>
            </div>

            {/* 2. Main Live Component System Kit Stage */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-forge-bg/90">
                <div className="h-14 border-b border-forge-border px-6 flex items-center justify-between bg-forge-surface/40">
                    <h2 className="font-geist font-extrabold text-base text-white tracking-wide flex items-center gap-2">
                        STEP 2: LIVE BRAND SYSTEM KIT
                        <span className="text-[10px] font-mono font-semibold bg-forge-primary/20 text-forge-primary border border-forge-primary/30 px-2 py-0.5 rounded-full">
                            Dynamic React Components
                        </span>
                    </h2>
                    <div className="text-xs font-mono text-forge-muted">
                        Tokens propagated in real-time
                    </div>
                </div>

                {/* Component Showcase Grid */}
                <div className="flex-1 p-8 overflow-y-auto space-y-8 max-w-6xl mx-auto w-full">
                    {/* Action Buttons */}
                    <div className="glass-panel p-6 rounded-2xl border border-forge-border space-y-4">
                        <h3 className="font-geist font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-forge-accent" />
                            Primary & Secondary Interactive CTA Buttons
                        </h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                style={{ backgroundColor: tokens.primary, borderRadius: radius }}
                                className="px-5 py-2.5 text-xs font-geist font-bold text-white shadow-glow-primary hover:opacity-90 transition active:scale-95"
                            >
                                Primary Brand CTA
                            </button>
                            <button
                                style={{ backgroundColor: tokens.secondary, borderRadius: radius }}
                                className="px-5 py-2.5 text-xs font-geist font-bold text-white shadow-glow-secondary hover:opacity-90 transition active:scale-95"
                            >
                                Secondary Action
                            </button>
                            <button
                                style={{ borderColor: tokens.accent, color: tokens.accent, borderRadius: radius }}
                                className="px-5 py-2.5 text-xs font-mono font-bold bg-transparent border hover:bg-forge-card transition"
                            >
                                Outline Accent Button
                            </button>
                        </div>
                    </div>

                    {/* Status Badges & Chips */}
                    <div className="glass-panel p-6 rounded-2xl border border-forge-border space-y-4">
                        <h3 className="font-geist font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Badges, Status Pills & Micro-Chips
                        </h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <span
                                style={{ backgroundColor: `${tokens.primary}20`, borderColor: `${tokens.primary}50`, color: tokens.primary, borderRadius: radius }}
                                className="px-3 py-1 text-xs font-mono font-bold border flex items-center gap-1.5"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                PRIMARY TOKEN MATCHED
                            </span>

                            <span
                                style={{ backgroundColor: `${tokens.accent}20`, borderColor: `${tokens.accent}50`, color: tokens.accent, borderRadius: radius }}
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
                            Precision Form Controls
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-mono text-gray-400 mb-1 block">Brand Directive Input</label>
                                <input
                                    type="text"
                                    readOnly
                                    value="Cyberpunk Launch Banner directives"
                                    style={{ borderRadius: radius }}
                                    className="w-full bg-forge-card border border-forge-border px-3 py-2 text-xs font-geist text-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-gray-400 mb-1 block">System Parameter Slider</label>
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
            <div className="w-80 bg-forge-surface border-l border-forge-border flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-forge-border flex items-center gap-2">
                    <FileText className="w-4 h-4 text-forge-accent" />
                    <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">DESIGN.MD Spec Reader</h2>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <pre className="font-mono text-[11px] leading-relaxed text-forge-accent bg-black/60 p-4 rounded-xl border border-white/10 whitespace-pre-wrap select-all">
                        {designMdContent}
                    </pre>
                </div>
            </div>

            {/* Toast Feedback */}
            {toastMsg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-forge-surface border border-forge-primary text-white font-geist text-xs font-semibold shadow-2xl z-50 animate-bounce">
                    {toastMsg}
                </div>
            )}
        </div>
    );
}
