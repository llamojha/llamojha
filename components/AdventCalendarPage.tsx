
import React, { FC } from 'react';
import { AnimatedSection } from './AnimatedSection';

const AdventDayBox: FC<{ day: number }> = ({ day }) => {
  return (
    <div className="group perspective-1000 cursor-pointer">
      <div className="relative aspect-square w-full transform-style-3d transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-x-10 group-hover:scale-105">
        
        {/* Main box face */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-red-700 from-red-600 to-red-800 bg-gradient-to-br shadow-lg transform translate-z-4 overflow-hidden">
            <span className="font-bold text-white text-4xl md:text-5xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>{day}</span>
        </div>
        
        {/* Ribbon */}
        <div className="absolute top-0 left-1/2 h-full w-[18%] -translate-x-1/2 transform translate-z-5 bg-amber-400 from-amber-300 to-amber-400 bg-gradient-to-b shadow-md"></div>
        <div className="absolute top-1/2 left-0 h-[18%] w-full -translate-y-1/2 transform translate-z-5 bg-amber-400 from-amber-300 to-amber-400 bg-gradient-to-r shadow-md"></div>
        
        {/* 3D Sides */}
        <div className="absolute top-0 left-0 h-full w-8 rounded-lg bg-red-900 transform rotate-y-90 -translate-x-4 origin-left"></div>
        <div className="absolute top-0 left-0 w-full h-8 rounded-lg bg-red-800 transform rotate-x-90 translate-y-4 origin-bottom"></div>

      </div>
    </div>
  );
};

export const AdventCalendarPage: FC = () => {
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <AnimatedSection id="advent-calendar" stagger>
      <div className="pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Advent Calendar 2025</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Welcome to the 2025 Advent of Code challenge! Each day in December, a new puzzle will be unlocked. Click on a present to view the day's challenge. Good luck!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 mt-20">
        {days.map(day => (
          <AdventDayBox key={day} day={day} />
        ))}
      </div>
       <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .translate-z-4 { transform: translateZ(8px); }
        .translate-z-5 { transform: translateZ(9px); }
      `}</style>
    </AnimatedSection>
  );
};
