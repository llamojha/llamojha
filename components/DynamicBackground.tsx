
import React, { useRef, useEffect } from 'react';

// Make sure Pixi.js is available globally from the CDN
declare const PIXI: any;

interface DynamicBackgroundProps {
  mode: string;
}

// --- Animation Setups ---

// --- 1. Cyberpunk Rain (Existing) ---
const setupCyberpunkRain = (app: any) => {
    const lines = new PIXI.Graphics();
    app.stage.addChild(lines);
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);

    const particles: any[] = [];
    const particleCount = 300;
    
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(0, 0, 2, 10);
    graphics.endFill();
    const particleTexture = app.renderer.generateTexture(graphics);
    graphics.destroy();

    const PALETTE = { CYAN: 0x0AF8ED, MAGENTA: 0xFF00FF, BLUE: 0x4D4DFF, GOLD: 0xFCD34D };
    const CYBER_COLORS = [PALETTE.CYAN, PALETTE.MAGENTA, PALETTE.BLUE];

    for (let i = 0; i < particleCount; i++) {
        const particle = new PIXI.Sprite(particleTexture);
        particle.anchor.set(0.5);
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        const originalColor = CYBER_COLORS[Math.floor(Math.random() * CYBER_COLORS.length)];
        particle.tint = originalColor;
        // @ts-ignore
        particle.originalColor = originalColor;
        // @ts-ignore
        particle.vy = 1 + Math.random() * 2;
        particle.alpha = 0.5 + Math.random() * 0.5;
        particles.push(particle);
        particleContainer.addChild(particle);
    }

    const mouse = { x: -9999, y: -9999 };
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event: any) => { mouse.x = event.global.x; mouse.y = event.global.y; });
    app.stage.on('pointerleave', () => { mouse.x = -9999, mouse.y = -9999 });

    app.ticker.add((delta: number) => {
        lines.clear();
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.y += p.vy * delta;
            if (p.y > app.screen.height + 10) { p.y = -10; p.x = Math.random() * app.screen.width; }

            const dx = mouse.x - p.x; const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // @ts-ignore
            p.isHot = dist < 150;
            // @ts-ignore
            p.tint = p.isHot ? PALETTE.GOLD : p.originalColor;

            if (Math.random() > 0.999) {
                p.x += (Math.random() - 0.5) * 10;
                const originalAlpha = 0.5 + Math.random() * 0.5;
                p.alpha = Math.random();
                setTimeout(() => { p.alpha = originalAlpha; }, 50);
            }
        }

        const connectionDistance = 100;
        for (let i = 0; i < particleCount; i++) {
            const p1 = particles[i];
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x; const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDistance) {
                    const alpha = Math.max(0, 1 - dist / connectionDistance);
                    // @ts-ignore
                    const color = p1.isHot || p2.isHot ? PALETTE.GOLD : p1.originalColor;
                    lines.lineStyle(0.7, color, alpha * 0.7);
                    lines.moveTo(p1.x, p1.y);
                    lines.lineTo(p2.x, p2.y);
                }
            }
        }
    });
};

