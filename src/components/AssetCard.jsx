import React from 'react';
import CanvasRenderer from './CanvasRenderer';
import { ArrowUpRight } from 'lucide-react';

export default function AssetCard({ format, headline, subhead, tokens, onDownload }) {
    const modes = ['grid', 'circle', 'diagonal', 'blocks'];
    const mode = modes[Math.abs(format.name.charCodeAt(0)) % modes.length];

    return (
        <div className="bg-white border border-rule flex flex-col">
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
            <div className="px-3 py-2.5 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <h4 className="font-display font-600 text-xs text-ink truncate">{format.name}</h4>
                    <p className="font-mono text-[11px] text-muted mt-0.5">{format.w}×{format.h} — {format.ratio}</p>
                </div>

                <button
                    onClick={() => onDownload?.(format)}
                    className="shrink-0 ml-2 p-1.5 text-muted hover:text-cobalt border border-rule hover:border-cobalt transition-colors duration-150"
                    title="Export"
                >
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}
