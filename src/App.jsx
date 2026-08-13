import React, { useState } from 'react';
import ExportSidebar from './components/ExportSidebar';
import InspectorPanel from './components/InspectorPanel';
import AssetCard from './components/AssetCard';
import { Share2, Download, Layers, Sparkles, Filter, CheckCircle, RefreshCw, FileText } from 'lucide-react';

export default function App() {
    const [activeStep, setActiveStep] = useState('export');
    const [categoryFilter, setCategoryFilter] = useState('ALL');
    const [dpi, setDpi] = useState(300);
    const [format, setFormat] = useState('PNG');
    const [colorProfile, setColorProfile] = useState('sRGB');

    const [headline, setHeadline] = useState('UNLEASH YOUR BRAND');
    const [subhead, setSubhead] = useState('Design at the speed of thought with deterministic precision.');

    const [toast, setToast] = useState(null);

    const tokens = {
        primary: '#5D5DFF',
        secondary: '#8B5CF6',
        accent: '#0EA5E9',
        bg: '#111317'
    };

    const assetFormats = [
        { id: 'insta-post', name: 'Instagram Square Post', w: 1080, h: 1080, ratio: '1:1', aspectTag: 'SQ 1:1', previewW: 220, previewH: 220, category: 'Social Media' },
        { id: 'linkedin-banner', name: 'LinkedIn Cover Banner', w: 1584, h: 396, ratio: '4:1', aspectTag: 'WIDE 4:1', previewW: 320, previewH: 80, category: 'Social Media' },
        { id: 'twitter-header', name: 'Twitter / X Header', w: 1500, h: 500, ratio: '3:1', aspectTag: 'WIDE 3:1', previewW: 300, previewH: 100, category: 'Social Media' },
        { id: 'insta-story', name: 'Instagram Story / Reel', w: 1080, h: 1920, ratio: '9:16', aspectTag: 'VERT 9:16', previewW: 130, previewH: 230, category: 'Social Media' },
        { id: 'yt-thumb', name: 'YouTube Video Thumbnail', w: 1280, h: 720, ratio: '16:9', aspectTag: 'HD 16:9', previewW: 280, previewH: 157, category: 'Display Ads' },
        { id: 'print-a4', name: 'A4 High-DPI Print Poster', w: 2480, h: 3508, ratio: '1:1.41', aspectTag: 'PRINT A4', previewW: 165, previewH: 233, category: 'Print Formats' }
    ];

    const filteredAssets = categoryFilter === 'ALL'
        ? assetFormats
        : assetFormats.filter(a => a.category === categoryFilter);

    const showToastMsg = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleDownloadSingle = (asset) => {
        showToastMsg(`Exporting ${asset.name} (${dpi} DPI ${format})...`);
    };

    const handleBatchExport = () => {
        showToastMsg(`Packaging 6 High-DPI Assets into ZIP (${dpi} DPI, ${colorProfile})...`);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-forge-bg text-forge-text font-inter selection:bg-forge-primary selection:text-white">
            {/* 1. Left Sidebar Navigation */}
            <ExportSidebar
                activeStep={activeStep}
                onSelectStep={(step) => {
                    setActiveStep(step);
                    if (step !== 'export') {
                        showToastMsg(`Switched to ${step.toUpperCase()} step context`);
                    }
                }}
            />

            {/* 2. Main Center Workspace - Step 3 Export Hub */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-forge-bg">
                {/* Top Action Bar */}
                <header className="h-16 border-b border-forge-border px-6 flex items-center justify-between shrink-0 bg-forge-surface/60 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-forge-primary/20 text-forge-primary border border-forge-primary/30">
                            <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-geist font-extrabold text-base text-white tracking-wide flex items-center gap-2">
                                STEP 3: EXPORT & RESIZE HUB
                                <span className="text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                    6 Formats Auto-Adapted
                                </span>
                            </h2>
                            <p className="font-mono text-xs text-forge-muted">
                                Deterministic multi-canvas export engine with 100% brand token compliance.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToastMsg('Refreshed Canvas Projections')}
                            className="p-2 rounded-lg bg-forge-card hover:bg-forge-border text-gray-400 hover:text-white border border-forge-border transition"
                            title="Refresh Renderers"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleBatchExport}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-forge-primary to-forge-secondary hover:opacity-90 text-white font-geist font-bold text-xs flex items-center gap-2 shadow-glow-primary transition active:scale-95"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export All (.ZIP)</span>
                        </button>
                    </div>
                </header>

                {/* Filter Category Toolbar */}
                <div className="px-6 py-3 border-b border-forge-border bg-forge-surface/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-forge-muted" />
                        <span className="text-xs font-mono text-forge-muted uppercase tracking-wider">Format Filter:</span>
                        {['ALL', 'Social Media', 'Print Formats', 'Display Ads'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-3 py-1 rounded-md text-xs font-geist font-semibold transition ${categoryFilter === cat
                                        ? 'bg-forge-primary text-white shadow'
                                        : 'bg-forge-card text-gray-400 hover:text-white border border-forge-border'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="text-xs font-mono text-forge-muted">
                        Resolution Target: <span className="text-forge-accent font-bold">{dpi} DPI</span> <span className="text-gray-600">|</span> Format: <span className="text-white font-bold">{format}</span>
                    </div>
                </div>

                {/* Asset Cards Grid Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {filteredAssets.map(asset => (
                            <AssetCard
                                key={asset.id}
                                format={asset}
                                headline={headline}
                                subhead={subhead}
                                tokens={tokens}
                                onDownload={handleDownloadSingle}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* 3. Right Inspector & Settings Panel */}
            <InspectorPanel
                dpi={dpi}
                setDpi={setDpi}
                format={format}
                setFormat={setFormat}
                colorProfile={colorProfile}
                setColorProfile={setColorProfile}
                headline={headline}
                setHeadline={setHeadline}
                subhead={subhead}
                setSubhead={setSubhead}
                onBatchExport={handleBatchExport}
            />

            {/* Toast Feedback Notification */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-forge-surface/95 border border-forge-primary/50 text-white font-geist text-xs font-semibold shadow-2xl flex items-center gap-3 animate-bounce z-50">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{toast}</span>
                </div>
            )}
        </div>
    );
}
