import React, { useState } from 'react';
import ExportSidebar from './components/ExportSidebar';
import GenerateView from './views/GenerateView';
import BrandView from './views/BrandView';
import ExportView from './views/ExportView';
import { CheckCircle } from 'lucide-react';

export default function App() {
    const [activeStep, setActiveStep] = useState('generate'); // 'generate', 'brand', 'export'

    // Shared Brand Tokens State
    const [tokens, setTokens] = useState({
        primary: '#5D5DFF',
        secondary: '#8B5CF6',
        accent: '#0EA5E9',
        bg: '#111317'
    });

    // Shared Directives & Sliders State
    const [headline, setHeadline] = useState('UNLEASH YOUR BRAND');
    const [subhead, setSubhead] = useState('Design at the speed of thought with deterministic precision.');
    const [prompt, setPrompt] = useState('Futuristic Cyberpunk Tech Launch Banner with neon typography');

    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [showGrid, setShowGrid] = useState(false);
    const [complexity, setComplexity] = useState(70);
    const [glow, setGlow] = useState(85);
    const [geometric, setGeometric] = useState(90);

    // Export Settings State
    const [dpi, setDpi] = useState(300);
    const [format, setFormat] = useState('PNG');
    const [colorProfile, setColorProfile] = useState('sRGB');

    const [toast, setToast] = useState(null);

    const showToastMsg = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-forge-bg text-forge-text font-inter selection:bg-forge-primary selection:text-white">
            {/* Unified Left Sidebar */}
            <ExportSidebar
                activeStep={activeStep}
                onSelectStep={(step) => {
                    setActiveStep(step);
                    showToastMsg(`Navigated to Step 0${step === 'generate' ? '1' : step === 'brand' ? '2' : '3'}`);
                }}
            />

            {/* Main Active View Container */}
            <div className="flex-1 flex h-full overflow-hidden">
                {activeStep === 'generate' && (
                    <GenerateView
                        headline={headline}
                        setHeadline={setHeadline}
                        subhead={subhead}
                        setSubhead={setSubhead}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        tokens={tokens}
                        aspectRatio={aspectRatio}
                        setAspectRatio={setAspectRatio}
                        showGrid={showGrid}
                        setShowGrid={setShowGrid}
                        complexity={complexity}
                        setComplexity={setComplexity}
                        glow={glow}
                        setGlow={setGlow}
                        geometric={geometric}
                        setGeometric={setGeometric}
                        onForgeVisual={() => showToastMsg('Generative Visual Synthesized!')}
                    />
                )}

                {activeStep === 'brand' && (
                    <BrandView
                        tokens={tokens}
                        setTokens={setTokens}
                        onSaveTokens={() => {
                            showToastMsg('Brand Tokens Saved Across All Workflows!');
                        }}
                    />
                )}

                {activeStep === 'export' && (
                    <ExportView
                        headline={headline}
                        setHeadline={setHeadline}
                        subhead={subhead}
                        setSubhead={setSubhead}
                        tokens={tokens}
                        dpi={dpi}
                        setDpi={setDpi}
                        format={format}
                        setFormat={setFormat}
                        colorProfile={colorProfile}
                        setColorProfile={setColorProfile}
                        onShowToast={showToastMsg}
                    />
                )}
            </div>

            {/* Global Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-forge-surface/95 border border-forge-primary text-white font-geist text-xs font-semibold shadow-2xl flex items-center gap-3 animate-bounce z-50">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{toast}</span>
                </div>
            )}
        </div>
    );
}
