import React from 'react';
import { Sparkles, Palette, Share2, Settings, HelpCircle, CheckCircle2, Flame } from 'lucide-react';

export default function ExportSidebar({ activeStep = 'export', onSelectStep }) {
    const steps = [
        { id: 'generate', num: '01', label: 'Generate Visuals', icon: Sparkles, status: 'completed' },
        { id: 'brand', num: '02', label: 'Brand Tokens & System', icon: Palette, status: 'completed' },
        { id: 'export', num: '03', label: 'Export & Resize Hub', icon: Share2, status: 'active' },
    ];

    return (
        <aside className="w-64 bg-forge-surface border-r border-forge-border flex flex-col h-screen sticky top-0 shrink-0">
            {/* Brand Header */}
            <div className="p-5 border-b border-forge-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forge-primary to-forge-secondary flex items-center justify-center shadow-glow-primary">
                    <Flame className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                    <h1 className="font-geist font-extrabold text-base tracking-wide text-white">PROJECT FORGE</h1>
                    <p className="font-mono text-xs text-forge-muted">Marketing Campaign v1</p>
                </div>
            </div>

            {/* Workflow Progress */}
            <div className="p-4 flex-1">
                <div className="text-xs font-mono font-semibold text-forge-muted uppercase tracking-wider mb-3 px-2">
                    Workflow Steps
                </div>
                <nav className="space-y-1.5">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = step.id === activeStep;
                        return (
                            <button
                                key={step.id}
                                onClick={() => onSelectStep && onSelectStep(step.id)}
                                className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${isActive
                                        ? 'bg-forge-primary/15 border border-forge-primary/40 text-white font-medium shadow-sm'
                                        : 'text-gray-400 hover:text-white hover:bg-forge-card/60'
                                    }`}
                            >
                                <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-forge-primary text-white' : 'bg-forge-border text-gray-400'
                                    }`}>
                                    {step.num}
                                </span>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-forge-accent' : 'text-gray-400'}`} />
                                <span className="text-sm font-geist">{step.label}</span>
                                {step.status === 'completed' && !isActive && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Brand System Verified Badge */}
                <div className="mt-8 p-3.5 rounded-lg bg-forge-card/80 border border-forge-border text-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="font-mono font-semibold text-emerald-400 text-[11px] uppercase">Brand Verified</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-[11px]">
                        Tokens locked: <span className="text-white font-mono">Electric Indigo (#5D5DFF)</span>
                    </p>
                </div>
            </div>

            {/* Footer System Nav */}
            <div className="p-4 border-t border-forge-border space-y-1">
                <button className="w-full text-left px-3 py-2 text-xs font-medium text-gray-400 hover:text-white flex items-center gap-2 rounded hover:bg-forge-card/50 transition">
                    <Settings className="w-4 h-4" />
                    <span>System Settings</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-xs font-medium text-gray-400 hover:text-white flex items-center gap-2 rounded hover:bg-forge-card/50 transition">
                    <HelpCircle className="w-4 h-4" />
                    <span>Support & Specs</span>
                </button>
            </div>
        </aside>
    );
}
