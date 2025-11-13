
import React, { FC } from 'react';
import { AnimatedSection } from './AnimatedSection';

const dayFeatureFlags: Record<number, boolean> = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
};

const AdventDayBox: FC<{ day: number; enabled: boolean }> = ({ day, enabled }) => {
  const paddedDay = day.toString().padStart(2, '0');
  const projectUrl = `https://day${paddedDay}.advent2025.amllamojha.com`;
  const previewUrl = `${projectUrl}/preview.png`;

  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200 shadow-[0_0_18px_rgba(255,215,0,0.2)]">
        Day {paddedDay}
      </div>
      <div className={`advent-gift group w-full max-w-[190px] ${enabled ? 'gift-enabled' : ''}`}>
        <div className="gift relative w-full">
          <div className="gift-lid">
            <div className="gift-ribbon-vertical" />
            <div className="gift-bow" />
          </div>
          <div className="gift-box">
            <div className="gift-ribbon-vertical" />
            <div className="gift-ribbon-horizontal" />
            <div className={`gift-content ${enabled ? 'gift-content-open' : ''}`}>
              {enabled ? (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
                >
                  <div className="relative h-28 w-28 overflow-hidden rounded-md border border-white/20 bg-black/20 shadow-inner">
                    <img
                      src={previewUrl}
                      alt={`Preview of Advent calendar project for day ${day}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-amber-200">
                    View Day {paddedDay}
                  </span>
                </a>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
                  <span className="text-4xl font-bold drop-shadow-lg">🎁</span>
                  <span className="text-xs uppercase tracking-[0.35em] text-amber-100/80">Locked</span>
                  <span className="text-[11px] text-gray-200/70">Opens soon!</span>
                </div>
              )}
            </div>
          </div>
        </div>
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
          <AdventDayBox key={day} day={day} enabled={dayFeatureFlags[day] ?? false} />
        ))}
      </div>
       <style>{`
        .advent-gift {
          perspective: 1200px;
        }

        .gift {
          aspect-ratio: 1 / 1;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1);
          animation: float 6s ease-in-out infinite;
        }

        .gift-box,
        .gift-lid {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          overflow: hidden;
        }

        .gift-box {
          background: linear-gradient(135deg, #b91c1c, #7f1d1d 70%);
          box-shadow: 0 30px 60px -20px rgba(239, 68, 68, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          transform: translateZ(-8px) translateY(12px);
        }

        .gift-lid {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          height: 48%;
          transform-origin: center bottom;
          transform: translateY(-6%) translateZ(12px);
          box-shadow: 0 18px 35px -18px rgba(220, 38, 38, 0.7);
        }

        .gift-bow {
          position: absolute;
          top: -14px;
          left: 50%;
          width: 74px;
          height: 74px;
          transform: translateX(-50%) rotate(45deg);
          background: radial-gradient(circle at 30% 30%, #facc15 0%, #fbbf24 45%, #d97706 100%);
          border-radius: 24px;
          box-shadow: 0 10px 25px -10px rgba(251, 191, 36, 0.7);
          transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), filter 0.65s ease;
        }

        .gift-ribbon-vertical,
        .gift-ribbon-horizontal {
          position: absolute;
          background: linear-gradient(180deg, #fde68a, #f59e0b);
          mix-blend-mode: screen;
        }

        .gift-ribbon-vertical {
          top: 0;
          bottom: 0;
          left: 50%;
          width: 16%;
          transform: translateX(-50%);
          box-shadow: inset 0 0 8px rgba(0,0,0,0.25);
        }

        .gift-ribbon-horizontal {
          left: 0;
          right: 0;
          top: 50%;
          height: 16%;
          transform: translateY(-50%);
          box-shadow: inset 0 0 8px rgba(0,0,0,0.25);
        }

        .gift-content {
          position: absolute;
          inset: 16% 10% 14% 10%;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          transform: translateZ(20px) scale(0.96);
          transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .gift-content::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 65%);
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .gift-content-open::after {
          opacity: 1;
        }

        .advent-gift .gift-content {
          opacity: 0.85;
        }

        .advent-gift.gift-enabled .gift-content,
        .advent-gift:hover .gift-content {
          opacity: 1;
          transform: translateZ(26px) scale(1);
        }

        .advent-gift:hover .gift,
        .advent-gift.gift-enabled .gift {
          transform: translateY(-18px) rotateX(16deg) rotateY(-6deg) scale(1.02);
        }

        .advent-gift:hover .gift-lid,
        .advent-gift.gift-enabled .gift-lid {
          transform: translateY(-120%) rotateX(82deg) translateZ(8px);
        }

        .advent-gift:hover .gift-bow,
        .advent-gift.gift-enabled .gift-bow {
          transform: translateX(-50%) rotate(20deg) translateY(-6px) scale(1.05);
          filter: brightness(1.15);
        }

        .gift a {
          text-decoration: none;
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translate3d(0, -8px, 0) rotateX(4deg) rotateY(-2deg);
          }
        }

        @media (max-width: 640px) {
          .gift {
            animation-duration: 7.5s;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
