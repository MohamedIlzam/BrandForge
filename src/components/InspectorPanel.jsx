import React from 'react';
import { Sliders, ShieldCheck, Download, Copy, FileText, Layers, Check } from 'lucide-react';

export default function InspectorPanel({ dpi, setDpi, format, setFormat, colorProfile, setColorProfile, headline, setHeadline, subhead, setSubhead, onBatchExport }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopyCdn = () => {
        navigator.clipboard.writeText('https://cdn.brandforge.ai/v1/assets/master-bundle.zip');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <aside className="w-80 bg-forge-surface border-l border-forge-border flex flex-col h-screen sticky top-0 shrink-0">
            {/* Header */}
            <div className="p-5 border-b border-forge-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-forge-primary" />
                    <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">Export Settings</h2>
                </div>
                <span className="text-[10px] font-mono font-bold bg-forge-primary/20 text-forge-primary px-2 py-0.5 rounded border border-forge-primary/30">
                    STEP 3 SPECS
                </span>
            </div>

            <div className="p-5 flex-1 space-y-6 overflow-y-auto">
                {/* Content Overlays Input */}
                <div className="space-y-3">
                    <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                        Content Directive
                    </label>
                    <div>
                        <span className="text-[11px] font-medium text-gray-300 mb-1 block">Headline Text</span>
                        <input
                            type="text"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary transition"
                        />
                    </div>
                    <div>
                        <span className="text-[11px] font-medium text-gray-300 mb-1 block">Subtitle Overlay</span>
                        <input
                            type="text"
                            value={subhead}
                            onChange={(e) => setSubhead(e.target.value)}
                            className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary transition"
                        />
                    </div>
                </div>

                {/* Export Resolution & Quality */}
                <div className="space-y-3">
                    <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                        Resolution & Density
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: '72 DPI', val: 72, sub: 'Web' },
                            { label: '150 DPI', val: 150, sub: 'Digital' },
                            { label: '300 DPI', val: 300, sub: 'Print' }
                        ].map(item => (
                            <button
                                key={item.val}
                                onClick={() => setDpi(item.val)}
                                className={`py-2 px-2 rounded-lg text-center border transition-all ${dpi === item.val
                                        ? 'bg-forge-primary/20 border-forge-primary text-white shadow-glow-primary/30'
                                        : 'bg-forge-card border-forge-border text-gray-400 hover:text-white'
                                    }`}
                            >
                                <div className="text-xs font-mono font-bold">{item.label}</div>
                                <div className="text-[10px] text-gray-500 font-sans">{item.sub}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Export File Format */}
                <div className="space-y-3">
                    <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                        Primary Format
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 bg-forge-card p-1.5 rounded-lg border border-forge-border">
                        {['PNG', 'SVG', 'WEBP', 'PDF'].map(fmt => (
                            <button
                                key={fmt}
                                onClick={() => setFormat(fmt)}
                                className={`py-1.5 text-center rounded text-xs font-mono font-semibold transition ${format === fmt
                                        ? 'bg-forge-primary text-white shadow'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Profile Space */}
                <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                        Color Profile Space
                    </label>
                    <select
                        value={colorProfile}
                        onChange={(e) => setColorProfile(e.target.value)}
                        className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-forge-primary"
                    >
                        <option value="sRGB">sRGB IEC61966-2.1 (Standard Web)</option>
                        <option value="Display P3">Display P3 (Wide Gamut Mobile)</option>
                        <option value="CMYK">FOGRA39 CMYK (High DPI Print)</option>
                    </select>
                </div>

                {/* Brand Compliance Audit */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-forge-card to-forge-surface border border-forge-border/80 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="font-geist font-bold text-xs text-white">Brand Alignment Audit</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            PASSED
                        </span>
                    </div>

                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center text-gray-300">
                            <span className="text-gray-400 font-mono text-[11px]">Primary Token:</span>
                            <span className="font-mono text-forge-primary font-bold">#5D5DFF (100%)</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300">
                            <span className="text-gray-400 font-mono text-[11px]">Typography Spec:</span>
                            <span className="font-mono text-gray-200">Geist + Inter</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300">
                            <span className="text-gray-400 font-mono text-[11px]">Safe Margin Bleed:</span>
                            <span className="font-mono text-gray-200">3mm Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 border-t border-forge-border bg-forge-surface space-y-2">
                <button
                    onClick={onBatchExport}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-forge-primary to-forge-secondary hover:from-indigo-600 hover:to-violet-600 text-white font-geist font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-primary transition-all active:scale-95"
                >
                    <Download className="w-4 h-4" />
                    <span>Batch Export All Formats</span>
                </button>

                <button
                    onClick={handleCopyCdn}
                    className="w-full py-2.5 rounded-lg bg-forge-card hover:bg-forge-border text-gray-300 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-forge-border transition"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'CDN Bundle Link Copied!' : 'Copy Asset CDN URL'}</span>
                </button>
            </div>
        </aside>
    );
}
