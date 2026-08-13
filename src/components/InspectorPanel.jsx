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
        <div className="w-72 bg-white border-l border-rule flex flex-col h-full shrink-0">
            <div className="px-4 py-4 border-b border-rule">
                <h2 className="font-display font-700 text-sm text-ink">Export settings</h2>
            </div>

            <div className="p-4 flex-1 space-y-5 overflow-y-auto">
                {/* Content directives */}
                <div>
                    <label className="text-xs text-muted block mb-1.5">Content</label>
                    <div className="space-y-2">
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
                                className="w-full border border-rule px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-cobalt bg-ground"
                            />
                        </div>
                    </div>
                </div>

                {/* Resolution */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5">Resolution (DPI)</label>
                    <div className="flex gap-1">
                        {[72, 150, 300].map(d => (
                            <button
                                key={d}
                                onClick={() => setDpi(d)}
                                className={`flex-1 py-1.5 text-center font-mono text-xs transition-colors duration-150 ${dpi === d ? 'bg-cobalt text-white' : 'bg-ground text-muted border border-rule hover:text-ink'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Format */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5">Format</label>
                    <select
                        value={format}
                        onChange={e => setFormat(e.target.value)}
                        className="w-full border border-rule px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-cobalt bg-ground"
                    >
                        <option>PNG</option>
                        <option>SVG</option>
                        <option>WebP</option>
                        <option>PDF</option>
                    </select>
                </div>

                {/* Color profile */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-1.5">Color profile</label>
                    <select
                        value={colorProfile}
                        onChange={e => setColorProfile(e.target.value)}
                        className="w-full border border-rule px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-cobalt bg-ground"
                    >
                        <option>sRGB</option>
                        <option>CMYK</option>
                        <option>Display P3</option>
                    </select>
                </div>

                {/* Compliance */}
                <div className="pt-3 border-t border-rule">
                    <label className="text-xs text-muted block mb-2">Compliance</label>
                    <div className="space-y-1.5">
                        {[
                            { label: 'Token match', ok: true },
                            { label: 'Font embedded', ok: true },
                            { label: 'Bleed margin', ok: dpi >= 300 },
                        ].map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                                <span className={`w-1.5 h-1.5 rounded-full ${c.ok ? 'bg-green-600' : 'bg-rule'}`} />
                                <span className={c.ok ? 'text-ink' : 'text-muted'}>{c.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Batch export */}
            <div className="p-4 border-t border-rule">
                <button
                    onClick={onBatchExport}
                    className="w-full py-2.5 bg-cobalt text-white font-display font-600 text-xs hover:bg-blue-700 transition-colors duration-150"
                >
                    Export all formats
                </button>
            </div>
        </div>
    );
}
