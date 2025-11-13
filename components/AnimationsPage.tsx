import React, { FC, useMemo, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import DynamicBackground from './DynamicBackground';
import { SparklesIcon, CodeIcon } from './Icons';

interface AnimationOption {
  id: string;
  name: string;
  summary: string;
  highlights: string[];
  codeSnippet: string;
}

export const AnimationsPage: FC = () => {
  const animations = useMemo<AnimationOption[]>(
    () => [
      {
        id: 'rain',
        name: 'Cyber Rain',
        summary:
          'Neon-coded raindrops cascade across the viewport, forming reactive energy links that glow brighter whenever the pointer passes by.',
        highlights: [
          '300+ PIXI sprites animated per frame with dynamic tinting',
          'Pointer proximity turns drops into "hot" streaks rendered in amber',
          'Procedural line mesh connects nearby particles for a cyber-grid effect',
        ],
        codeSnippet: `const setupCyberpunkRain = (app: PIXI.Application) => {\n  const particles = createParticleColumn(app, 300);\n  const mouse = trackPointer(app.stage);\n\n  app.ticker.add((delta) => {\n    lines.clear();\n    for (const drop of particles) {\n      drop.y += drop.vy * delta;\n      wrapVertically(drop, app.screen.height);\n\n      const distance = getDistance(drop, mouse);\n      drop.isHot = distance < 150;\n      drop.tint = drop.isHot ? PALETTE.GOLD : drop.originalColor;\n    }\n\n    connectNearbyParticles(lines, particles, 100);\n  });\n};`,
      },
      {
        id: 'hex',
        name: 'Hex Grid',
        summary:
          'A tessellated honeycomb that subtly pulses with waves of light and ripples outward in response to pointer movement.',
        highlights: [
          'Mathematical placement for seamless staggered rows of hexes',
          'Dynamic alpha shifts blend pulse cycles with pointer influence',
          'Hovering rewrites both fill and stroke palettes for a golden accent',
        ],
        codeSnippet: `const setupHexGrid = (app: PIXI.Application) => {\n  const hexes = buildHexCoordinates(app.screen, HEX_SIZE);\n  const mouse = trackPointer(app.stage);\n\n  app.ticker.add(() => {\n    hexGrid.clear();\n    for (const hex of hexes) {\n      const distance = getDistance(hex, mouse);\n      const influence = Math.max(0, 1 - distance / 200);\n      const pulse = Math.sin(app.ticker.lastTime / 500 + hex.x / 100);\n\n      drawHex({\n        graphics: hexGrid,\n        center: hex,\n        alpha: 0.1 + influence * 0.5 + pulse * 0.05,\n        stroke: influence > 0.1 ? PALETTE.GOLD : PALETTE.DARK_BLUE,\n      });\n    }\n  });\n};`,
      },
      {
        id: 'plexus',
        name: 'Plexus',
        summary:
          'A constellation of interconnected nodes orbiting around the cursor to create a futuristic, data-visualisation inspired mesh.',
        highlights: [
          'Particle spring physics with easing on pointer attraction',
          'Depth is implied by modulating line alpha by connection distance',
          'Lightweight enough to run at 60fps on mobile Safari',
        ],
        codeSnippet: `const setupPlexus = (app: PIXI.Application) => {\n  const nodes = spawnPlexusNodes(app, 160);\n\n  app.ticker.add((delta) => {\n    plexus.clear();\n    for (const node of nodes) {\n      applyPlexusForces(node, delta);\n      node.sprite.x = node.position.x;\n      node.sprite.y = node.position.y;\n    }\n\n    drawConnections(plexus, nodes, {\n      maxDistance: 140,\n      highlightRadius: 110,\n    });\n  });\n};`,
      },
      {
        id: 'flow',
        name: 'Flow Field',
        summary:
          'Organic ribbon trails wander across the canvas, guided by Perlin-noise flow fields that constantly reshape the composition.',
        highlights: [
          'Noise-driven velocity map generates smooth directional changes',
          'Trail history buffers render semi-transparent motion blur',
          'Color palette oscillates across amber and teal spectrums',
        ],
        codeSnippet: `const setupFlowField = (app: PIXI.Application) => {\n  const field = createFlowField(app.screen, 20);\n  const ribbons = seedRibbons(app, field);\n\n  app.ticker.add((delta) => {\n    for (const ribbon of ribbons) {\n      const direction = field.lookup(ribbon.position);\n      ribbon.velocity.add(direction.scale(delta * 0.002));\n      ribbon.updateTrail();\n    }\n\n    redrawRibbons(ribbonLayer, ribbons);\n  });\n};`,
      },
      {
        id: 'terrain',
        name: 'Terrain',
        summary:
          'Wireframe height-maps sweep by like a synthwave valley, with parallax gradients accentuating the sense of depth.',
        highlights: [
          'Scrolling noise offsets emulate an endless terrain flyover',
          'Vertex elevations are recalculated every frame for fluid motion',
          'Gradient overlays add a warm atmospheric horizon',
        ],
        codeSnippet: `const setupTerrain = (app: PIXI.Application) => {\n  const mesh = createTerrainMesh(app.screen);\n\n  app.ticker.add((delta) => {\n    terrainPhase += delta * 0.0025;\n    for (const row of mesh.rows) {\n      for (const vertex of row) {\n        vertex.y = getElevation(vertex.x, row.index, terrainPhase);\n      }\n    }\n\n    mesh.updateVertices();\n  });\n};`,
      },
      {
        id: 'starfield',
        name: 'Starfield',
        summary:
          'Depth-sorted stardust arcs towards the viewer, bending around the pointer to create a warp-speed vignette.',
        highlights: [
          '3D-like parallax achieved with z-index scaling and blur filters',
          'Pointer gravity subtly deflects nearby stars from their path',
          'Optimised particle pool eliminates garbage-collection spikes',
        ],
        codeSnippet: `const setupStarfield = (app: PIXI.Application) => {\n  const stars = initialiseStarPool(app, 220);\n\n  app.ticker.add((delta) => {\n    for (const star of stars) {\n      accelerateTowardsCamera(star, delta);\n      applyPointerGravity(star, mouse);\n      recycleIfNeeded(star, app.screen);\n    }\n\n    redrawStarSprites(stars);\n  });\n};`,
      },
      {
        id: 'hud',
        name: 'HUD',
        summary:
          'Retro heads-up display with scanning beams, rotating reticules, and typographic overlays animating in synchrony.',
        highlights: [
          'Layered containers for grid, text, and sweep effects',
          'Procedural scanlines sweep across using additive blending',
          'Circular radar reticule syncs rotation with pulse animation',
        ],
        codeSnippet: `const setupHUDScroller = (app: PIXI.Application) => {\n  const hud = buildHudLayers(app);\n  const sweep = createSweepShader();\n\n  app.ticker.add((delta) => {\n    hud.grid.position.y += delta * 0.5;\n    hud.sweep.uniforms.time += delta * 0.01;\n    hud.radar.rotation += delta * 0.02;\n  });\n};`,
      },
      {
        id: 'cloud',
        name: 'Nebula',
        summary:
          'Ethereal volumetric clouds swirl around the cursor with displacement filters that make the fog feel touch-responsive.',
        highlights: [
          'Custom radial texture brushes feed a massive particle system',
          'Displacement filters warp sprites for gaseous motion',
          'Pointer trails leave illuminated vortices behind',
        ],
        codeSnippet: `const setupNebulaCloud = (app: PIXI.Application) => {\n  const brush = createDisplacementBrush(app);\n  const particles = seedNebulaSprites(app, 500);\n\n  app.ticker.add((delta) => {\n    brush.follow(mouse);\n    for (const puff of particles) {\n      puff.position.add(puff.velocity.clone().scale(delta));\n      wrapAround(puff, app.screen);\n    }\n  });\n};`,
      },
      {
        id: 'orbs',
        name: 'Mystic Orbs',
        summary:
          'Softly glowing spheres drift in layered depths, bending light as they intersect and respond to pointer momentum.',
        highlights: [
          'Sprite layers run with additive blend modes for bloom',
          'Velocity easing keeps motion fluid and hypnotic',
          'Parallax scales make fore and background layers distinct',
        ],
        codeSnippet: `const setupFloatingOrbs = (app: PIXI.Application) => {\n  const orbs = spawnOrbLayers(app);\n\n  app.ticker.add((delta) => {\n    for (const orb of orbs) {\n      orb.velocity.lerp(orb.targetVelocity, delta * 0.02);\n      orb.sprite.position.copyFrom(orb.position.add(orb.velocity));\n      parallaxDepth(orb.sprite, orb.depth);\n    }\n  });\n};`,
      },
    ],
    []
  );

  const [selectedAnimation, setSelectedAnimation] = useState<AnimationOption>(animations[0]);

  return (
    <AnimatedSection id="animations" stagger>
      <div className="pt-20 text-center">
        <div className="inline-flex items-center space-x-3 bg-amber-400/10 text-amber-300 px-4 py-2 rounded-full border border-amber-400/30">
          <SparklesIcon className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">Pixi-powered showcase</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 mb-4">Animation Library</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Explore the full catalogue of interactive backgrounds powering the homepage. Toggle between modes to preview them live
          and review the core Pixi.js techniques used in their implementation.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {animations.map(animation => {
          const isActive = animation.id === selectedAnimation.id;
          return (
            <button
              key={animation.id}
              onClick={() => setSelectedAnimation(animation)}
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
                <h3 className="text-lg font-semibold text-white">Core implementation snippet</h3>
                <p className="text-xs text-gray-500">components/DynamicBackground.tsx</p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Pixi.js</span>
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
