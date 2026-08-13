import React, { useState } from 'react';
import CanvasRenderer from '../components/CanvasRenderer';
import { RotateCcw, Zap } from 'lucide-react';

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
        { title: 'Cyber Architecture', desc: 'Vector matrix brand identity', prompt: 'Obsidian dark architectural layout with vivid vector lines', ratio: '16:9', mode: 'grid' },
        { title: 'Monolith Showcase', desc: 'Square product asset', prompt: 'Minimalist dark product showcase with high-contrast focal circle', ratio: '1:1', mode: 'circle' },
        { title: 'Kinetic Story', desc: 'Vertical social format', prompt: 'Dynamic diagonal strip layout with bold typography', ratio: '9:16', mode: 'diagonal' },
        { title: 'Header Grid', desc: 'Wide website navigation banner', prompt: 'Modular dark header banner with grid block hierarchy', ratio: '4:1', mode: 'blocks' },
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
            {/* Left — Presets Drawer */}
            <div className="w-64 bg-surface border-r border-rule flex flex-col h-full shrink-0 overflow-y-auto">
                <div className="px-4 py-4 border-b border-rule flex items-center justify-between">
                    <h2 className="font-display font-bold text-sm text-ink tracking-wide uppercase">Presets</h2>
                    <span className="font-mono text-[10px] text-muted">04 READY</span>
                </div>
                <div className="p-3 space-y-1">
                    {presets.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => { setPrompt(p.prompt); setAspectRatio(p.ratio); setVisualMode(p.mode); }}
                            className="w-full text-left px-3 py-3 border-l-2 border-transparent hover:border-acid hover:bg-surface-elevated transition-all duration-150 group"
                        >
                            <span className="font-display font-semibold text-xs text-ink group-hover:text-acid block">{p.title}</span>
                            <span className="text-muted text-[11px] leading-tight block mt-0.5">{p.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Center — Canvas Stage */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-ground grain">
                {/* Stage Toolbar */}
                <div className="h-12 border-b border-rule px-5 flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted uppercase font-mono tracking-wider">Composition</span>
                        <div className="flex items-center gap-1">
                            {modes.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setVisualMode(m.id)}
                                    className={`px-3 py-1 text-xs font-display font-semibold transition-all duration-150 ${visualMode === m.id
                                            ? 'bg-acid text-black font-bold'
                                            : 'text-muted hover:text-ink hover:bg-hover'
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-5 bg-rule" />

                        <span className="text-xs text-muted uppercase font-mono tracking-wider">Aspect</span>
                        <div className="flex items-center gap-1">
                            {['1:1', '16:9', '9:16', '4:1'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setAspectRatio(r)}
                                    className={`px-2.5 py-1 font-mono text-xs transition-all duration-150 ${aspectRatio === r
                                            ? 'bg-ink text-black font-bold'
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
                        className="p-1.5 text-muted hover:text-acid transition-colors"
                        title="Reset Parameters"
                    >
                        <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                </div>

                {/* Canvas Display */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto relative">
                    <div className="bg-surface p-1 border border-rule shadow-2xl">
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
                        <div className="absolute inset-0 bg-ground/90 backdrop-blur-sm flex items-center justify-center">
                            <div className="flex items-center gap-3 px-5 py-3 border border-acid bg-surface text-acid font-display font-bold text-sm tracking-wider">
                                <Zap className="w-4 h-4 animate-spin" />
                                SYNTHESIZING VECTOR ART...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right — Parameter Inspector */}
            <div className="w-72 bg-surface border-l border-rule flex flex-col h-full shrink-0">
                <div className="px-4 py-4 border-b border-rule">
                    <h2 className="font-display font-bold text-sm text-ink uppercase tracking-wide">Inspector</h2>
                </div>

                <div className="p-4 flex-1 space-y-5 overflow-y-auto">
                    {/* Prompt */}
                    <div>
                        <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Directive Prompt</label>
                        <textarea
                            rows={3}
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            className="w-full border border-rule px-3 py-2 text-xs font-body text-ink focus:outline-none focus:border-acid resize-none bg-ground"
                        />
                    </div>

                    {/* Typography */}
                    <div className="pt-3 border-t border-rule space-y-3">
                        <label className="text-xs text-muted block uppercase font-mono tracking-wider">Typography Directives</label>
                        <div>
                            <span className="text-[11px] text-muted block mb-1">Headline</span>
                            <input
                                type="text"
                                value={headline}
                                onChange={e => setHeadline(e.target.value)}
                                className="w-full border border-rule px-3 py-1.5 text-xs font-display font-bold text-ink focus:outline-none focus:border-acid bg-ground"
                            />
                        </div>
                        <div>
                            <span className="text-[11px] text-muted block mb-1">Subtitle</span>
                            <input
                                type="text"
                                value={subhead}
                                onChange={e => setSubhead(e.target.value)}
                                className="w-full border border-rule px-3 py-1.5 text-xs font-body text-ink focus:outline-none focus:border-acid bg-ground"
                            />
                        </div>
                    </div>

                    {/* Parameters */}
                    <div className="pt-3 border-t border-rule space-y-3">
                        <label className="text-xs text-muted block uppercase font-mono tracking-wider">Vector Controls</label>
                        {[
                            { label: 'Density', value: complexity, set: setComplexity },
                            { label: 'Weight', value: glow, set: setGlow },
                            { label: 'Structure', value: geometric, set: setGeometric },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-ink">{s.label}</span>
                                    <span className="font-mono text-acid">{s.value}%</span>
                                </div>
                                <input
                                    type="range" min="10" max="100" value={s.value}
                                    onChange={e => s.set(parseInt(e.target.value))}
                                    className="w-full accent-acid"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Solid Acid Green CTA */}
                <div className="p-4 border-t border-rule bg-surface">
                    <button
                        onClick={handleForge}
                        disabled={isForging}
                        className="w-full py-3 bg-acid text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-acid-hover transition-colors duration-150 disabled:opacity-40"
                    >
                        Generate Asset
                    </button>
                </div>
            </div>
        </div>
    );
}
