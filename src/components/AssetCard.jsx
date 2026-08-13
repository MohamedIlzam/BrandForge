import React from 'react';
import { Download, CheckCircle2, Ratio, Sparkles } from 'lucide-react';
import CanvasRenderer from './CanvasRenderer';

export default function AssetCard({ format, headline, subhead, tokens, onDownload }) {
    return (
        <div className="glass-card rounded-xl p-4 border border-forge-border/80 hover:border-forge-primary/50 transition-all duration-300 flex flex-col group hover:shadow-glow-primary/20">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-geist font-bold text-sm text-white group-hover:text-forge-accent transition-colors">
                        {format.name}
                    </h3>
                    <p className="font-mono text-xs text-forge-muted">
                        {format.w} × {format.h} px <span className="text-gray-500">•</span> {format.ratio}
                    </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Match
                </span>
            </div>

            {/* Canvas Container */}
            <div className="flex-1 bg-forge-bg/80 rounded-lg p-3 flex items-center justify-center min-h-[180px] border border-black/40 overflow-hidden relative group/canvas">
                <div className="w-full flex items-center justify-center scale-95 transition-transform duration-300 group-hover/canvas:scale-100">
                    <CanvasRenderer
                        width={format.previewW}
                        height={format.previewH}
                        headline={headline}
                        subhead={subhead}
                        tokens={tokens}
                    />
                </div>
                {/* Aspect Ratio Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10 flex items-center gap-1">
                    <Ratio className="w-3 h-3 text-forge-accent" />
                    {format.aspectTag}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="text-[11px] font-mono text-forge-muted">
                    Type: <span className="text-white uppercase font-bold">{format.category}</span>
                </div>
                <button
                    onClick={() => onDownload && onDownload(format)}
                    className="px-3 py-1.5 rounded-lg bg-forge-card hover:bg-forge-primary text-xs font-geist font-semibold text-white border border-white/10 hover:border-transparent flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PNG</span>
                </button>
            </div>
        </div>
    );
}
