/* ==========================================================================
   BRANDFORGE APPLICATION LOGIC
   Canvas Engine, Theme Token Sync, AI Visual Generator, Export Hub
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // State & Brand Tokens
  // ------------------------------------------------------------------------
  const state = {
    activeTab: 'tab-generate',
    aspectRatio: '1:1', // 1:1, 16:9, 9:16, 4:1
    showGrid: false,
    prompt: 'Futuristic Cyberpunk Tech Launch Banner with neon typography and geometric lattice',
    headline: 'UNLEASH YOUR BRAND',
    subhead: 'Design at the speed of thought with deterministic precision.',
    complexity: 70,
    glow: 85,
    geometric: 90,
    presetTheme: 'forge',
    tokens: {
      primary: '#5D5DFF',
      secondary: '#8B5CF6',
      accent: '#0EA5E9',
      bg: '#111317',
      fontHeadline: "'Geist', sans-serif",
      radius: '4px'
    }
  };

  // Preset Drawers Data
  const drawerPresets = {
    templates: [
      { id: 'cyberpunk', title: 'Cyberpunk Launch', desc: 'Neon blue & indigo tech showcase banner', prompt: 'Cyberpunk tech launch poster with glowing neon grid and futuristic geometry', ratio: '1:1' },
      { id: 'saas', title: 'Minimalist SaaS Hero', desc: 'Sleek dark mode product announcement', prompt: 'Clean minimalist dark SaaS dashboard hero graphic with subtle gradient glow', ratio: '16:9' },
      { id: 'event', title: 'AI Developer Keynote', desc: 'High-contrast event poster format', prompt: 'Developer conference poster with abstract AI neural lines and bold typography', ratio: '9:16' },
      { id: 'linkedin', title: 'Brand Header Banner', desc: 'Wide professional corporate header', prompt: 'Authoritative dark corporate brand banner with sharp geometric accents', ratio: '4:1' }
    ],
    elements: [
      { id: 'grid', title: 'Isometric Lattice', desc: '3D perspective tech grid background' },
      { id: 'orbs', title: 'Generative Orbs', desc: 'Glowing electric indigo spheres' },
      { id: 'beams', title: 'Light Beams', desc: 'High-energy diagonal laser rays' },
      { id: 'badge', title: 'Precision Stamp', desc: 'Monospaced spec sheet badge overlay' }
    ],
    text: [
      { id: 't1', title: 'Bold Tech Headline', desc: 'Geist 700 Uppercase Headline' },
      { id: 't2', title: 'Monospace Spec Label', desc: 'JetBrains Mono uppercase tag' },
      { id: 't3', title: 'Editorial Subtitle', desc: 'Inter 400 clean body description' }
    ],
    uploads: [
      { id: 'up1', title: 'Brand Logo SVG', desc: 'Vector logo placeholder' },
      { id: 'up2', title: 'Product Screenshot', desc: 'Dark mode UI mock screenshot' }
    ],
    'ai-prompts': [
      { id: 'p1', title: 'Hyper-Precision Laser', prompt: 'High precision laser engraved circuit pattern with glowing electric indigo lines and metallic dark background' },
      { id: 'p2', title: 'Synthetic Aurora', prompt: 'Vibrant synthetic violet aurora wave with dark obsidian canvas and glowing cyan particles' },
      { id: 'p3', title: 'Industrial Orange Heat', prompt: 'Industrial signal orange heat matrix with sharp slate edges and bold technical typography' }
    ]
  };

  // ------------------------------------------------------------------------
  // UI Element References
  // ------------------------------------------------------------------------
  const mainCanvas = document.getElementById('mainCanvas');
  const mainCtx = mainCanvas.getContext('2d');
  const forgeOverlay = document.getElementById('forgeOverlay');
  const forgeStatusMsg = document.getElementById('forgeStatusMsg');

  // ------------------------------------------------------------------------
  // Tab Navigation
  // ------------------------------------------------------------------------
  const stepTabs = document.querySelectorAll('.step-tab');
  const viewPanels = document.querySelectorAll('.view-panel');

  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  function switchTab(tabId) {
    state.activeTab = tabId;
    stepTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
    viewPanels.forEach(p => p.classList.toggle('active', p.id === tabId));

    if (tabId === 'tab-export') {
      renderExportHubCanvases();
    }
  }

  // ------------------------------------------------------------------------
  // Drawer Panel Navigation
  // ------------------------------------------------------------------------
  const ribbonBtns = document.querySelectorAll('.ribbon-btn');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerContent = document.getElementById('drawerContent');

  ribbonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ribbonBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const drawerKey = btn.getAttribute('data-drawer');
      loadDrawerContent(drawerKey);
    });
  });

  function loadDrawerContent(key) {
    drawerTitle.textContent = key.toUpperCase().replace('-', ' ');
    drawerContent.innerHTML = '';
    const items = drawerPresets[key] || drawerPresets.templates;

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.innerHTML = `
        <div class="preset-card-title">${item.title}</div>
        <div class="preset-card-desc">${item.desc || item.prompt}</div>
      `;
      card.addEventListener('click', () => {
        if (item.prompt) {
          document.getElementById('promptInput').value = item.prompt;
          state.prompt = item.prompt;
        }
        if (item.ratio) {
          setAspectRatio(item.ratio);
        }
        showToast(`Loaded preset: ${item.title}`);
        triggerForgeGeneration();
      });
      drawerContent.appendChild(card);
    });
  }
  loadDrawerContent('templates');

  // ------------------------------------------------------------------------
  // Aspect Ratio & Canvas Controls
  // ------------------------------------------------------------------------
  const ratioChips = document.querySelectorAll('.chip-select[data-ratio]');
  ratioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const ratio = chip.getAttribute('data-ratio');
      setAspectRatio(ratio);
    });
  });

  function setAspectRatio(ratio) {
    state.aspectRatio = ratio;
    ratioChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-ratio') === ratio));

    const wrapper = document.getElementById('canvasWrapper');
    let width = 800;
    let height = 800;

    if (ratio === '1:1') { width = 800; height = 800; }
    else if (ratio === '16:9') { width = 960; height = 540; }
    else if (ratio === '9:16') { width = 540; height = 960; }
    else if (ratio === '4:1') { width = 1000; height = 250; }

    mainCanvas.width = width;
    mainCanvas.height = height;
    wrapper.style.width = width > 800 ? '100%' : `${width}px`;

    renderCanvasVisual(mainCanvas, width, height);
  }

  // Grid Overlay Toggle
  document.getElementById('btnToggleGrid').addEventListener('click', () => {
    state.showGrid = !state.showGrid;
    document.getElementById('btnToggleGrid').classList.toggle('active', state.showGrid);
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
  });

  document.getElementById('btnResetCanvas').addEventListener('click', () => {
    document.getElementById('promptInput').value = 'Futuristic Cyberpunk Tech Launch Banner';
    document.getElementById('canvasHeadlineText').value = 'UNLEASH YOUR BRAND';
    document.getElementById('canvasSubheadText').value = 'Design at the speed of thought with deterministic precision.';
    state.complexity = 70;
    state.glow = 85;
    state.geometric = 90;
    document.getElementById('sliderComplexity').value = 70;
    document.getElementById('sliderGlow').value = 85;
    document.getElementById('sliderGeometric').value = 90;
    document.getElementById('valComplexity').textContent = 70;
    document.getElementById('valGlow').textContent = 85;
    document.getElementById('valGeometric').textContent = 90;
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
    showToast('Canvas Reset to Defaults');
  });

  // ------------------------------------------------------------------------
  // Form & Sliders Inputs
  // ------------------------------------------------------------------------
  const promptInput = document.getElementById('promptInput');
  const headlineInput = document.getElementById('canvasHeadlineText');
  const subheadInput = document.getElementById('canvasSubheadText');

  promptInput.value = state.prompt;

  headlineInput.addEventListener('input', (e) => {
    state.headline = e.target.value;
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
  });

  subheadInput.addEventListener('input', (e) => {
    state.subhead = e.target.value;
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
  });

  ['Complexity', 'Glow', 'Geometric'].forEach(param => {
    const slider = document.getElementById(`slider${param}`);
    const valDisplay = document.getElementById(`val${param}`);
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state[param.toLowerCase()] = val;
      valDisplay.textContent = val;
      renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
    });
  });

  // Preset Theme Switcher in Inspector
  document.getElementById('presetThemeSelect').addEventListener('change', (e) => {
    const theme = e.target.value;
    state.presetTheme = theme;
    if (theme === 'forge') {
      applyBrandTokens('#5D5DFF', '#8B5CF6', '#0EA5E9', '#111317');
    } else if (theme === 'synthetic') {
      applyBrandTokens('#00F0FF', '#7701D0', '#00DCE5', '#051424');
    } else if (theme === 'industrial') {
      applyBrandTokens('#FF3800', '#2E2E3A', '#3A90FF', '#12121D');
    } else if (theme === 'atelier') {
      applyBrandTokens('#E9C176', '#C5A059', '#4B4E6D', '#131313');
    }
    triggerForgeGeneration();
  });

  // Forge Generate Button
  document.getElementById('btnForgeGenerate').addEventListener('click', () => {
    state.prompt = promptInput.value;
    triggerForgeGeneration();
  });

  function triggerForgeGeneration() {
    forgeOverlay.classList.add('active');
    forgeStatusMsg.textContent = 'Synthesizing Generative Brand Visual...';

    setTimeout(() => {
      forgeStatusMsg.textContent = 'Enforcing Deterministic Brand Tokens...';
    }, 400);

    setTimeout(() => {
      forgeOverlay.classList.remove('active');
      renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
      showToast('Visual Forged Successfully!');
    }, 850);
  }

  // ------------------------------------------------------------------------
  // CANVAS RENDERING ENGINE (Deterministic + Generative Graphics)
  // ------------------------------------------------------------------------
  function renderCanvasVisual(canvas, width, height) {
    const ctx = canvas.getContext('2d');

    // 1. Base Background Gradient
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height));
    bgGrad.addColorStop(0, adjustColorBrightness(state.tokens.bg, 20));
    bgGrad.addColorStop(1, state.tokens.bg);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Generative Geometric Art Elements
    const primary = state.tokens.primary;
    const secondary = state.tokens.secondary;
    const accent = state.tokens.accent;

    // Glowing Ambient Orbs
    const numOrbs = Math.floor(state.complexity / 20) + 2;
    for (let i = 0; i < numOrbs; i++) {
      const cx = (Math.sin(i * 99 + state.complexity) * 0.4 + 0.5) * width;
      const cy = (Math.cos(i * 33 + state.glow) * 0.4 + 0.5) * height;
      const radius = (state.glow / 100) * (width * 0.35);

      const orbGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius);
      const colorHex = i % 3 === 0 ? primary : (i % 3 === 1 ? secondary : accent);
      orbGrad.addColorStop(0, hexToRgba(colorHex, (state.glow / 100) * 0.4));
      orbGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // High Precision Laser Lines / Geometric Grid
    ctx.lineWidth = 1;
    const numLines = Math.floor(state.geometric / 8);
    for (let i = 0; i < numLines; i++) {
      const y = (i / numLines) * height;
      ctx.strokeStyle = hexToRgba(primary, 0.15);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      const x = (i / numLines) * width;
      ctx.strokeStyle = hexToRgba(accent, 0.12);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Central Tech Lattice Structure
    ctx.save();
    ctx.translate(width / 2, height / 2);
    const rotCount = Math.floor(state.geometric / 15) + 3;
    for (let i = 0; i < rotCount; i++) {
      ctx.rotate((Math.PI * 2) / rotCount);
      ctx.strokeStyle = i % 2 === 0 ? hexToRgba(primary, 0.6) : hexToRgba(secondary, 0.6);
      ctx.lineWidth = 2;

      ctx.beginPath();
      const sz = Math.min(width, height) * 0.22;
      ctx.rect(-sz / 2, -sz / 2, sz, sz);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Grid Overlay if toggled
    if (state.showGrid) {
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    }

    // 4. Headline & Subtitle Typography Rendering
    const pad = Math.min(width, height) * 0.08;

    // Brand Watermark Top Right
    ctx.fillStyle = hexToRgba(accent, 0.8);
    ctx.font = `600 12px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'right';
    ctx.fillText(`BRANDFORGE // PRO`, width - pad, pad);

    // Headline Text
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    const headlineFontSize = Math.max(22, Math.floor(Math.min(width, height) * 0.065));
    ctx.font = `800 ${headlineFontSize}px ${state.tokens.fontHeadline}`;

    // Glow Effect behind headline
    ctx.shadowColor = primary;
    ctx.shadowBlur = state.glow / 5;
    ctx.fillText(state.headline.toUpperCase(), pad, height - pad - 40);

    ctx.shadowBlur = 0; // Reset shadow

    // Subtitle Text
    ctx.fillStyle = '#C6C4D8';
    const subFontSize = Math.max(12, Math.floor(headlineFontSize * 0.38));
    ctx.font = `400 ${subFontSize}px 'Inter', sans-serif`;
    ctx.fillText(state.subhead, pad, height - pad - 10);
  }

  // Initial Canvas Render
  renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);

  // ------------------------------------------------------------------------
  // BRAND CONTROL ENGINE & TOKEN SYNC
  // ------------------------------------------------------------------------
  const pickerPrimary = document.getElementById('pickerPrimary');
  const pickerSecondary = document.getElementById('pickerSecondary');
  const pickerAccent = document.getElementById('pickerAccent');
  const pickerBg = document.getElementById('pickerBg');

  const brandFontHeadline = document.getElementById('brandFontHeadline');
  const brandRadius = document.getElementById('brandRadius');

  pickerPrimary.addEventListener('input', (e) => updateColorToken('primary', e.target.value));
  pickerSecondary.addEventListener('input', (e) => updateColorToken('secondary', e.target.value));
  pickerAccent.addEventListener('input', (e) => updateColorToken('accent', e.target.value));
  pickerBg.addEventListener('input', (e) => updateColorToken('bg', e.target.value));

  function updateColorToken(key, hex) {
    state.tokens[key] = hex;
    const hexLabel = document.getElementById(`hex${key.charAt(0).toUpperCase() + key.slice(1)}`);
    const swatch = document.getElementById(`swatch${key.charAt(0).toUpperCase() + key.slice(1)}`);

    if (hexLabel) hexLabel.textContent = hex.toUpperCase();
    if (swatch) swatch.style.background = hex;

    applyCssTokens();
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
  }

  brandFontHeadline.addEventListener('change', (e) => {
    state.tokens.fontHeadline = e.target.value;
    applyCssTokens();
    renderCanvasVisual(mainCanvas, mainCanvas.width, mainCanvas.height);
  });

  brandRadius.addEventListener('change', (e) => {
    state.tokens.radius = e.target.value;
    applyCssTokens();
  });

  function applyBrandTokens(primary, secondary, accent, bg) {
    pickerPrimary.value = primary;
    pickerSecondary.value = secondary;
    pickerAccent.value = accent;
    pickerBg.value = bg;

    updateColorToken('primary', primary);
    updateColorToken('secondary', secondary);
    updateColorToken('accent', accent);
    updateColorToken('bg', bg);
  }

  function applyCssTokens() {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', state.tokens.primary);
    root.style.setProperty('--color-secondary', state.tokens.secondary);
    root.style.setProperty('--color-tertiary', state.tokens.accent);
    root.style.setProperty('--bg-dark', state.tokens.bg);
    root.style.setProperty('--radius-sm', state.tokens.radius);

    // Update DESIGN.MD pre tag
    const spec = `---
name: Forge Custom Theme
colors:
  surface: '${state.tokens.bg}'
  primary: '${state.tokens.primary}'
  secondary: '${state.tokens.secondary}'
  accent: '${state.tokens.accent}'
typography:
  headline: ${state.tokens.fontHeadline.split(',')[0].replace(/'/g, '')}
  body: Inter
  label: JetBrains Mono
rounded: ${state.tokens.radius}
---
# Brand & Style Guidelines
Surgical precision with dark-mode default, high-contrast accents, and strict geometric structure.`;
    document.getElementById('designMdText').textContent = spec;
  }

  document.getElementById('btnSaveBrandTokens').addEventListener('click', () => {
    showToast('Brand System Tokens Saved!');
    switchTab('tab-generate');
  });

  // ------------------------------------------------------------------------
  // EXPORT HUB ENGINE
  // ------------------------------------------------------------------------
  function renderExportHubCanvases() {
    const formats = [
      { id: 'exportCanvas1', w: 300, h: 300 },
      { id: 'exportCanvas2', w: 360, h: 90 },
      { id: 'exportCanvas3', w: 360, h: 120 },
      { id: 'exportCanvas4', w: 135, h: 240 }
    ];

    formats.forEach(f => {
      const c = document.getElementById(f.id);
      if (c) {
        c.width = f.w;
        c.height = f.h;
        renderCanvasVisual(c, f.w, f.h);
      }
    });
  }

  // Single PNG Download
  document.querySelectorAll('.btn-export-single').forEach(btn => {
    btn.addEventListener('click', () => {
      const canvasId = btn.getAttribute('data-canvas');
      const filename = btn.getAttribute('data-filename');
      const c = document.getElementById(canvasId);
      downloadCanvasImage(c, filename);
    });
  });

  // Batch Export
  document.getElementById('btnBatchExport').addEventListener('click', () => {
    showToast('Preparing Batch ZIP Export...');
    setTimeout(() => {
      downloadCanvasImage(mainCanvas, `BrandForge_Master_${state.aspectRatio.replace(':', 'x')}.png`);
      showToast('Master High-DPI PNG Exported!');
    }, 600);
  });

  function downloadCanvasImage(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // ------------------------------------------------------------------------
  // PROPOSAL MODAL & TOASTS
  // ------------------------------------------------------------------------
  const proposalModal = document.getElementById('proposalModal');
  document.getElementById('btnProposal').addEventListener('click', () => {
    proposalModal.classList.add('active');
  });
  document.getElementById('btnCloseProposal').addEventListener('click', () => {
    proposalModal.classList.remove('active');
  });
  proposalModal.addEventListener('click', (e) => {
    if (e.target === proposalModal) proposalModal.classList.remove('active');
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Helper Functions
  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  function adjustColorBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
  }
});
