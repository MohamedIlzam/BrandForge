import React, { useState } from 'react';
import CanvasRenderer from '../components/CanvasRenderer';
import {
    Sparkles, Grid, RotateCcw, Flame, LayoutTemplate, Box, Type, Upload, MessageSquare,
    Sliders, Ratio, Check, RefreshCw, Wand2
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
    const [isForging, setIsForging] = useState(false);

    const drawerItems = {
        templates: [
            { title: 'Cyberpunk Launch', desc: 'Neon blue & indigo tech showcase poster', prompt: 'Cyberpunk tech launch poster with glowing neon grid', ratio: '1:1' },
            { title: 'Minimalist SaaS Hero', desc: 'Sleek dark mode product graphic', prompt: 'Clean minimalist dark SaaS dashboard hero graphic', ratio: '16:9' },
            { title: 'AI Developer Keynote', desc: 'High-contrast event poster format', prompt: 'Developer conference poster with abstract AI neural lines', ratio: '9:16' },
            { title: 'Brand Header Banner', desc: 'Wide professional corporate header', prompt: 'Authoritative dark corporate brand banner with sharp accents', ratio: '4:1' }
        ],
        elements: [
            { title: 'Isometric Lattice', desc: '3D perspective tech grid background' },
            { title: 'Generative Orbs', desc: 'Glowing electric indigo spheres' },
            { title: 'High-Energy Beams', desc: 'Diagonal laser ray accents' },
            { title: 'Precision Stamp', desc: 'Monospaced spec sheet badge overlay' }
        ],
        text: [
            { title: 'Bold Tech Headline', desc: 'Geist 800 Uppercase Headline' },
            { title: 'Monospace Tag', desc: 'JetBrains Mono uppercase tag' },
            { title: 'Editorial Subtitle', desc: 'Inter 400 clean body description' }
        ],
        uploads: [
            { title: 'Brand Logo SVG', desc: 'Vector logo placeholder' },
            { title: 'Product Screenshot', desc: 'Dark mode UI mock screenshot' }
        ],
        prompts: [
            { title: 'Hyper-Precision Laser', prompt: 'High precision laser engraved circuit pattern with glowing electric indigo lines' },
            { title: 'Synthetic Aurora', prompt: 'Vibrant synthetic violet aurora wave with dark obsidian canvas and glowing cyan particles' },
            { title: 'Industrial Orange Heat', prompt: 'Industrial signal orange heat matrix with sharp slate edges' }
        ]
    };

    const canvasDimensions = {
        '1:1': { w: 520, h: 520, label: '1:1 Square' },
        '16:9': { w: 640, h: 360, label: '16:9 Landscape' },
        '9:16': { w: 340, h: 600, label: '9:16 Vertical Story' },
        '4:1': { w: 680, h: 170, label: '4:1 Banner' }
    };

    const currentDim = canvasDimensions[aspectRatio] || canvasDimensions['1:1'];

    const handleForge = () => {
        setIsForging(true);
        setTimeout(() => {
            setIsForging(false);
            onForgeVisual && onForgeVisual();
        }, 800);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden bg-forge-bg">
            {/* 1. Tool Ribbon & Preset Drawer */}
            <div className="w-72 bg-forge-surface border-r border-forge-border flex h-full shrink-0">
                {/* Vertical Ribbon */}
                <div className="w-14 bg-forge-bg/60 border-r border-forge-border flex flex-col items-center py-4 space-y-4 shrink-0">
                    {[
                        { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
                        { id: 'elements', icon: Box, label: 'Elements' },
                        { id: 'text', icon: Type, label: 'Typography' },
                        { id: 'uploads', icon: Upload, label: 'Assets' },
                        { id: 'prompts', icon: MessageSquare, label: 'AI Prompts' }
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

                {/* Drawer Content Area */}
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
                                }}
                                className="p-3 rounded-lg bg-forge-card/70 hover:bg-forge-card border border-forge-border/60 hover:border-forge-primary/50 cursor-pointer transition group"
                            >
                                <div className="font-geist font-bold text-xs text-white group-hover:text-forge-accent transition-colors">
                                    {item.title}
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
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-forge-bg/90">
                {/* Canvas Toolbar Header */}
                <div className="h-14 border-b border-forge-border px-6 flex items-center justify-between bg-forge-surface/40">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-forge-muted uppercase tracking-wider">Aspect Ratio:</span>
                        {['1:1', '16:9', '9:16', '4:1'].map(r => (
                            <button
                                key={r}
                                onClick={() => setAspectRatio(r)}
                                className={`px-3 py-1 rounded text-xs font-mono font-bold transition ${aspectRatio === r
                                        ? 'bg-forge-primary text-white shadow-sm'
                                        : 'bg-forge-card text-gray-400 hover:text-white border border-forge-border'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 border transition ${showGrid ? 'bg-forge-accent/20 border-forge-accent text-forge-accent' : 'bg-forge-card border-forge-border text-gray-400 hover:text-white'
                                }`}
                        >
                            <Grid className="w-3.5 h-3.5" />
                            <span>Grid Overlay</span>
                        </button>
                        <button
                            onClick={() => {
                                setComplexity(70);
                                setGlow(85);
                                setGeometric(90);
                                setHeadline('UNLEASH YOUR BRAND');
                                setSubhead('Design at the speed of thought with deterministic precision.');
                            }}
                            className="p-1.5 rounded bg-forge-card text-gray-400 hover:text-white border border-forge-border transition"
                            title="Reset Canvas"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Stage Canvas Area */}
                <div className="flex-1 p-6 flex items-center justify-center relative overflow-auto bg-black/40">
                    <div className="relative flex items-center justify-center p-4 rounded-2xl bg-forge-surface/30 border border-white/5 shadow-2xl">
                        <CanvasRenderer
                            width={currentDim.w}
                            height={currentDim.h}
                            headline={headline}
                            subhead={subhead}
                            tokens={tokens}
                        />

                        {/* Loading Overlay when forging */}
                        {isForging && (
                            <div className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30">
                                <Wand2 className="w-8 h-8 text-forge-primary animate-spin" />
                                <div className="font-geist font-bold text-sm text-white tracking-wide">
                                    SYNTHESIZING GENERATIVE VISUAL...
                                </div>
                                <div className="font-mono text-xs text-forge-accent">
                                    Enforcing Deterministic Brand Tokens
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Right Inspector Controls */}
            <div className="w-80 bg-forge-surface border-l border-forge-border flex flex-col h-full shrink-0">
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
                            className="w-full bg-forge-card border border-forge-border rounded-lg p-2.5 text-xs font-geist text-white focus:outline-none focus:border-forge-primary resize-none"
                        />
                    </div>

                    {/* Text Overlays */}
                    <div className="space-y-3">
                        <label className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider block">
                            Typography Overlays
                        </label>
                        <div>
                            <span className="text-[11px] text-gray-400 block mb-1">Headline Text</span>
                            <input
                                type="text"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary"
                            />
                        </div>
                        <div>
                            <span className="text-[11px] text-gray-400 block mb-1">Subtitle Text</span>
                            <input
                                type="text"
                                value={subhead}
                                onChange={(e) => setSubhead(e.target.value)}
                                className="w-full bg-forge-card border border-forge-border rounded-lg px-3 py-2 text-xs font-geist text-white focus:outline-none focus:border-forge-primary"
                            />
                        </div>
                    </div>

                    {/* Generative Sliders */}
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
                                <span className="text-gray-300 font-medium">Electric Glow Intensity</span>
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
                                <span className="text-gray-300 font-medium">Geometric Lattice</span>
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

                {/* Forge CTA Footer */}
                <div className="p-4 border-t border-forge-border bg-forge-surface">
                    <button
                        onClick={handleForge}
                        disabled={isForging}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-forge-primary via-indigo-600 to-forge-secondary hover:opacity-95 text-white font-geist font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-primary transition active:scale-95 disabled:opacity-50"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                        <span>Forge Visual</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
