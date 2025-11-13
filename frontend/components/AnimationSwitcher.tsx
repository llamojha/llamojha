import React, { useState } from 'react';
import { SettingsIcon, RainIcon, HexIcon, CloudIcon, LinesIcon, XIcon, PlexusIcon, TerrainIcon, StarfieldIcon, OrbsIcon, FlowIcon } from './Icons';

interface AnimationSwitcherProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const AnimationSwitcher: React.FC<AnimationSwitcherProps> = ({ currentMode, onModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'rain', name: 'Cyber Rain', icon: <RainIcon className="w-6 h-6" /> },
    { id: 'hex', name: 'Hex Grid', icon: <HexIcon className="w-6 h-6" /> },
    { id: 'plexus', name: 'Plexus', icon: <PlexusIcon className="w-6 h-6" /> },
    { id: 'flow', name: 'Flow Field', icon: <FlowIcon className="w-6 h-6" /> },
    { id: 'terrain', name: 'Terrain', icon: <TerrainIcon className="w-6 h-6" /> },
    { id: 'starfield', name: 'Starfield', icon: <StarfieldIcon className="w-6 h-6" /> },
    { id: 'hud', name: 'HUD', icon: <LinesIcon className="w-6 h-6" /> },
    { id: 'cloud', name: 'Nebula', icon: <CloudIcon className="w-6 h-6" /> },
    { id: 'orbs', name: 'Mystic Orbs', icon: <OrbsIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-gray-900/50 backdrop-blur-md text-gray-300 border border-gray-700/80 transition-all duration-300 hover:bg-gray-800/70 hover:text-amber-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300"
        aria-label="Toggle animation settings"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <SettingsIcon className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-3 w-48 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-lg shadow-2xl p-2 animate-fade-in-up">
          <p className="text-xs text-gray-400 px-2 py-1 font-semibold">Background Style</p>
          <div className="mt-1 space-y-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  onModeChange(mode.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-md transition-colors duration-200 ${
                  currentMode === mode.id
                    ? 'bg-amber-400/20 text-amber-300'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {mode.icon}
                <span>{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnimationSwitcher;