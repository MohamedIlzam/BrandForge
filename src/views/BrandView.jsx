import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function BrandView({ tokens, setTokens, onSaveTokens }) {
    const [headlineFont, setHeadlineFont] = useState('Space Grotesk');
    const [radius, setRadius] = useState('2px');
    const [copied, setCopied] = useState(null);
    const [buttonPreview, setButtonPreview] = useState('default');

    const presets = [
        { name: 'Acid Obsidian', primary: '#CCFF00', secondary: '#1A1A1E', accent: '#CCFF00', bg: '#09090B' },
        { name: 'Cyber Crimson', primary: '#FF2A6D', secondary: '#05D9E8', accent: '#FF2A6D', bg: '#09090B' },
        { name: 'Electric Cyan', primary: '#00F0FF', secondary: '#7000FF', accent: '#00F0FF', bg: '#09090B' },
        { name: 'Monochrome Slate', primary: '#F4F4F5', secondary: '#27272A', accent: '#F4F4F5', bg: '#09090B' },
    ];

    const tokenEntries = [
        { key: 'primary', label: 'Primary Accent' },
        { key: 'secondary', label: 'Secondary Surface' },
        { key: 'accent', label: 'Highlight Accent' },
        { key: 'bg', label: 'Ground Canvas' },
    ];

    const copyHex = (hex) => {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Left — Token Editor */}
            <div className="w-72 bg-surface border-r border-rule flex flex-col h-full shrink-0 overflow-y-auto">
                <div className="px-4 py-4 border-b border-rule">
                    <h2 className="font-display font-bold text-sm text-ink uppercase tracking-wide">Brand Tokens</h2>
                </div>

                <div className="p-4 space-y-5">
                    {/* Presets */}
                    <div>
                        <label className="text-xs text-muted block mb-2 uppercase font-mono tracking-wider">Presets</label>
                        <div className="space-y-1">
                            {presets.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setTokens({ primary: p.primary, secondary: p.secondary, accent: p.accent, bg: p.bg })}
                                    className="w-full text-left px-3 py-2 border-l-2 border-transparent hover:border-acid hover:bg-hover transition-all duration-150 flex items-center justify-between group"
                                >
                                    <span className="font-display font-semibold text-xs text-ink group-hover:text-acid">{p.name}</span>
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.primary }} />
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.secondary }} />
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.bg }} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Tokens */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-2 uppercase font-mono tracking-wider">Color Swatches</label>
                        <div className="space-y-2">
                            {tokenEntries.map(t => (
                                <div key={t.key} className="flex items-center gap-3 py-2 border-b border-rule last:border-0">
                                    <input
                                        type="color"
                                        value={tokens[t.key]}
                                        onChange={e => setTokens(prev => ({ ...prev, [t.key]: e.target.value }))}
                                        className="w-6 h-6 cursor-pointer bg-transparent border-none"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs text-ink block">{t.label}</span>
                                        <span className="font-mono text-[11px] text-muted">{tokens[t.key]}</span>
                                    </div>
                                    <button onClick={() => copyHex(tokens[t.key])} className="text-muted hover:text-acid transition-colors">
                                        {copied === tokens[t.key] ? <Check className="w-3.5 h-3.5 text-acid" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Headline Family</label>
                        <select
                            value={headlineFont}
                            onChange={e => setHeadlineFont(e.target.value)}
                            className="w-full border border-rule px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-acid bg-ground"
                        >
                            <option>Space Grotesk</option>
                            <option>Inter</option>
                            <option>JetBrains Mono</option>
                        </select>
                    </div>

                    {/* Radius */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Corner Radius</label>
                        <div className="flex gap-1">
                            {['0px', '2px', '4px', '8px'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRadius(r)}
                                    className={`flex-1 py-1 text-center font-mono text-xs transition-all duration-150 ${radius === r ? 'bg-acid text-black font-bold' : 'bg-ground text-muted hover:text-ink border border-rule'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 border-t border-rule">
                    <button
                        onClick={() => onSaveTokens?.()}
                        className="w-full py-2.5 bg-acid text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-acid-hover transition-colors duration-150"
                    >
                        Lock Token Specs
                    </button>
                </div>
            </div>

            {/* Center — Component Kit Preview */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-ground grain">
                <div className="h-12 border-b border-rule px-5 flex items-center justify-between bg-surface">
                    <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wide">Interactive Component Kit</h3>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-muted font-mono uppercase mr-2">State</span>
                        {['default', 'hover', 'disabled'].map(s => (
                            <button
                                key={s}
                                onClick={() => setButtonPreview(s)}
                                className={`px-3 py-1 text-xs capitalize font-display font-semibold transition-all duration-150 ${buttonPreview === s ? 'bg-ink text-black font-bold' : 'text-muted hover:text-ink hover:bg-hover'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto space-y-8 max-w-2xl">
                    {/* Buttons */}
                    <section>
                        <h4 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-4 pb-2 border-b border-rule">Button States</h4>
                        <div className="flex flex-wrap gap-3 items-center">
                            <button
                                style={{ backgroundColor: tokens.primary, color: tokens.primary === '#CCFF00' ? '#000000' : '#FFFFFF', borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-all duration-150 ${buttonPreview === 'hover' ? 'opacity-80 scale-102' : ''
                                    } ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''}`}
                            >
                                Primary Action
                            </button>

                            <button
                                style={{ borderColor: tokens.primary, color: tokens.primary, borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider bg-transparent border transition-all duration-150 ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''
                                    }`}
                            >
                                Secondary
                            </button>

                            <button
                                style={{ borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-ink bg-surface border border-rule transition-all duration-150 ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''
                                    }`}
                            >
                                Outline
                            </button>
                        </div>
                    </section>

                    {/* Badges */}
                    <section>
                        <h4 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-4 pb-2 border-b border-rule">Status Badges</h4>
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-acid-border bg-acid-tint text-acid" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
                                SYSTEM ACTIVE
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-rule bg-surface text-ink" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                TOKENS SYNCED
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-rule bg-surface text-muted" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                STANDBY
                            </span>
                        </div>
                    </section>

                    {/* Form Controls */}
                    <section>
                        <h4 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-4 pb-2 border-b border-rule">Form Inputs</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted block mb-1 uppercase font-mono">Directive Input</label>
                                <input type="text" readOnly value="Vivid Cyberpunk Brand Launch" className="w-full border border-rule px-3 py-2 text-xs text-ink bg-surface font-body" style={{ borderRadius: radius }} />
                            </div>
                            <div>
                                <label className="text-xs text-muted block mb-1 uppercase font-mono">Intensity Slider</label>
                                <input type="range" readOnly value="85" className="w-full mt-2 accent-acid" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right — Spec Sheet */}
            <div className="w-64 bg-surface border-l border-rule flex flex-col h-full shrink-0">
                <div className="px-4 py-4 border-b border-rule flex items-center justify-between">
                    <h2 className="font-display font-bold text-sm text-ink uppercase tracking-wide">DESIGN.MD Spec</h2>
                    <button onClick={() => copyHex(`primary: ${tokens.primary}\nsecondary: ${tokens.secondary}\naccent: ${tokens.accent}\nbg: ${tokens.bg}`)} className="text-muted hover:text-acid transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                    <pre className="font-mono text-[11px] leading-relaxed text-acid bg-ground p-3 border border-rule whitespace-pre-wrap">
                        {`# BRAND TOKENS SPEC

colors:
  primary: "${tokens.primary}"
  secondary: "${tokens.secondary}"
  accent: "${tokens.accent}"
  bg: "${tokens.bg}"

typography:
  display: "${headlineFont}"
  body: "Inter"
  code: "JetBrains Mono"

shape:
  radius: "${radius}"`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
