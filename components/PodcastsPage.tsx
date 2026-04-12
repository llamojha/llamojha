import React, { useState, useEffect, FC } from 'react';

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  audioUrl: string;
  description: string;
  show: string;
}

interface PodcastManifest {
  podcasts: Episode[];
}

// TODO: Replace with actual OutputBucket URL after deployment
const MANIFEST_URL = import.meta.env.VITE_PODCAST_MANIFEST_URL || '';

export const PodcastsPage: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    if (!MANIFEST_URL) {
      setLoading(false);
      return;
    }
    
    fetch(MANIFEST_URL)
      .then(r => r.json())
      .then((data: PodcastManifest) => {
        setEpisodes(data.podcasts || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load episodes');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem' }}>
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: '1px solid #333',
          color: '#888',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '2rem',
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎙️ Podcasts</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        AI-generated podcasts on tech, gaming, and more.
      </p>

      {loading && <p style={{ color: '#666' }}>Loading episodes...</p>}
      
      {error && <p style={{ color: '#f66' }}>{error}</p>}

      {!MANIFEST_URL && !loading && (
        <div style={{ 
          background: '#111', 
          border: '1px solid #333', 
          borderRadius: '8px', 
          padding: '2rem',
          textAlign: 'center' 
        }}>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            No episodes yet. Deploy the podcast infrastructure to get started!
          </p>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Set <code style={{ background: '#222', padding: '0.25rem' }}>VITE_PODCAST_MANIFEST_URL</code> after deployment.
          </p>
        </div>
      )}

      {episodes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {episodes.map(ep => (
            <article
              key={ep.id}
              style={{
                background: '#111',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{ep.title}</h2>
                <span style={{ 
                  background: '#222', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: '#888'
                }}>
                  {ep.show}
                </span>
              </div>
              <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {ep.date} · {ep.duration}
              </p>
              <p style={{ color: '#aaa', marginBottom: '1rem' }}>{ep.description}</p>
              <audio
                controls
                src={ep.audioUrl}
                style={{ width: '100%' }}
                onPlay={() => setPlaying(ep.id)}
                onPause={() => setPlaying(null)}
              />
            </article>
          ))}
        </div>
      )}

      {!loading && !error && MANIFEST_URL && episodes.length === 0 && (
        <p style={{ color: '#666' }}>No episodes available yet. Check back soon!</p>
      )}
    </div>
  );
};
