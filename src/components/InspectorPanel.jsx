import React from 'react';

export default function InspectorPanel({
    dpi, setDpi,
    format, setFormat,
    colorProfile, setColorProfile,
    headline, setHeadline,
    subhead, setSubhead,
    onBatchExport,
}) {
    return (
        <div className="w-72 bg-surface border-l border-rule flex flex-col h-full shrink-0">
            <div className="px-4 py-4 border-b border-rule">
                <h2 className="font-display font-bold text-sm text-ink uppercase tracking-wide">Export Engine</h2>
            </div>

            <div className="p-4 flex-1 space-y-5 overflow-y-auto">
                {/* Content Overrides */}
                <div>
                    <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Content Directives</label>
                    <div className="space-y-2">
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
                                className="w-full border border-rule px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-acid bg-ground"
                            />
                        </div>
                    </div>
                </div>

                {/* Resolution */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Resolution (DPI)</label>
                    <div className="flex gap-1">
                        {[72, 150, 300].map(d => (
                            <button
                                key={d}
                                onClick={() => setDpi(d)}
                                className={`flex-1 py-1.5 text-center font-mono text-xs transition-all duration-150 ${dpi === d ? 'bg-acid text-black font-bold' : 'bg-ground text-muted border border-rule hover:text-ink'
                                    }`}
                            >
                                {d} DPI
                            </button>
                        ))}
                    </div>
                </div>

                {/* Format */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Format</label>
                    <select
                        value={format}
                        onChange={e => setFormat(e.target.value)}
                        className="w-full border border-rule px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-acid bg-ground font-mono"
                    >
                        <option>PNG</option>
                        <option>SVG</option>
                        <option>WebP</option>
                        <option>PDF</option>
                    </select>
                </div>

                {/* Color Profile */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5 uppercase font-mono tracking-wider">Color Space</label>
                    <select
                        value={colorProfile}
                        onChange={e => setColorProfile(e.target.value)}
                        className="w-full border border-rule px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-acid bg-ground font-mono"
                    >
                        <option>sRGB</option>
                        <option>CMYK</option>
                        <option>Display P3</option>
                    </select>
                </div>

                {/* Compliance Checks */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-2 uppercase font-mono tracking-wider">Quality Compliance</label>
                    <div className="space-y-2">
                        {[
                            { label: 'Token Spec Match', ok: true },
                            { label: 'Fonts Subsetted', ok: true },
                            { label: 'Print Bleed Margin', ok: dpi >= 300 },
                        ].map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-mono">
                                <span className={`w-2 h-2 rounded-full ${c.ok ? 'bg-acid' : 'bg-zinc-700'}`} />
                                <span className={c.ok ? 'text-ink' : 'text-muted'}>{c.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Batch Export Button */}
            <div className="p-4 border-t border-rule bg-surface">
                <button
                    onClick={onBatchExport}
                    className="w-full py-3 bg-acid text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-acid-hover transition-colors duration-150"
                >
                    Export All Formats
                </button>
            </div>
        </div>
    );
}