// --- 2. Hex Grid (Existing) ---
const setupHexGrid = (app: any) => {
    const hexGrid = new PIXI.Graphics();
    app.stage.addChild(hexGrid);
    const hexes: { x: number; y: number; }[] = [];
    const hexSize = 30;
    const hexWidth = hexSize * 2;
    const hexHeight = Math.sqrt(3) * hexSize;
    const PALETTE = { GOLD: 0xFCD34D, DARK_BLUE: 0x080E2B };

    for (let y = -hexHeight; y < app.screen.height + hexHeight; y += hexHeight) {
        for (let x = -hexWidth, row = 0; x < app.screen.width + hexWidth; x += hexWidth * 0.75, row++) {
            hexes.push({ x: x + (row % 2) * (hexWidth * 0.375), y });
        }
    }

    const mouse = { x: -9999, y: -9999 };
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event: any) => { mouse.x = event.global.x; mouse.y = event.global.y; });
    app.stage.on('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });

    app.ticker.add(() => {
        hexGrid.clear();
        for (const hex of hexes) {
            const dx = mouse.x - hex.x; const dy = mouse.y - hex.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 200);
            
            const pulse = (Math.sin(app.ticker.lastTime / 500 + hex.x / 100) + 1) / 2;
            const alpha = 0.1 + influence * 0.5 + pulse * 0.05;
            const color = influence > 0.1 ? PALETTE.GOLD : PALETTE.DARK_BLUE;
            const lineColor = influence > 0.1 ? PALETTE.GOLD : 0x27272a; // gray-800

            hexGrid.lineStyle(1, lineColor, alpha);
            hexGrid.beginFill(color, influence * 0.1);
            
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 180) * (60 * i - 30);
                const x_ = hex.x + hexSize * Math.cos(angle);
                const y_ = hex.y + hexSize * Math.sin(angle);
                if (i === 0) hexGrid.moveTo(x_, y_);
                else hexGrid.lineTo(x_, y_);
            }
            hexGrid.closePath();
            hexGrid.endFill();
        }
    });
};

// --- 3. Nebula Cloud (Existing) ---
const setupNebulaCloud = (app: any) => {
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);
    
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    const baseTexture = app.renderer.generateTexture(graphics);
    graphics.destroy();

    const brush = new PIXI.Sprite(baseTexture);
    brush.anchor.set(0.5);
    app.stage.addChild(brush);
    
    const canvas = document.createElement('canvas');
    canvas.width = 100; canvas.height = 100;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(50, 50, 0, 50, 50, 50);
    gradient.addColorStop(0, 'rgba(252, 211, 77, 0.5)');
    gradient.addColorStop(1, 'rgba(252, 211, 77, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);
    const particleTexture = PIXI.Texture.from(canvas);

    const particles = Array.from({ length: 500 }, () => {
        const particle = new PIXI.Sprite(particleTexture);
        particle.anchor.set(0.5);
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        particle.scale.set(0.1 + Math.random() * 0.2);
        particle.alpha = 0.1 + Math.random() * 0.3;
        // @ts-ignore
        particle.vx = (Math.random() - 0.5) * 0.5;
        // @ts-ignore
        particle.vy = (Math.random() - 0.5) * 0.5;
        particleContainer.addChild(particle);
        return particle;
    });
    
    const displacementFilter = new PIXI.filters.DisplacementFilter(brush);
    particleContainer.filters = [displacementFilter];

    const mouse = { x: app.screen.width / 2, y: app.screen.height / 2 };
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event: any) => { mouse.x = event.global.x; mouse.y = event.global.y; });

    app.ticker.add((delta: number) => {
        brush.x = mouse.x; brush.y = mouse.y;
        for (const p of particles) {
            p.x += p.vx * delta; p.y += p.vy * delta;
            if (p.x < 0) p.x = app.screen.width;
            if (p.x > app.screen.width) p.x = 0;
            if (p.y < 0) p.y = app.screen.height;
            if (p.y > app.screen.height) p.y = 0;
        }
    });
};

// --- 4. HUD Scroller (Existing) ---
const setupHUDScroller = (app: any) => {
    const layers = [new PIXI.Container(), new PIXI.Container(), new PIXI.Container()];
    layers.forEach(layer => app.stage.addChild(layer));
    const PALETTE = { CYAN: 0x0AF8ED, GOLD: 0xFCD34D };
    
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(0, 0, 30, 2);
    graphics.endFill();
    const particleTexture = app.renderer.generateTexture(graphics);
    graphics.destroy();

    const particles = Array.from({ length: 200 }, () => {
        const particle = new PIXI.Sprite(particleTexture);
        particle.anchor.set(0.5);
        particle.x = Math.random() * app.screen.width * 2;
        particle.y = Math.random() * app.screen.height;
        const layerIndex = Math.floor(Math.random() * 3);
        // @ts-ignore
        particle.vx = (1 + layerIndex) * 0.5 + Math.random() * 0.5;
        particle.tint = layerIndex === 1 ? PALETTE.GOLD : PALETTE.CYAN;
        particle.alpha = 0.2 + layerIndex * 0.2;
        layers[layerIndex].addChild(particle);
        return particle;
    });

    app.ticker.add((delta: number) => {
        for (const p of particles) {
            p.x -= p.vx * delta;
            if (p.x < -50) {
                p.x = app.screen.width + 50;
                p.y = Math.random() * app.screen.height;
            }
        }
    });
};

