import React, { useState } from 'react';
import CanvasRenderer from '../components/CanvasRenderer';
import {
    Sparkles, Grid, RotateCcw, LayoutTemplate, Box, Type, Upload, MessageSquare,
    Sliders, Wand2, Layers, Cpu, Compass, Activity, ShieldAlert
} from 'lucide-react';

export default function GenerateView({
    headline, setHeadline,
    subhead, setSubhead,
    prompt, setPrompt,
    tokens,
    aspectRatio, setAspectRatio,
    showGrid, setShowGrid,
    complexity, setComplexity,
    glow, setGlow,
    geometric, setGeometric,
    onForgeVisual
}) {
    const [activeDrawer, setActiveDrawer] = useState('templates');
    const [visualMode, setVisualMode] = useState('lattice'); // 'lattice', 'grid', 'neural', 'aurora', 'blueprint'
    const [isForging, setIsForging] = useState(false);

    const visualModes = [
        { id: 'lattice', label: 'Laser Lattice', icon: Layers },
        { id: 'grid', label: 'Cyber Grid 3D', icon: Grid },
        { id: 'neural', label: 'Neural Matrix', icon: Cpu },
        { id: 'aurora', label: 'Synthetic Aurora', icon: Activity },
        { id: 'blueprint', label: 'Tech Blueprint', icon: Compass }
    ];

    const drawerItems = {
        templates: [
            { title: 'Cyberpunk Launch', mode: 'grid', desc: 'Neon blue & indigo tech showcase poster', prompt: 'Cyberpunk tech launch poster with glowing neon grid', ratio: '16:9' },
            { title: 'Neural AI Architecture', mode: 'neural', desc: 'Connected node matrix graph', prompt: 'Sleek neural network graph with glowing node pulses', ratio: '1:1' },
            { title: 'Synthetic Wave Keynote', mode: 'aurora', desc: 'Fluid sine wave energy curve', prompt: 'Vibrant synthetic wave keynote graphic with cyan dust', ratio: '9:16' },
            { title: 'Tech Blueprint Spec', mode: 'blueprint', desc: 'Architectural spec watermark graphic', prompt: 'Authoritative dark blueprint spec sheet with dimension ticks', ratio: '4:1' }
        ],
        elements: [
            { title: 'Perspective Grid Floor', mode: 'grid', desc: '3D perspective floor grid lines' },
            { title: 'Neural Node Network', mode: 'neural', desc: 'Connected data node pathways' },
            { title: 'Laser Rectangles', mode: 'lattice', desc: 'Concentric rotated laser square frame' },
            { title: 'Precision Crosshairs', mode: 'blueprint', desc: 'Technical spec target crosshair' }
        ],
        text: [
            { title: 'Geist 800 Uppercase', desc: 'Heavy modern geometric heading' },
            { title: 'JetBrains Mono Label', desc: 'Developer spec watermark label' },
            { title: 'Inter 400 Subtitle', desc: 'Clean high-readability body text' }
        ],
        uploads: [
            { title: 'Brand Logo Vector', desc: 'Vector SVG logo placeholder' },
            { title: 'UI Dashboard Mock', desc: 'Dark mode app interface asset' }
        ],
        prompts: [
            { title: 'Hyper-Precision Laser', mode: 'lattice', prompt: 'High precision laser engraved circuit pattern with glowing electric indigo lines' },
            { title: 'Synthetic Aurora Wave', mode: 'aurora', prompt: 'Vibrant synthetic aurora wave with dark obsidian canvas and glowing cyan particles' },
            { title: 'Cyberpunk Horizon Grid', mode: 'grid', prompt: '3D perspective floor grid with glowing horizon rays' }
        ]
    };

    const canvasDimensions = {
        '1:1': { w: 500, h: 500 },
        '16:9': { w: 620, h: 348 },
        '9:16': { w: 320, h: 568 },
        '4:1': { w: 660, h: 165 }
    };

    const currentDim = canvasDimensions[aspectRatio] || canvasDimensions['1:1'];

    const handleForge = () => {
        setIsForging(true);
        setTimeout(() => {
            setIsForging(false);
            onForgeVisual && onForgeVisual();
        }, 700);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden bg-forge-bg relative">
            {/* Ambient Mesh Background */}
            <div className="ambient-mesh"></div>

            {/* 1. Left Tool Ribbon & Drawer */}
            <div className="w-72 glass-panel border-r border-forge-border flex h-full shrink-0 z-10">
                {/* Vertical Ribbon */}
                <div className="w-14 bg-black/40 border-r border-forge-border flex flex-col items-center py-4 space-y-4 shrink-0">
                    {[
                        { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
                        { id: 'elements', icon: Box, label: 'Elements' },
                        { id: 'text', icon: Type, label: 'Typography' },
                        { id: 'uploads', icon: Upload, label: 'Assets' },
                        { id: 'prompts', icon: MessageSquare, label: 'Prompts' }
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeDrawer === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveDrawer(tab.id)}
                                className={`p-2.5 rounded-xl transition-all ${isActive
                                        ? 'bg-forge-primary text-white shadow-glow-primary'
                                        : 'text-gray-400 hover:text-white hover:bg-forge-card'
                                    }`}
                                title={tab.label}
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                        );
                    })}
                </div>

                {/* Drawer List */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="text-xs font-mono font-bold text-forge-muted uppercase tracking-wider mb-3">
                        {activeDrawer.toUpperCase()} PRESETS
                    </div>
                    <div className="space-y-2.5">
                        {drawerItems[activeDrawer]?.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    if (item.prompt) setPrompt(item.prompt);
                                    if (item.ratio) setAspectRatio(item.ratio);
                                    if (item.mode) setVisualMode(item.mode);
                                }}
                                className="glass-card p-3 rounded-xl cursor-pointer transition group"
                            >
                                <div className="font-geist font-bold text-xs text-white group-hover:text-forge-accent transition-colors flex items-center justify-between">
                                    <span>{item.title}</span>
                                    {item.mode && (
                                        <span className="text-[10px] font-mono text-forge-primary bg-forge-primary/10 px-1.5 py-0.5 rounded border border-forge-primary/20">
                                            {item.mode}
                                        </span>
                                    )}
                                </div>
                                <div className="text-[11px] text-gray-400 mt-1 leading-snug">
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Main Creative Canvas Stage */}
            <div className="flex-1 flex flex-col h-full overflow-hidden z-10">
                {/* Stage Toolbar Header */}
                <div className="h-14 border-b border-forge-border px-6 flex items-center justify-between glass-panel">
                    {/* Visual Style Mode Selector */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-forge-muted mr-1">Style Mode:</span>
                        {visualModes.map(m => {
                            const Icon = m.icon;
                            const isActive = visualMode === m.id;
                            return (
                                <button
                                    key={m.id}
                                    onClick={() => setVisualMode(m.id)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${isActive
                                            ? 'bg-forge-primary text-white shadow-glow-primary'
                                            : 'bg-forge-card/60 text-gray-400 hover:text-white border border-white/5'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{m.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-forge-muted">Aspect:</span>
                        {['1:1', '16:9', '9:16', '4:1'].map(r => (
                            <button
                                key={r}
                                onClick={() => setAspectRatio(r)}
                                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition ${aspectRatio === r
                                        ? 'bg-forge-accent text-white shadow-glow-accent'
                                        : 'bg-forge-card text-gray-400 hover:text-white border border-forge-border'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}

                        <button
                            onClick={() => {
                                setComplexity(70);
                                setGlow(85);
                                setGeometric(90);
                                setHeadline('UNLEASH YOUR BRAND');
                                setSubhead('Design at the speed of thought with deterministic precision.');
                                setVisualMode('lattice');
                            }}
                            className="p-1.5 rounded-lg bg-forge-card text-gray-400 hover:text-white border border-forge-border transition ml-2"
                            title="Reset Parameters"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Canvas Display */}
                <div className="flex-1 p-6 flex items-center justify-center relative overflow-auto bg-black/50">
                    <div className="relative flex items-center justify-center p-5 rounded-2xl glass-panel border border-white/10 shadow-2xl">
                        <CanvasRenderer
                            width={currentDim.w}
                            height={currentDim.h}
                            headline={headline}
                            subhead={subhead}
                            tokens={tokens}
                            mode={visualMode}
                            complexity={complexity}
                            glow={glow}
                            geometric={geometric}
                        />

                        {/* Loading Overlay */}
                        {isForging && (
                            <div className="absolute inset-0 rounded-2xl bg-black/85 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30">
                                <Wand2 className="w-8 h-8 text-forge-primary animate-spin" />
                                <div className="font-geist font-bold text-sm text-white tracking-wide">
                                    SYNTHESIZING GENERATIVE ART...
                                </div>
                                <div className="font-mono text-xs text-forge-accent">
                                    Enforcing Brand Token Compliance
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Right Generative Inspector */}
            <div className="w-80 glass-panel border-l border-forge-border flex flex-col h-full shrink-0 z-10">
                <div className="p-4 border-b border-forge-border flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-forge-primary" />
                    <h2 className="font-geist font-bold text-sm text-white uppercase tracking-wider">Generative Inspector</h2>
                </div>

                <div className="p-5 flex-1 space-y-5 overflow-y-auto">
                    {/* Prompt Directive */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Prompt Directive
                        </label>
                        <textarea
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-forge-card border border-forge-border rounded-xl p-2.5 text-xs font-geist text-white focus:outline-none focus:border-forge-primary resize-none"
                        />
                    </div>

                    {/* Headline & Subhead Directives */}
                    <div className="space-y-3">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Direct Overlays
                        </label>
                        <div>
                            <span className="text-[11px] text-gray-400 block mb-1">Headline Text</span>
                            <input
                                type="text"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="w-full bg-forge-card border border-forge-border rounded-xl px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary"
                            />
                        </div>
                        <div>
                            <span className="text-[11px] text-gray-400 block mb-1">Subtitle Text</span>
                            <input
                                type="text"
                                value={subhead}
                                onChange={(e) => setSubhead(e.target.value)}
                                className="w-full bg-forge-card border border-forge-border rounded-xl px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary"
                            />
                        </div>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-4 pt-2 border-t border-forge-border/60">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Generative Parameters
                        </label>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-300 font-medium">Complexity</span>
                                <span className="font-mono text-forge-primary font-bold">{complexity}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={complexity}
                                onChange={(e) => setComplexity(parseInt(e.target.value))}
                                className="w-full accent-forge-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-300 font-medium">Electric Glow</span>
                                <span className="font-mono text-forge-secondary font-bold">{glow}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={glow}
                                onChange={(e) => setGlow(parseInt(e.target.value))}
                                className="w-full accent-forge-secondary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-300 font-medium">Geometric Density</span>
                                <span className="font-mono text-forge-accent font-bold">{geometric}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={geometric}
                                onChange={(e) => setGeometric(parseInt(e.target.value))}
                                className="w-full accent-forge-accent"
                            />
                        </div>
                    </div>
                </div>

                {/* Forge Action Footer */}
                <div className="p-4 border-t border-forge-border glass-panel">
                    <button
                        onClick={handleForge}
                        disabled={isForging}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-forge-primary via-indigo-600 to-forge-secondary hover:opacity-95 text-white font-geist font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-primary transition active:scale-95 disabled:opacity-50"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                        <span>Forge Visual</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
