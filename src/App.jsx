import React, { useState } from 'react';
import ExportSidebar from './components/ExportSidebar';
import GenerateView from './views/GenerateView';
import BrandView from './views/BrandView';
import ExportView from './views/ExportView';

export default function App() {
    const [activeStep, setActiveStep] = useState('generate');

    // Dark Obsidian + Acid Green Tokens
    const [tokens, setTokens] = useState({
        primary: '#CCFF00',
        secondary: '#1A1A1E',
        accent: '#CCFF00',
        bg: '#09090B',
    });

    const [headline, setHeadline] = useState('BRANDFORGE');
    const [subhead, setSubhead] = useState('Generate brand-compliant assets across every format.');
    const [prompt, setPrompt] = useState('Obsidian dark architectural layout with vivid vector lines');

    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [showGrid, setShowGrid] = useState(false);
    const [complexity, setComplexity] = useState(70);
    const [glow, setGlow] = useState(60);
    const [geometric, setGeometric] = useState(80);

    const [dpi, setDpi] = useState(300);
    const [format, setFormat] = useState('PNG');
    const [colorProfile, setColorProfile] = useState('sRGB');

    const [toast, setToast] = useState(null);
    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-ground text-ink font-body selection:bg-acid selection:text-black">
            <ExportSidebar activeStep={activeStep} onSelectStep={setActiveStep} />

            <div className="flex-1 flex h-full overflow-hidden">
                {activeStep === 'generate' && (
                    <GenerateView
                        headline={headline} setHeadline={setHeadline}
                        subhead={subhead} setSubhead={setSubhead}
                        prompt={prompt} setPrompt={setPrompt}
                        tokens={tokens}
                        aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
                        showGrid={showGrid} setShowGrid={setShowGrid}
                        complexity={complexity} setComplexity={setComplexity}
                        glow={glow} setGlow={setGlow}
                        geometric={geometric} setGeometric={setGeometric}
                        onForgeVisual={() => showToast('Asset generated in Acid Obsidian')}
                    />
                )}

                {activeStep === 'brand' && (
                    <BrandView
                        tokens={tokens} setTokens={setTokens}
                        onSaveTokens={() => showToast('Tokens locked in system')}
                    />
                )}

                {activeStep === 'export' && (
                    <ExportView
                        headline={headline} setHeadline={setHeadline}
                        subhead={subhead} setSubhead={setSubhead}
                        tokens={tokens}
                        dpi={dpi} setDpi={setDpi}
                        format={format} setFormat={setFormat}
                        colorProfile={colorProfile} setColorProfile={setColorProfile}
                        onShowToast={showToast}
                    />
                )}
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-surface text-acid font-mono text-xs border border-acid shadow-2xl z-50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
                    <span>{toast}</span>
                </div>
            )}
        </div>
    );
}