// --- 5. Particle Plexus (Existing) ---
const setupPlexus = (app: any) => {
    const lines = new PIXI.Graphics();
    app.stage.addChild(lines);
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);
    const PALETTE = { GOLD: 0xFCD34D, CYAN: 0x0AF8ED };

    const particles = Array.from({ length: 100 }, () => {
        const particle = new PIXI.Graphics();
        particle.beginFill(PALETTE.CYAN, 0.8);
        particle.drawCircle(0, 0, 2);
        particle.endFill();
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        // @ts-ignore
        particle.vx = (Math.random() - 0.5) * 0.5;
        // @ts-ignore
        particle.vy = (Math.random() - 0.5) * 0.5;
        particleContainer.addChild(particle);
        return particle;
    });

    const mouse = { x: -9999, y: -9999 };
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event: any) => { mouse.x = event.global.x; mouse.y = event.global.y; });
    app.stage.on('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });

    app.ticker.add((delta: number) => {
        for (const p of particles) {
            p.x += p.vx * delta; p.y += p.vy * delta;
            if (p.x < 0 || p.x > app.screen.width) p.vx *= -1;
            if (p.y < 0 || p.y > app.screen.height) p.vy *= -1;
        }

        lines.clear();
        const allNodes = [...particles, {x: mouse.x, y: mouse.y, isMouse: true}];
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = i + 1; j < allNodes.length; j++) {
                const p1 = allNodes[i]; const p2 = allNodes[j];
                const dx = p1.x - p2.x; const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = (p1.isMouse || p2.isMouse) ? 250 : 120;
                if (dist < maxDist) {
                    const alpha = Math.max(0, 1 - dist / maxDist);
                    const color = (p1.isMouse || p2.isMouse) ? PALETTE.GOLD : PALETTE.CYAN;
                    lines.lineStyle(1, color, alpha * 0.5);
                    lines.moveTo(p1.x, p1.y);
                    lines.lineTo(p2.x, p2.y);
                }
            }
        }
    });
};

// --- 6. Mystic Orbs (New - Fantasy) ---
const setupFloatingOrbs = (app: any) => {
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);

    const PALETTE = { DEEP_PURPLE: 0x4B0082, INDIGO: 0x8A2BE2, GOLD: 0xFFD700 };
    const ORB_COLORS = [PALETTE.DEEP_PURPLE, PALETTE.INDIGO, PALETTE.GOLD];

    const canvas = document.createElement('canvas');
    canvas.width = 100; canvas.height = 100;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(50, 50, 0, 50, 50, 50);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);
    const orbTexture = PIXI.Texture.from(canvas);

    const orbs = Array.from({ length: 50 }, () => {
        const orb = new PIXI.Sprite(orbTexture);
        orb.anchor.set(0.5);
        orb.x = Math.random() * app.screen.width;
        orb.y = Math.random() * app.screen.height;
        orb.tint = ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)];
        orb.scale.set(0.2 + Math.random() * 0.4);
        orb.alpha = 0.3 + Math.random() * 0.4;
        // @ts-ignore
        orb.vx = (Math.random() - 0.5) * 0.3;
        // @ts-ignore
        orb.vy = (Math.random() - 0.5) * 0.3;
        // @ts-ignore
        orb.phase = Math.random() * Math.PI * 2;
        particleContainer.addChild(orb);
        return orb;
    });

    app.ticker.add((delta: number) => {
        for (const orb of orbs) {
            // @ts-ignore
            orb.phase += 0.01 * delta;
            // @ts-ignore
            orb.x += orb.vx * delta + Math.sin(orb.phase) * 0.1;
            // @ts-ignore
            orb.y += orb.vy * delta + Math.cos(orb.phase) * 0.1;

            if (orb.x < -50) orb.x = app.screen.width + 50;
            if (orb.x > app.screen.width + 50) orb.x = -50;
            if (orb.y < -50) orb.y = app.screen.height + 50;
            if (orb.y > app.screen.height + 50) orb.y = -50;
            
            // @ts-ignore
            const scalePulse = Math.sin(orb.phase) * 0.001;
            orb.scale.set(orb.scale.x + scalePulse);
        }
    });
};

