import React, { useState } from 'react';
import InspectorPanel from '../components/InspectorPanel';
import AssetCard from '../components/AssetCard';
import { ArrowUpRight } from 'lucide-react';

export default function ExportView({
    headline, setHeadline,
    subhead, setSubhead,
    tokens,
    dpi, setDpi,
    format, setFormat,
    colorProfile, setColorProfile,
    onShowToast,
}) {
    const [categoryFilter, setCategoryFilter] = useState('All');

    const assetFormats = [
        { id: 'insta', name: 'Instagram Post', w: 1080, h: 1080, ratio: '1:1', previewW: 180, previewH: 180, category: 'Social' },
        { id: 'linkedin', name: 'LinkedIn Banner', w: 1584, h: 396, ratio: '4:1', previewW: 280, previewH: 70, category: 'Social' },
        { id: 'twitter', name: 'X / Twitter Header', w: 1500, h: 500, ratio: '3:1', previewW: 270, previewH: 90, category: 'Social' },
        { id: 'story', name: 'Story / Reel', w: 1080, h: 1920, ratio: '9:16', previewW: 110, previewH: 195, category: 'Social' },
        { id: 'youtube', name: 'YouTube Thumbnail', w: 1280, h: 720, ratio: '16:9', previewW: 240, previewH: 135, category: 'Display' },
        { id: 'print', name: 'A4 Print Poster', w: 2480, h: 3508, ratio: '1:1.41', previewW: 140, previewH: 198, category: 'Print' },
    ];

    const filtered = categoryFilter === 'All'
        ? assetFormats
        : assetFormats.filter(a => a.category === categoryFilter);

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Center — Asset grid */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-ground grain">
                {/* Stage Toolbar */}
                <div className="h-12 border-b border-rule px-5 flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-4">
                        <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wide">Multi-Format Export</h3>
                        <div className="w-px h-5 bg-rule" />

                        <div className="flex items-center gap-1">
                            {['All', 'Social', 'Print', 'Display'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-3 py-1 text-xs font-display font-semibold transition-all duration-150 ${categoryFilter === cat
                                            ? 'bg-acid text-black font-bold'
                                            : 'text-muted hover:text-ink hover:bg-hover'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-acid bg-acid-tint px-2 py-0.5 border border-acid-border">
                            {dpi} DPI // {format} // {colorProfile}
                        </span>

                        <button
                            onClick={() => onShowToast?.(`Batch exporting ${filtered.length} assets...`)}
                            className="flex items-center gap-2 px-4 py-1.5 bg-acid text-black text-xs font-display font-bold uppercase hover:bg-acid-hover transition-colors duration-150"
                        >
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                            Export All
                        </button>
                    </div>
                </div>

                {/* Grid Display */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-5 max-w-5xl">
                        {filtered.map((asset, i) => (
                            <div key={asset.id} className={i === 0 ? 'col-span-1 row-span-1' : (i === 3 ? 'col-span-1' : '')}>
                                <AssetCard
                                    format={asset}
                                    headline={headline}
                                    subhead={subhead}
                                    tokens={tokens}
                                    onDownload={(a) => onShowToast?.(`Exporting ${a.name} at ${dpi} DPI...`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right — Export Engine Inspector */}
            <InspectorPanel
                dpi={dpi} setDpi={setDpi}
                format={format} setFormat={setFormat}
                colorProfile={colorProfile} setColorProfile={setColorProfile}
                headline={headline} setHeadline={setHeadline}
                subhead={subhead} setSubhead={setSubhead}
                onBatchExport={() => onShowToast?.(`Batch exporting all assets as ${format}...`)}
            />
        </div>
    );
}
