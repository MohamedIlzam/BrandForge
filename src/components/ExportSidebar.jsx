import React from 'react';
import { Layers, Palette, ArrowUpRight } from 'lucide-react';

export default function ExportSidebar({ activeStep, onSelectStep }) {
    const steps = [
        { id: 'generate', num: '01', label: 'Generate', icon: Layers },
        { id: 'brand', num: '02', label: 'Brand Tokens', icon: Palette },
        { id: 'export', num: '03', label: 'Export', icon: ArrowUpRight },
    ];

    return (
        <aside className="w-56 bg-surface border-r border-rule flex flex-col h-full shrink-0">
            {/* Brand Header */}
            <div className="px-5 pt-6 pb-4 border-b border-rule flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-ink text-lg tracking-tight leading-none flex items-center gap-2">
                        BrandForge
                        <span className="w-2 h-2 rounded-full bg-acid inline-block animate-pulse" />
                    </h1>
                    <p className="text-muted text-xs mt-1 font-mono">STUDIO // v2.4</p>
                </div>
            </div>

            {/* Step Navigation */}
            <nav className="flex-1 py-4">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = activeStep === step.id;
                    return (
                        <button
                            key={step.id}
                            onClick={() => onSelectStep(step.id)}
                            className={`w-full text-left px-5 py-3.5 flex items-center gap-3 border-l-2 transition-all duration-150 ${isActive
                                    ? 'border-acid bg-acid-tint text-ink font-semibold'
                                    : 'border-transparent text-muted hover:text-ink hover:bg-hover'
                                }`}
                        >
                            <span className={`font-mono text-xs ${isActive ? 'text-acid font-bold' : 'text-muted'}`}>
                                {step.num}
                            </span>
                            <Icon className={`w-4 h-4 ${isActive ? 'text-acid' : 'text-muted'}`} strokeWidth={1.75} />
                            <span className="font-display text-sm tracking-wide">{step.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer Status */}
            <div className="px-5 py-4 border-t border-rule bg-ground/50">
                <div className="flex items-center justify-between text-xs text-muted">
                    <span>Workflow</span>
                    <span className="font-mono text-acid bg-acid-tint px-2 py-0.5 border border-acid-border">
                        0{activeStep === 'generate' ? '1' : activeStep === 'brand' ? '2' : '3'} / 03
                    </span>
                </div>
            </div>
        </aside>
    );
}