// --- 7. Wireframe Terrain (Existing) ---
const setupTerrain = (app: any) => {
    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);
    const PALETTE = { GOLD: 0xFCD34D, CYAN: 0x0AF8ED };

    const COLS = 30, ROWS = 30, GAP = 40;
    const points = Array.from({ length: COLS * ROWS }, (_, i) => ({
        x: (i % COLS - COLS / 2) * GAP,
        y: 0,
        z: Math.floor(i / COLS) * GAP,
    }));
    const fov = 300;
    let time = 0;
    const yaw = 0.4; // Angle of rotation in radians

    app.ticker.add((delta: number) => {
        time += delta * 0.5;
        graphics.clear().lineStyle(1, PALETTE.CYAN, 0.5);

        const projected = points.map(p => {
            p.y = Math.sin(p.x / 50 + time) * 10 + Math.cos(p.z / 50 + time) * 10;
            p.z -= delta * 10;
            if (p.z < -fov) p.z += ROWS * GAP;

            // Rotate point around Y axis to create an angled view
            const rotatedX = p.x * Math.cos(yaw) + p.z * Math.sin(yaw);
            const rotatedZ = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
            
            const scale = fov / (fov + rotatedZ);
            return {
                x: rotatedX * scale + app.screen.width / 2,
                y: p.y * scale + app.screen.height / 1.5,
                scale: scale,
            };
        });

        for (let r = 0; r < ROWS - 1; r++) {
            for (let c = 0; c < COLS - 1; c++) {
                const i = r * COLS + c;
                const p1 = projected[i], p2 = projected[i + 1], p3 = projected[i + COLS];
                if (p1.scale > 0 && p2.scale > 0) graphics.moveTo(p1.x, p1.y).lineTo(p2.x, p2.y);
                if (p1.scale > 0 && p3.scale > 0) graphics.moveTo(p1.x, p1.y).lineTo(p3.x, p3.y);
            }
        }
    });
};

// --- 8. Flow Field (New - Organic Tech) ---
const setupFlowField = (app: any) => {
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);
    
    const PALETTE = { CYAN: 0x0AF8ED };
    
    const graphics = new PIXI.Graphics();
    graphics.beginFill(PALETTE.CYAN);
    graphics.drawCircle(0,0,1);
    graphics.endFill();
    const particleTexture = app.renderer.generateTexture(graphics);
    graphics.destroy();

    const particles = Array.from({ length: 2000 }, () => {
        const p = new PIXI.Sprite(particleTexture);
        p.anchor.set(0.5);
        p.x = Math.random() * app.screen.width;
        p.y = Math.random() * app.screen.height;
        p.alpha = 0.5;
        particleContainer.addChild(p);
        return p;
    });

    const noiseScale = 0.005;
    let time = 0;

    const simpleNoise = (x: number, y: number, t: number) => {
        return Math.sin(x * 0.1) + Math.sin(y * 0.1 + t) + Math.sin((x + y) * 0.05 + t);
    };

    app.ticker.add((delta: number) => {
        time += delta * 0.01;
        for (const p of particles) {
            const angle = simpleNoise(p.x * noiseScale, p.y * noiseScale, time) * Math.PI;
            p.x += Math.cos(angle) * 1.5;
            p.y += Math.sin(angle) * 1.5;
            
            if (p.x < 0) p.x = app.screen.width;
            if (p.x > app.screen.width) p.x = 0;
            if (p.y < 0) p.y = app.screen.height;
            if (p.y > app.screen.height) p.y = 0;
        }
    });
};


