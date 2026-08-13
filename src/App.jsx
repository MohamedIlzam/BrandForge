import React, { useState } from 'react';
import ExportSidebar from './components/ExportSidebar';
import GenerateView from './views/GenerateView';
import BrandView from './views/BrandView';
import ExportView from './views/ExportView';

export default function App() {
    const [activeStep, setActiveStep] = useState('generate');

    // Brand tokens — Swiss defaults
    const [tokens, setTokens] = useState({
        primary: '#0052CC',
        secondary: '#1A1A1A',
        accent: '#0052CC',
        bg: '#F5F5F0',
    });

    const [headline, setHeadline] = useState('BRANDFORGE');
    const [subhead, setSubhead] = useState('Generate brand-compliant assets across every format.');
    const [prompt, setPrompt] = useState('Clean corporate identity system with geometric accents');

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
        <div className="flex h-screen w-screen overflow-hidden bg-ground text-ink font-body">
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
                        onForgeVisual={() => showToast('Asset generated')}
                    />
                )}

                {activeStep === 'brand' && (
                    <BrandView
                        tokens={tokens} setTokens={setTokens}
                        onSaveTokens={() => showToast('Tokens locked')}
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

            {/* Toast — simple, no bounce */}
            {toast && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-ink text-white text-xs font-body border border-ink z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}
