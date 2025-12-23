import React, { FC, useEffect, useMemo, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import DynamicBackground from './DynamicBackground';
import { SparklesIcon, CodeIcon, CopyIcon, CheckCircleIcon } from './Icons';

type Language = 'en' | 'es';

interface AnimationOption {
  id: string;
  name: string;
  summary: string;
  highlights: string[];
  codeSnippet: string;
}

type AnimationCopy = {
  id: string;
  name: { en: string; es: string };
  summary: { en: string; es: string };
  highlights: { en: string[]; es: string[] };
  codeSnippet: string;
};

const copy = {
  en: {
    badge: 'Pixi-powered showcase',
    title: 'Animation Library',
    subtitle:
      'Explore the full catalogue of interactive backgrounds powering the homepage. Toggle between modes to preview them live and review the core Pixi.js techniques used in their implementation.',
    snippetTitle: 'Core implementation snippet',
    copySnippet: 'Copy snippet',
    copied: 'Copied!',
  },
  es: {
    badge: 'Showcase con Pixi',
    title: 'Biblioteca de animaciones',
    subtitle:
      'Explora el catalogo completo de fondos interactivos que impulsan la home. Alterna modos para previsualizarlos y revisar las tecnicas principales de Pixi.js.',
    snippetTitle: 'Snippet principal de implementacion',
    copySnippet: 'Copiar snippet',
    copied: 'Copiado!',
  },
};

const animationsCopy: AnimationCopy[] = [
  {
    id: 'rain',
    name: { en: 'Cyber Rain', es: 'Lluvia cyber' },
    summary: {
      en: 'Neon-coded raindrops cascade across the viewport, forming reactive energy links that glow brighter whenever the pointer passes by.',
      es: 'Gotas neon caen por el viewport y forman enlaces de energia que brillan al pasar el puntero.',
    },
    highlights: {
      en: [
        '300+ PIXI sprites animated per frame with dynamic tinting',
        'Pointer proximity turns drops into "hot" streaks rendered in amber',
        'Procedural line mesh connects nearby particles for a cyber-grid effect',
      ],
      es: [
        'Mas de 300 sprites PIXI animados por frame con tintes dinamicos',
        'La cercania del puntero vuelve las gotas en trazos "hot" color ambar',
        'Malla procedural conecta particulas para un efecto cyber-grid',
      ],
    },
    codeSnippet: `const setupCyberpunkRain = (app: PIXI.Application) => {\n  const particles = createParticleColumn(app, 300);\n  const mouse = trackPointer(app.stage);\n\n  app.ticker.add((delta) => {\n    lines.clear();\n    for (const drop of particles) {\n      drop.y += drop.vy * delta;\n      wrapVertically(drop, app.screen.height);\n\n      const distance = getDistance(drop, mouse);\n      drop.isHot = distance < 150;\n      drop.tint = drop.isHot ? PALETTE.GOLD : drop.originalColor;\n    }\n\n    connectNearbyParticles(lines, particles, 100);\n  });\n};`,
  },
  {
    id: 'hex',
    name: { en: 'Hex Grid', es: 'Malla hexagonal' },
    summary: {
      en: 'A tessellated honeycomb that subtly pulses with waves of light and ripples outward in response to pointer movement.',
      es: 'Un panal teselado que pulsa con ondas de luz y reacciona al movimiento del puntero.',
    },
    highlights: {
      en: [
        'Mathematical placement for seamless staggered rows of hexes',
        'Dynamic alpha shifts blend pulse cycles with pointer influence',
        'Hovering rewrites both fill and stroke palettes for a golden accent',
      ],
      es: [
        'Ubicacion matematica para filas hexagonales sin cortes',
        'Alfa dinamico que mezcla pulsos con influencia del puntero',
        'Hover cambia relleno y borde para un acento dorado',
      ],
    },
    codeSnippet: `const setupHexGrid = (app: PIXI.Application) => {\n  const hexes = buildHexCoordinates(app.screen, HEX_SIZE);\n  const mouse = trackPointer(app.stage);\n\n  app.ticker.add(() => {\n    hexGrid.clear();\n    for (const hex of hexes) {\n      const distance = getDistance(hex, mouse);\n      const influence = Math.max(0, 1 - distance / 200);\n      const pulse = Math.sin(app.ticker.lastTime / 500 + hex.x / 100);\n\n      drawHex({\n        graphics: hexGrid,\n        center: hex,\n        alpha: 0.1 + influence * 0.5 + pulse * 0.05,\n        stroke: influence > 0.1 ? PALETTE.GOLD : PALETTE.DARK_BLUE,\n      });\n    }\n  });\n};`,
  },
  {
    id: 'plexus',
    name: { en: 'Plexus', es: 'Plexus' },
    summary: {
      en: 'A constellation of interconnected nodes orbiting around the cursor to create a futuristic, data-visualisation inspired mesh.',
      es: 'Constelacion de nodos conectados que orbitan el cursor creando una malla futurista.',
    },
    highlights: {
      en: [
        'Particle spring physics with easing on pointer attraction',
        'Depth is implied by modulating line alpha by connection distance',
        'Lightweight enough to run at 60fps on mobile Safari',
      ],
      es: [
        'Fisica de resortes con easing hacia el puntero',
        'Profundidad sugerida por alfa segun distancia de conexion',
        'Ligero para correr a 60fps en Safari movil',
      ],
    },
    codeSnippet: `const setupPlexus = (app: PIXI.Application) => {\n  const nodes = spawnPlexusNodes(app, 160);\n\n  app.ticker.add((delta) => {\n    plexus.clear();\n    for (const node of nodes) {\n      applyPlexusForces(node, delta);\n      node.sprite.x = node.position.x;\n      node.sprite.y = node.position.y;\n    }\n\n    drawConnections(plexus, nodes, {\n      maxDistance: 140,\n      highlightRadius: 110,\n    });\n  });\n};`,
  },
  {
    id: 'flow',
    name: { en: 'Flow Field', es: 'Campo de flujo' },
    summary: {
      en: 'Organic ribbon trails wander across the canvas, guided by Perlin-noise flow fields that constantly reshape the composition.',
      es: 'Cintas organicas recorren el canvas guiadas por campos de ruido Perlin que reconfiguran la composicion.',
    },
    highlights: {
      en: [
        'Noise-driven velocity map generates smooth directional changes',
        'Trail history buffers render semi-transparent motion blur',
        'Color palette oscillates across amber and teal spectrums',
      ],
      es: [
        'Mapa de velocidad por ruido para cambios suaves de direccion',
        'Buffer de historial crea motion blur semitransparente',
        'Paleta oscila entre espectros ambar y teal',
      ],
    },
    codeSnippet: `const setupFlowField = (app: PIXI.Application) => {\n  const field = createFlowField(app.screen, 20);\n  const ribbons = seedRibbons(app, field);\n\n  app.ticker.add((delta) => {\n    for (const ribbon of ribbons) {\n      const direction = field.lookup(ribbon.position);\n      ribbon.velocity.add(direction.scale(delta * 0.002));\n      ribbon.updateTrail();\n    }\n\n    redrawRibbons(ribbonLayer, ribbons);\n  });\n};`,
  },
  {
    id: 'terrain',
    name: { en: 'Terrain', es: 'Terreno' },
    summary: {
      en: 'Wireframe height-maps sweep by like a synthwave valley, with parallax gradients accentuating the sense of depth.',
      es: 'Mapas wireframe se desplazan como un valle synthwave con gradientes en parallax.',
    },
    highlights: {
      en: [
        'Scrolling noise offsets emulate an endless terrain flyover',
        'Vertex elevations are recalculated every frame for fluid motion',
        'Gradient overlays add a warm atmospheric horizon',
      ],
      es: [
        'Desplazamiento de ruido emula un terreno infinito',
        'Alturas de vertices recalculadas por frame para movimiento fluido',
        'Gradientes agregan un horizonte atmosferico calido',
      ],
    },
    codeSnippet: `const setupTerrain = (app: PIXI.Application) => {\n  const mesh = createTerrainMesh(app.screen);\n\n  app.ticker.add((delta) => {\n    terrainPhase += delta * 0.0025;\n    for (const row of mesh.rows) {\n      for (const vertex of row) {\n        vertex.y = getElevation(vertex.x, row.index, terrainPhase);\n      }\n    }\n\n    mesh.updateVertices();\n  });\n};`,
  },
  {
    id: 'starfield',
    name: { en: 'Starfield', es: 'Campo estelar' },
    summary: {
      en: 'Depth-sorted stardust arcs towards the viewer, bending around the pointer to create a warp-speed vignette.',
      es: 'Polvo estelar en profundidad se curva hacia el espectador y responde al puntero.',
    },
    highlights: {
      en: [
        '3D-like parallax achieved with z-index scaling and blur filters',
        'Pointer gravity subtly deflects nearby stars from their path',
        'Optimised particle pool eliminates garbage-collection spikes',
      ],
      es: [
        'Parallax 3D con escala en z y filtros de blur',
        'Gravedad del puntero desvía estrellas cercanas',
        'Pool optimizado evita picos de garbage collection',
      ],
    },
    codeSnippet: `const setupStarfield = (app: PIXI.Application) => {\n  const stars = initialiseStarPool(app, 220);\n\n  app.ticker.add((delta) => {\n    for (const star of stars) {\n      accelerateTowardsCamera(star, delta);\n      applyPointerGravity(star, mouse);\n      recycleIfNeeded(star, app.screen);\n    }\n\n    redrawStarSprites(stars);\n  });\n};`,
  },
  {
    id: 'hud',
    name: { en: 'HUD', es: 'HUD' },
    summary: {
      en: 'Retro heads-up display with scanning beams, rotating reticules, and typographic overlays animating in synchrony.',
      es: 'HUD retro con haces de escaneo, reticulas rotando y overlays tipograficos sincronizados.',
    },
    highlights: {
      en: [
        'Layered containers for grid, text, and sweep effects',
        'Procedural scanlines sweep across using additive blending',
        'Circular radar reticule syncs rotation with pulse animation',
      ],
      es: [
        'Capas separadas para grilla, texto y barridos',
        'Scanlines procedurales con blending aditivo',
        'Reticula circular sincroniza rotacion con el pulso',
      ],
    },
    codeSnippet: `const setupHUDScroller = (app: PIXI.Application) => {\n  const hud = buildHudLayers(app);\n  const sweep = createSweepShader();\n\n  app.ticker.add((delta) => {\n    hud.grid.position.y += delta * 0.5;\n    hud.sweep.uniforms.time += delta * 0.01;\n    hud.radar.rotation += delta * 0.02;\n  });\n};`,
  },
  {
    id: 'cloud',
    name: { en: 'Nebula', es: 'Nebula' },
    summary: {
      en: 'Ethereal volumetric clouds swirl around the cursor with displacement filters that make the fog feel touch-responsive.',
      es: 'Nubes volumetricas etereas giran con filtros de desplazamiento que reaccionan al tacto.',
    },
    highlights: {
      en: [
        'Custom radial texture brushes feed a massive particle system',
        'Displacement filters warp sprites for gaseous motion',
        'Pointer trails leave illuminated vortices behind',
      ],
      es: [
        'Brochas radiales custom alimentan un sistema masivo de particulas',
        'Filtros de desplazamiento deforman sprites con movimiento gaseoso',
        'Trazas del puntero dejan vortices iluminados',
      ],
    },
    codeSnippet: `const setupNebulaCloud = (app: PIXI.Application) => {\n  const brush = createDisplacementBrush(app);\n  const particles = seedNebulaSprites(app, 500);\n\n  app.ticker.add((delta) => {\n    brush.follow(mouse);\n    for (const puff of particles) {\n      puff.position.add(puff.velocity.clone().scale(delta));\n      wrapAround(puff, app.screen);\n    }\n  });\n};`,
  },
  {
    id: 'orbs',
    name: { en: 'Mystic Orbs', es: 'Orbes misticos' },
    summary: {
      en: 'Softly glowing spheres drift in layered depths, bending light as they intersect and respond to pointer momentum.',
      es: 'Esferas luminosas flotan en capas, doblan la luz al cruzarse y responden al puntero.',
    },
    highlights: {
      en: [
        'Sprite layers run with additive blend modes for bloom',
        'Velocity easing keeps motion fluid and hypnotic',
        'Parallax scales make fore and background layers distinct',
      ],
      es: [
        'Capas de sprites con blending aditivo para bloom',
        'Easing de velocidad mantiene el movimiento fluido',
        'Escalas parallax separan capas de fondo y frente',
      ],
    },
    codeSnippet: `const setupFloatingOrbs = (app: PIXI.Application) => {\n  const orbs = spawnOrbLayers(app);\n\n  app.ticker.add((delta) => {\n    for (const orb of orbs) {\n      orb.velocity.lerp(orb.targetVelocity, delta * 0.02);\n      orb.sprite.position.copyFrom(orb.position.add(orb.velocity));\n      parallaxDepth(orb.sprite, orb.depth);\n    }\n  });\n};`,
  },
];

export const AnimationsPage: FC<{ language: Language }> = ({ language }) => {
  const content = copy[language];
  const animations = useMemo<AnimationOption[]>(
    () =>
      animationsCopy.map(animation => ({
        id: animation.id,
        name: animation.name[language],
        summary: animation.summary[language],
        highlights: animation.highlights[language],
        codeSnippet: animation.codeSnippet,
      })),
    [language]
  );

  const [selectedAnimationId, setSelectedAnimationId] = useState(animationsCopy[0].id);
  const selectedAnimation = animations.find(animation => animation.id === selectedAnimationId) || animations[0];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    setCopied(false);
  }, [selectedAnimationId, language]);

  const handleCopy = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const text = selectedAnimation.codeSnippet;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
    } catch (error) {
      console.error('Failed to copy animation snippet', error);
    }
  };

  return (
    <AnimatedSection id="animations" stagger>
      <div className="pt-20 text-center">
        <div className="inline-flex items-center space-x-3 bg-amber-400/10 text-amber-300 px-4 py-2 rounded-full border border-amber-400/30">
          <SparklesIcon className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">{content.badge}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 mb-4">{content.title}</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{content.subtitle}</p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {animations.map(animation => {
          const isActive = animation.id === selectedAnimationId;
          return (
            <button
              key={animation.id}
              onClick={() => setSelectedAnimationId(animation.id)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm md:text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
                isActive
                  ? 'bg-amber-400/20 border-amber-300/70 text-amber-200 shadow-[0_0_15px_rgba(252,211,77,0.25)]'
                  : 'border-gray-700 text-gray-300 hover:text-white hover:border-amber-300/60'
              }`}
              type="button"
            >
              {animation.name}
            </button>
          );
        })}
      </div>

      <div className="mt-14 grid lg:grid-cols-2 gap-8 items-start">
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-[0_0_35px_rgba(8,8,20,0.35)]">
          <DynamicBackground
            mode={selectedAnimation.id}
            attachToWindow={false}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white">{selectedAnimation.name}</h2>
              <p className="text-sm text-gray-300 mt-2">{selectedAnimation.summary}</p>
              <ul className="mt-4 space-y-2 text-xs md:text-sm text-gray-400 text-left">
                {selectedAnimation.highlights.map(highlight => (
                  <li key={highlight} className="flex items-start space-x-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-[0_0_35px_rgba(8,8,20,0.35)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
            <div className="flex items-center space-x-3 text-left">
              <CodeIcon className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="text-lg font-semibold text-white">{content.snippetTitle}</h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                aria-live="polite"
              >
                {copied ? (
                  <CheckCircleIcon className="h-3.5 w-3.5" />
                ) : (
                  <CopyIcon className="h-3.5 w-3.5" />
                )}
                <span>{copied ? content.copied : content.copySnippet}</span>
              </button>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Pixi.js</span>
            </div>
          </div>
          <pre className="p-6 text-sm leading-relaxed text-amber-100 overflow-x-auto whitespace-pre">
            <code>{selectedAnimation.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AnimationsPage;