// --- 9. Starfield (INTERACTIVE) ---
const setupStarfield = (app: any) => {
    const starTexture = PIXI.Texture.WHITE;
    const stars = Array.from({ length: 1500 }, () => {
        const star = new PIXI.Sprite(starTexture);
        star.anchor.set(0.5);
        // @ts-ignore
        star.trueX = 0; // 3D X
        // @ts-ignore
        star.trueY = 0; // 3D Y
        // @ts-ignore
        star.z = 0;     // 3D Z
        // @ts-ignore
        star.vx = 0;    // Velocity X
        // @ts-ignore
        star.vy = 0;    // Velocity Y

        // @ts-ignore
        star.randomize = () => {
            // @ts-ignore
            star.trueX = (Math.random() - 0.5) * app.screen.width * 2;
            // @ts-ignore
            star.trueY = (Math.random() - 0.5) * app.screen.height * 2;
            // @ts-ignore
            star.z = Math.random() * 2000 + 1;
            // @ts-ignore
            star.vx = 0;
            // @ts-ignore
            star.vy = 0;
        };
        // @ts-ignore
        star.randomize();
        app.stage.addChild(star);
        return star;
    });

    const mouse = { x: -9999, y: -9999 };
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event: any) => { mouse.x = event.global.x; mouse.y = event.global.y; });
    app.stage.on('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });

    const fov = 300;
    const speed = 5;

    app.ticker.add((delta: number) => {
        for (const star of stars) {
            // @ts-ignore
            star.z -= delta * speed;
            
            // @ts-ignore
            if (star.z <= 0) {
                // @ts-ignore
                star.randomize();
            }

            // Project 3D to 2D
            // @ts-ignore
            const scale = fov / (fov + star.z);
            // @ts-ignore
            star.x = app.screen.width / 2 + star.trueX * scale;
            // @ts-ignore
            star.y = app.screen.height / 2 + star.trueY * scale;
            star.scale.set(scale * 1.5);

            // Mouse interaction
            const dx = star.x - mouse.x;
            const dy = star.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const forceRadius = 150;

            if (dist < forceRadius) {
                const force = (forceRadius - dist) / forceRadius;
                // @ts-ignore
                star.vx += (dx / dist) * force * 2;
                // @ts-ignore
                star.vy += (dy / dist) * force * 2;
            }

            // Apply velocity and dampening
            // @ts-ignore
            star.trueX += star.vx * delta;
            // @ts-ignore
            star.trueY += star.vy * delta;
            // @ts-ignore
            star.vx *= 0.95; // Dampening
            // @ts-ignore
            star.vy *= 0.95; // Dampening
        }
    });
};



const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    let isCancelled = false;

    const cleanup = () => {
        if (appRef.current) {
            appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
            appRef.current = null;
        }
        if (canvasRef.current) {
            while (canvasRef.current.firstChild) {
                canvasRef.current.removeChild(canvasRef.current.firstChild);
            }
        }
    };
    
    cleanup();

    if (!canvasRef.current || typeof PIXI === 'undefined') {
      return;
    }
    
    const initAnimation = () => {
        const app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x030712, // gray-950
          resizeTo: window,
          autoDensity: true,
          resolution: window.devicePixelRatio || 1,
        });
        
        if (isCancelled) {
            app.destroy(true, { children: true, texture: true, baseTexture: true });
            return;
        }

        appRef.current = app;
        canvasRef.current?.appendChild(app.view as unknown as Node);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        
        switch (mode) {
            case 'rain': setupCyberpunkRain(app); break;
            case 'hex': setupHexGrid(app); break;
            case 'cloud': setupNebulaCloud(app); break;
            case 'hud': setupHUDScroller(app); break;
            case 'plexus': setupPlexus(app); break;
            case 'terrain': setupTerrain(app); break;
            case 'starfield': setupStarfield(app); break;
            case 'orbs': setupFloatingOrbs(app); break;
            case 'flow': setupFlowField(app); break;
            default: setupCyberpunkRain(app);
        }
    };
    
    initAnimation();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [mode]);

  return <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default DynamicBackground;
