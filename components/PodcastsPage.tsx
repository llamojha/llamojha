import React, { FC, useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';

export type Language = 'en' | 'es';

interface Episode {
  id: string;
  title: string;
  description: string;
  show: string;
  audioUrl: string;
  duration: string;
  date: string;
}

interface PodcastManifest {
  podcasts: Episode[];
}

type Props = {
  route: string;
  language: Language;
};

const labels = {
  en: {
    title: 'Podcasts',
    subtitle: 'AI-generated podcasts on tech, gaming, and more.',
    backToList: 'Back to podcasts',
    durationLabel: 'Duration',
    notFoundTitle: 'Episode not found',
    notFoundBody: 'The link might be outdated. Head back to the podcast list to keep exploring.',
    notFoundCta: 'View all podcasts',
    noEpisodes: 'No episodes yet. Check back soon!',
    loading: 'Loading episodes...',
  },
  es: {
    title: 'Podcasts',
    subtitle: 'Podcasts generados por IA sobre tecnología, gaming y más.',
    backToList: 'Volver a podcasts',
    durationLabel: 'Duración',
    notFoundTitle: 'Episodio no encontrado',
    notFoundBody: 'El enlace puede estar desactualizado. Vuelve a la lista para seguir explorando.',
    notFoundCta: 'Ver todos los podcasts',
    noEpisodes: 'Aún no hay episodios. ¡Vuelve pronto!',
    loading: 'Cargando episodios...',
  },
};

const MANIFEST_URL = import.meta.env.VITE_PODCAST_MANIFEST_URL || '';

export const PodcastsPage: FC<Props> = ({ route, language }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const slug = route.replace(/^#\/podcasts\/?/, '').trim();
  const copy = labels[language];

  useEffect(() => {
    if (!MANIFEST_URL) {
      setLoading(false);
      return;
    }
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: PodcastManifest) => {
        setEpisodes(data.podcasts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const episode = slug ? episodes.find((ep) => ep.id === slug) : undefined;

  if (loading) {
    return (
      <AnimatedSection id="podcasts" stagger>
        <div className="pt-20 text-center">
          <p className="text-lg text-gray-400">{copy.loading}</p>
        </div>
      </AnimatedSection>
    );
  }

  if (slug && !episode) {
    return (
      <AnimatedSection id="podcasts" stagger>
        <div className="pt-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {copy.notFoundTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {copy.notFoundBody}
          </p>
          <a
            href="/#/podcasts"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-900 bg-amber-300 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)]"
          >
            {copy.notFoundCta}
          </a>
        </div>
      </AnimatedSection>
    );
  }

  if (episode) {
    return (
      <AnimatedSection id="podcasts" stagger>
        <div className="pt-20 max-w-3xl mx-auto">
          <a
            href="/#/podcasts"
            className="text-amber-300 hover:text-amber-200 transition-colors text-sm"
          >
            {copy.backToList}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-3">
            {episode.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-gray-500 mb-8">
            <span>{episode.date}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/60" aria-hidden />
            <span>{copy.durationLabel}: {episode.duration}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/60" aria-hidden />
            <span className="text-amber-300/80">{episode.show}</span>
          </div>
          <p className="text-lg text-gray-300 mb-8">{episode.description}</p>
          <audio
            controls
            src={episode.audioUrl}
            className="w-full rounded-lg"
            style={{ accentColor: '#fcd34d' }}
          />
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="podcasts" stagger>
      <div className="pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {copy.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          {copy.subtitle}
        </p>
      </div>
      {episodes.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-gray-500">{copy.noEpisodes}</p>
        </div>
      ) : (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <a
              key={ep.id}
              href={`/#/podcasts/${ep.id}`}
              className="group bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.12)]"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 mb-3">
                <span>{ep.date}</span>
                <span className="text-amber-300/80">{ep.show}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-200 transition-colors">
                {ep.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {ep.description}
              </p>
              <div className="text-xs uppercase tracking-widest text-amber-300/80">
                {copy.durationLabel}: {ep.duration}
              </div>
            </a>
          ))}
        </div>
      )}
    </AnimatedSection>
  );
};

export default PodcastsPage;
