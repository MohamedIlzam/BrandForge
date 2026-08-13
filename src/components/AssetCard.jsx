import React from 'react';
import CanvasRenderer from './CanvasRenderer';
import { ArrowUpRight } from 'lucide-react';

export default function AssetCard({ format, headline, subhead, tokens, onDownload }) {
    const modes = ['grid', 'circle', 'diagonal', 'blocks'];
    const mode = modes[Math.abs(format.name.charCodeAt(0)) % modes.length];

    return (
        <div className="bg-surface border border-rule flex flex-col group hover:border-acid transition-all duration-150">
            {/* Canvas preview */}
            <div className="p-3 bg-ground flex items-center justify-center border-b border-rule">
                <CanvasRenderer
                    width={format.previewW}
                    height={format.previewH}
                    headline={headline}
                    subhead={subhead}
                    tokens={tokens}
                    mode={mode}
                />
            </div>

            {/* Info row */}
            <div className="px-3 py-3 flex items-start justify-between bg-surface">
                <div className="min-w-0 flex-1">
                    <h4 className="font-display font-bold text-xs text-ink truncate group-hover:text-acid">{format.name}</h4>
                    <p className="font-mono text-[11px] text-muted mt-0.5">{format.w}×{format.h} — {format.ratio}</p>
                </div>

                <button
                    onClick={() => onDownload?.(format)}
                    className="shrink-0 ml-2 p-1.5 text-muted hover:text-black hover:bg-acid border border-rule hover:border-acid transition-all duration-150"
                    title="Export Format"
                >
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}
