import React from 'react';
import { Layers, Palette, ArrowUpRight } from 'lucide-react';

export default function ExportSidebar({ activeStep, onSelectStep }) {
    const steps = [
        { id: 'generate', num: '01', label: 'Generate', icon: Layers },
        { id: 'brand', num: '02', label: 'Brand Tokens', icon: Palette },
        { id: 'export', num: '03', label: 'Export', icon: ArrowUpRight },
    ];

    return (
        <aside className="w-56 bg-white border-r border-rule flex flex-col h-full shrink-0">
            {/* Wordmark */}
            <div className="px-5 pt-6 pb-4 border-b border-rule">
                <h1 className="font-display font-700 text-ink text-lg tracking-tight leading-none">
                    BrandForge
                </h1>
                <p className="text-muted text-xs mt-1">Asset Studio v1</p>
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
                            className={`w-full text-left px-5 py-3 flex items-center gap-3 border-l-2 transition-colors duration-150 ${isActive
                                    ? 'border-cobalt bg-cobalt-light text-ink'
                                    : 'border-transparent text-muted hover:text-ink hover:bg-hover'
                                }`}
                        >
                            <span className={`font-mono text-xs ${isActive ? 'text-cobalt' : 'text-muted'}`}>
                                {step.num}
                            </span>
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                            <span className="font-display font-600 text-sm">{step.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-rule">
                <p className="text-xs text-muted leading-snug">
                    Workflow <span className="font-mono text-cobalt">{activeStep === 'generate' ? '1' : activeStep === 'brand' ? '2' : '3'}/3</span>
                </p>
            </div>
        </aside>
    );
}
