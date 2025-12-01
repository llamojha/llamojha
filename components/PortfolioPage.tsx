
import React, { FC, useEffect, useRef, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ExternalLinkIcon, GithubIcon } from './Icons';

type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  previewUrl?: string;
  imageUrl?: string;
};

export const PortfolioPage: FC = () => {
  const projects: Project[] = [
    {
      title: 'Pixi JS Background Animations',
      description:
        'A dedicated gallery for the Pixi.js background modes used across the homepage, featuring live previews, toggleable modes, and annotated code snippets.',
      tags: ['Pixi.js', 'TypeScript', 'Motion Design', 'Interactive Backgrounds'],
      liveUrl: '/#/animations',
    },
    {
      title: 'Slimelord',
      description:
        'An arcade-inspired browser game built with Phaser.js featuring responsive controls, dynamic enemy patterns, and crunchy pixel art.',
      tags: ['Phaser.js', 'TypeScript', 'Game Development', 'Web Audio'],
      liveUrl: 'https://slimelord.amllamojha.com',
      previewUrl: 'https://slimelord.amllamojha.com',
      imageUrl: 'https://v1.screenshot.11ty.dev/https://slimelord.amllamojha.com/opengraph/',
    },
    {
      title: 'Twitch Clips Reels',
      description:
        'Auto-curated video reels that highlight trending Twitch clips with shareable embeds, built to streamline creator content workflows.',
      tags: ['Next.js', 'TypeScript', 'Serverless', 'Twitch API'],
      liveUrl: 'https://twitch-reels.amllamojha.com',
      previewUrl: 'https://twitch-reels.amllamojha.com',
      imageUrl: 'https://v1.screenshot.11ty.dev/https://twitch-reels.amllamojha.com/opengraph/',
    },
    {
      title: 'Watercolor Helper',
      description:
        'A watercolor reference tool that generates palettes, compositions, and practice prompts to speed up painting sessions.',
      tags: ['Next.js', 'TypeScript', 'Design Tools', 'AI-Assisted'],
      liveUrl: 'https://watercolor-helper.amllamojha.com',
      previewUrl: 'https://watercolor-helper.amllamojha.com',
      imageUrl: 'https://v1.screenshot.11ty.dev/https://watercolor-helper.amllamojha.com',
    },
    {
      title: 'Approve Please',
      description:
        'A lightweight approvals tracker to collect, review, and action requests with clear statuses and links.',
      tags: ['Next.js', 'TypeScript', 'Productivity', 'UI/UX'],
      liveUrl: 'https://approve-please.amllamojha.com',
      previewUrl: 'https://approve-please.amllamojha.com',
      imageUrl: 'https://v1.screenshot.11ty.dev/https://approve-please.amllamojha.com',
    },
    {
      title: 'No Vibe No Code',
      description:
        'A playful micro-site that blends music-driven mood checks with coding prompts to keep hackathon teams energized and aligned.',
      tags: ['React', 'Tailwind CSS', 'Design Systems', 'Product Strategy'],
      liveUrl: 'https://www.novibenocode.com',
      previewUrl: 'https://www.novibenocode.com',
      imageUrl: 'https://v1.screenshot.11ty.dev/https://www.novibenocode.com/opengraph/',
    }
  ];

  return (
    <AnimatedSection id="projects" stagger>
      <div className="pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Project Showcase</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          A selection of projects I've built, showcasing my skills in web development, cloud architecture, and DevOps.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.15)] flex flex-col">
            <ProjectPreview project={project} />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-amber-400/10 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">{project.description}</p>
              <div className="mt-auto flex items-center space-x-6 text-sm">
                {project.liveUrl && (
                  (() => {
                    const isInternalLiveLink = project.liveUrl.startsWith('#/') || project.liveUrl.startsWith('/#/');
                    return (
                  <a
                    href={project.liveUrl}
                    target={isInternalLiveLink ? '_self' : '_blank'}
                    rel={isInternalLiveLink ? undefined : 'noopener noreferrer'}
                    className="flex items-center space-x-2 text-gray-300 hover:text-amber-300 transition-colors group"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                    );
                  })()
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-amber-300 transition-colors group"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

const ProjectPreview: FC<{ project: Project }> = ({ project }) => {
  const [previewState, setPreviewState] = useState<'loading' | 'ready' | 'fallback'>(
    project.previewUrl ? 'loading' : 'fallback'
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!project.previewUrl) {
      setPreviewState('fallback');
      return;
    }

    setPreviewState('loading');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setPreviewState(current => (current === 'loading' ? 'fallback' : current));
    }, 4500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [project.previewUrl]);

  const handlePreviewLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPreviewState('ready');
  };

  const baseClassName = 'relative overflow-hidden aspect-video rounded-t-xl group bg-gray-950';

  const previewContent = (
    <>
      {project.previewUrl && previewState !== 'fallback' && (
        <iframe
          src={project.previewUrl}
          title={`${project.title} live preview`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full border-0 transition-all duration-700 ease-out pointer-events-none ${
            previewState === 'ready' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={handlePreviewLoad}
        />
      )}

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} preview image`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none ${
            previewState === 'ready' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {!project.imageUrl && previewState !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            {project.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </>
  );

  if (project.liveUrl) {
    const isInternalLiveLink = project.liveUrl.startsWith('#/') || project.liveUrl.startsWith('/#/');

    return (
      <a
        href={project.liveUrl}
        target={isInternalLiveLink ? undefined : '_blank'}
        rel={isInternalLiveLink ? undefined : 'noopener noreferrer'}
        aria-label={`Open ${project.title} live demo`}
        className={`${baseClassName} block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950`}
      >
        {previewContent}
      </a>
    );
  }

  return <div className={baseClassName}>{previewContent}</div>;
};
