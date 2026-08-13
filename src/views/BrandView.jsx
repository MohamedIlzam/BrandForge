import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function BrandView({ tokens, setTokens, onSaveTokens }) {
    const [headlineFont, setHeadlineFont] = useState('Space Grotesk');
    const [radius, setRadius] = useState('2px');
    const [copied, setCopied] = useState(null);
    const [buttonPreview, setButtonPreview] = useState('default');

    const presets = [
        { name: 'Cobalt Standard', primary: '#0052CC', secondary: '#1A1A1A', accent: '#0052CC', bg: '#F5F5F0' },
        { name: 'Verdant', primary: '#1A7F37', secondary: '#24292F', accent: '#1A7F37', bg: '#F6F8FA' },
        { name: 'Signal Red', primary: '#CF222E', secondary: '#24292F', accent: '#CF222E', bg: '#F5F5F0' },
        { name: 'Charcoal', primary: '#24292F', secondary: '#57606A', accent: '#24292F', bg: '#F5F5F0' },
    ];

    const tokenEntries = [
        { key: 'primary', label: 'Primary' },
        { key: 'secondary', label: 'Secondary' },
        { key: 'accent', label: 'Accent' },
        { key: 'bg', label: 'Background' },
    ];

    const copyHex = (hex) => {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Left — Token Editor */}
            <div className="w-72 bg-white border-r border-rule flex flex-col h-full shrink-0 overflow-y-auto">
                <div className="px-4 py-4 border-b border-rule">
                    <h2 className="font-display font-700 text-sm text-ink">Brand Tokens</h2>
                </div>

                <div className="p-4 space-y-5">
                    {/* Presets */}
                    <div>
                        <label className="text-xs text-muted block mb-2">Presets</label>
                        <div className="space-y-1">
                            {presets.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setTokens({ primary: p.primary, secondary: p.secondary, accent: p.accent, bg: p.bg })}
                                    className="w-full text-left px-3 py-2 border-l-2 border-transparent hover:border-cobalt hover:bg-cobalt-light transition-colors duration-150 flex items-center justify-between"
                                >
                                    <span className="font-display font-500 text-xs text-ink">{p.name}</span>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.primary }} />
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.secondary }} />
                                        <span className="w-3 h-3 border border-rule" style={{ background: p.bg }} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color tokens */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-2">Color palette</label>
                        <div className="space-y-2">
                            {tokenEntries.map(t => (
                                <div key={t.key} className="flex items-center gap-3 py-1.5 border-b border-rule last:border-0">
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
                                    <button onClick={() => copyHex(tokens[t.key])} className="text-muted hover:text-ink transition-colors">
                                        {copied === tokens[t.key] ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-1.5">Headline font</label>
                        <select
                            value={headlineFont}
                            onChange={e => setHeadlineFont(e.target.value)}
                            className="w-full border border-rule px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-cobalt bg-ground"
                        >
                            <option>Space Grotesk</option>
                            <option>Inter</option>
                            <option>JetBrains Mono</option>
                        </select>
                    </div>

                    {/* Radius */}
                    <div className="pt-3 border-t border-rule">
                        <label className="text-xs text-muted block mb-1.5">Corner radius</label>
                        <div className="flex gap-1">
                            {['0px', '2px', '4px', '8px'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRadius(r)}
                                    className={`flex-1 py-1 text-center font-mono text-xs transition-colors duration-150 ${radius === r ? 'bg-cobalt text-white' : 'bg-ground text-muted hover:text-ink border border-rule'
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
                        className="w-full py-2 bg-cobalt text-white font-display font-600 text-xs hover:bg-blue-700 transition-colors duration-150"
                    >
                        Lock tokens
                    </button>
                </div>
            </div>

            {/* Center — Component preview */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-ground grain">
                <div className="h-12 border-b border-rule px-5 flex items-center justify-between bg-white">
                    <h3 className="font-display font-600 text-sm text-ink">Component preview</h3>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-muted mr-2">State</span>
                        {['default', 'hover', 'disabled'].map(s => (
                            <button
                                key={s}
                                onClick={() => setButtonPreview(s)}
                                className={`px-2 py-0.5 text-xs capitalize transition-colors duration-150 ${buttonPreview === s ? 'bg-ink text-white' : 'text-muted hover:text-ink hover:bg-hover'
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
                        <h4 className="font-display font-600 text-xs text-muted uppercase tracking-wide mb-4 pb-2 border-b border-rule">Buttons</h4>
                        <div className="flex flex-wrap gap-3 items-center">
                            <button
                                style={{ backgroundColor: tokens.primary, borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-4 py-2 text-xs font-display font-600 text-white transition-all duration-150 ${buttonPreview === 'hover' ? 'opacity-80' : ''
                                    } ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''}`}
                            >
                                Primary action
                            </button>

                            <button
                                style={{ borderColor: tokens.primary, color: tokens.primary, borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-4 py-2 text-xs font-display font-600 bg-transparent border transition-all duration-150 ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''
                                    }`}
                            >
                                Secondary
                            </button>

                            <button
                                style={{ borderRadius: radius }}
                                disabled={buttonPreview === 'disabled'}
                                className={`px-4 py-2 text-xs font-display font-600 text-ink bg-ground border border-rule transition-all duration-150 ${buttonPreview === 'disabled' ? 'opacity-30 cursor-not-allowed' : ''
                                    }`}
                            >
                                Tertiary
                            </button>
                        </div>
                    </section>

                    {/* Badges */}
                    <section>
                        <h4 className="font-display font-600 text-xs text-muted uppercase tracking-wide mb-4 pb-2 border-b border-rule">Status indicators</h4>
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-body border border-rule bg-white text-ink" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tokens.primary }} />
                                Active
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-body border border-rule bg-white text-ink" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                Synced
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-body border border-rule bg-white text-muted" style={{ borderRadius: radius }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-rule" />
                                Pending
                            </span>
                        </div>
                    </section>

                    {/* Form controls */}
                    <section>
                        <h4 className="font-display font-600 text-xs text-muted uppercase tracking-wide mb-4 pb-2 border-b border-rule">Form controls</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted block mb-1">Text input</label>
                                <input type="text" readOnly value="Brand directive" className="w-full border border-rule px-2.5 py-1.5 text-xs text-ink bg-white" style={{ borderRadius: radius }} />
                            </div>
                            <div>
                                <label className="text-xs text-muted block mb-1">Range slider</label>
                                <input type="range" readOnly value="72" className="w-full mt-2 accent-cobalt" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right — Design spec */}
            <div className="w-64 bg-white border-l border-rule flex flex-col h-full shrink-0">
                <div className="px-4 py-4 border-b border-rule flex items-center justify-between">
                    <h2 className="font-display font-700 text-sm text-ink">Spec</h2>
                    <button onClick={() => copyHex(`primary: ${tokens.primary}\nsecondary: ${tokens.secondary}\naccent: ${tokens.accent}\nbg: ${tokens.bg}`)} className="text-muted hover:text-ink transition-colors">
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                    <pre className="font-mono text-[11px] leading-relaxed text-ink whitespace-pre-wrap bg-ground p-3 border border-rule">
                        {`colors:
  primary: ${tokens.primary}
  secondary: ${tokens.secondary}
  accent: ${tokens.accent}
  bg: ${tokens.bg}

typography:
  display: ${headlineFont}
  body: Inter
  data: JetBrains Mono

shape:
  radius: ${radius}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
