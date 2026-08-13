import React, { useState } from 'react';
import CanvasRenderer from '../components/CanvasRenderer';
import { RotateCcw } from 'lucide-react';

export default function GenerateView({
    headline, setHeadline,
    subhead, setSubhead,
    prompt, setPrompt,
    tokens,
    aspectRatio, setAspectRatio,
    complexity, setComplexity,
    glow, setGlow,
    geometric, setGeometric,
    onForgeVisual,
}) {
    const [visualMode, setVisualMode] = useState('grid');
    const [isForging, setIsForging] = useState(false);

    const presets = [
        { title: 'Corporate Identity', desc: 'Structured brand system launch', prompt: 'Clean corporate identity system with geometric accents', ratio: '16:9', mode: 'grid' },
        { title: 'Product Card', desc: 'Square product feature asset', prompt: 'Minimal product showcase with off-center composition', ratio: '1:1', mode: 'circle' },
        { title: 'Vertical Story', desc: 'Social story / reel format', prompt: 'Bold vertical story layout with typographic hierarchy', ratio: '9:16', mode: 'diagonal' },
        { title: 'Header Banner', desc: 'Wide navigation banner', prompt: 'Professional wide-format header with brand elements', ratio: '4:1', mode: 'blocks' },
    ];

    const modes = [
        { id: 'grid', label: 'Grid' },
        { id: 'circle', label: 'Circle' },
        { id: 'diagonal', label: 'Diagonal' },
        { id: 'blocks', label: 'Blocks' },
    ];

    const dims = {
        '1:1': { w: 480, h: 480 },
        '16:9': { w: 600, h: 337 },
        '9:16': { w: 300, h: 533 },
        '4:1': { w: 640, h: 160 },
    };
    const d = dims[aspectRatio] || dims['1:1'];

    const handleForge = () => {
        setIsForging(true);
        setTimeout(() => { setIsForging(false); onForgeVisual?.(); }, 500);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Left — Presets */}
            <div className="w-64 bg-white border-r border-rule flex flex-col h-full shrink-0 overflow-y-auto">
                <div className="px-4 py-4 border-b border-rule">
                    <h2 className="font-display font-700 text-sm text-ink">Presets</h2>
                </div>
                <div className="p-4 space-y-1">
                    {presets.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => { setPrompt(p.prompt); setAspectRatio(p.ratio); setVisualMode(p.mode); }}
                            className="w-full text-left px-3 py-2.5 border-l-2 border-transparent hover:border-cobalt hover:bg-cobalt-light transition-colors duration-150"
                        >
                            <span className="font-display font-600 text-xs text-ink block">{p.title}</span>
                            <span className="text-muted text-[11px] leading-tight block mt-0.5">{p.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Center — Canvas stage */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-ground grain">
                {/* Toolbar */}
                <div className="h-12 border-b border-rule px-5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted">Composition</span>
                        <div className="flex items-center gap-1">
                            {modes.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setVisualMode(m.id)}
                                    className={`px-2.5 py-1 text-xs font-display font-500 transition-colors duration-150 ${visualMode === m.id
                                            ? 'bg-cobalt text-white'
                                            : 'text-muted hover:text-ink hover:bg-hover'
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-5 bg-rule" />

                        <span className="text-xs text-muted">Ratio</span>
                        <div className="flex items-center gap-1">
                            {['1:1', '16:9', '9:16', '4:1'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setAspectRatio(r)}
                                    className={`px-2 py-1 font-mono text-xs transition-colors duration-150 ${aspectRatio === r
                                            ? 'bg-ink text-white'
                                            : 'text-muted hover:text-ink hover:bg-hover'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setComplexity(70); setGlow(85); setGeometric(90);
                            setHeadline('BRANDFORGE'); setSubhead('Asset Studio');
                            setVisualMode('grid');
                        }}
                        className="p-1.5 text-muted hover:text-ink transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Canvas */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto relative">
                    <div className="bg-white p-1 border border-rule">
                        <CanvasRenderer
                            width={d.w}
                            height={d.h}
                            headline={headline}
                            subhead={subhead}
                            tokens={tokens}
                            mode={visualMode}
                        />
                    </div>

                    {isForging && (
                        <div className="absolute inset-0 bg-ground/90 flex items-center justify-center">
                            <p className="font-display font-600 text-sm text-ink">Generating…</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right — Inspector */}
            <div className="w-72 bg-white border-l border-rule flex flex-col h-full shrink-0">
                <div className="px-4 py-4 border-b border-rule">
                    <h2 className="font-display font-700 text-sm text-ink">Inspector</h2>
                </div>

                <div className="p-4 flex-1 space-y-5 overflow-y-auto">
                    {/* Prompt */}
                    <div>
                        <label className="text-xs text-muted block mb-1.5">Prompt</label>
                        <textarea
                            rows={3}
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            className="w-full border border-rule px-2.5 py-2 text-xs font-body text-ink focus:outline-none focus:border-cobalt resize-none bg-ground"
                        />
                    </div>

                    {/* Typography */}
                    <div className="pt-3 border-t border-rule space-y-3">
                        <label className="text-xs text-muted block">Typography overlays</label>
                        <div>
                            <span className="text-[11px] text-muted block mb-1">Headline</span>
                            <input
                                type="text"
                                value={headline}
                                onChange={e => setHeadline(e.target.value)}
                                className="w-full border border-rule px-2.5 py-1.5 text-xs font-display text-ink focus:outline-none focus:border-cobalt bg-ground"
                            />
                        </div>
                        <div>
                            <span className="text-[11px] text-muted block mb-1">Subtitle</span>
                            <input
                                type="text"
                                value={subhead}
                                onChange={e => setSubhead(e.target.value)}
                                className="w-full border border-rule px-2.5 py-1.5 text-xs font-body text-ink focus:outline-none focus:border-cobalt bg-ground"
                            />
                        </div>
                    </div>

                    {/* Parameters */}
                    <div className="pt-3 border-t border-rule space-y-3">
                        <label className="text-xs text-muted block">Parameters</label>
                        {[
                            { label: 'Density', value: complexity, set: setComplexity },
                            { label: 'Weight', value: glow, set: setGlow },
                            { label: 'Structure', value: geometric, set: setGeometric },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-ink">{s.label}</span>
                                    <span className="font-mono text-muted">{s.value}</span>
                                </div>
                                <input
                                    type="range" min="10" max="100" value={s.value}
                                    onChange={e => s.set(parseInt(e.target.value))}
                                    className="w-full accent-cobalt"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Generate CTA */}
                <div className="p-4 border-t border-rule">
                    <button
                        onClick={handleForge}
                        disabled={isForging}
                        className="w-full py-2.5 bg-cobalt text-white font-display font-600 text-xs tracking-wide hover:bg-blue-700 transition-colors duration-150 disabled:opacity-40"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}
