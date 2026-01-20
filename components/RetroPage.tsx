import React, { useEffect, useRef, useState } from 'react';
import RuneScapeBold from '../assets/fonts/RuneScape-Bold-12.ttf';
import RuneScapePlain from '../assets/fonts/RuneScape-Plain-12.ttf';

// Chiptune music URL (royalty-free 8-bit style)
const MUSIC_URL = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/8bit%20Dungeon%20Level.mp3';

// Experience data (mirrored from App.tsx)
const experience = [
  {
    role: 'Director & Principal Consultant',
    company: 'No Limits Solutions',
    period: 'May 2022 – Present',
    description: 'Provided observability, platform, and DevOps consulting for retail and data-driven organisations. Delivered New Relic rollouts, established monitoring and alerting, and supported GenAI start-ups with AWS and serverless stacks.',
  },
  {
    role: 'Senior AWS DevOps & Serverless Engineer',
    company: 'LEGO.com',
    period: 'May 2018 – May 2022',
    description: 'Designed the first serverless microservices with Node.js/TypeScript, transitioned infrastructure to AWS ECS Fargate with Terraform, and eliminated high-severity incidents during peak seasons through refined monitoring.',
  },
  {
    role: 'DevOps Engineer',
    company: 'SecretSales',
    period: 'Aug 2017 – May 2018',
    description: 'Introduced Docker containerisation for local and AWS ECS environments using CloudFormation. Strengthened production observability with New Relic, CloudWatch, and PagerDuty.',
  },
  {
    role: 'Systems Engineer & DevOps',
    company: 'Various',
    period: 'Apr 2012 – Aug 2017',
    description: 'Supported mission-critical air traffic systems (Indra UK), operated media data platforms (MetaBroadcast), and built CI/CD pipelines for various tech start-ups.',
  },
];

// External GIF URLs from neocities archives
const GIFS = {
  flame: 'https://blinkies.neocities.org/b/display/0036-fire.gif',
  underConstruction: 'https://plasticdino.neocities.org/graphics/kittysparadise_banner_s.gif',
  email: 'https://blinkies.neocities.org/b/display/0061-pinkcomputer.gif',
  divider: 'https://jays-attick.neocities.org/gifz/firedivider.gif',
  netscape: 'https://plasticdino.neocities.org/bumper/html_incomp.gif',
  sparkle: 'https://blinkies.neocities.org/b/display/0187-transparentsparkle.gif',
  starryEyes: 'https://blinkies.neocities.org/b/display/0013-starryeyes.gif',
};

// Small blinkies for bullets/decorations (from your list)
const BULLET_BLINKIES = [
  'https://adriansblinkiecollection.neocities.org/b15.gif',
  'https://adriansblinkiecollection.neocities.org/d21.gif',
  'https://monsterboy.neocities.org/meow/k11.gif',
  'https://monsterboy.neocities.org/meow/toxicmold.gif',
  'https://jays-attick.neocities.org/gifz/blinkies/skullblink.gif',
  'https://cd-rome.neocities.org/blinks/0049-thrift.gif',
];

// Extra blinkies for walls - all unique, no duplicates with GIFS or BULLET_BLINKIES
const BLINKIES = [
  // Row 1 (top)
  'https://blinkies.neocities.org/b/display/0055-rainbowswirl.gif',
  'https://blinkies.neocities.org/b/display/0070-lavalamp.gif',
  'https://blinkies.neocities.org/b/display/0069-alien.gif',
  'https://blinkies.neocities.org/b/display/0068-mainframe.gif',
  'https://blinkies.neocities.org/b/display/0067-moonstars.gif',
  'https://blinkies.neocities.org/b/display/0124-stars.gif',
  'https://blinkies.neocities.org/b/display/0123-glitterpink.gif',
  'https://blinkies.neocities.org/b/display/0119-pastelstars.gif',
  // Row 2 (after hero)
  'https://blinkies.neocities.org/b/display/0116-debian.gif',
  'https://blinkies.neocities.org/b/display/0092-computerconnect.gif',
  'https://blinkies.neocities.org/b/display/0028-computer.gif',
  'https://blinkies.neocities.org/b/display/0059-greenscreen.gif',
  'https://blinkies.neocities.org/b/display/0060-glitch.gif',
  'https://blinkies.neocities.org/b/display/0054-caution.gif',
  'https://blinkies.neocities.org/b/display/0034-skull.gif',
  'https://blinkies.neocities.org/b/display/0039-staticrainbow.gif',
  // Row 3 (after experience)
  'https://blinkies.neocities.org/b/display/0102-rainbowchecker.gif',
  'https://blinkies.neocities.org/b/display/0172-rainbowequalizer.gif',
  'https://blinkies.neocities.org/b/display/0138-greenglow.gif',
  'https://blinkies.neocities.org/b/display/0142-virusgender.gif',
  'https://blinkies.neocities.org/b/display/0141-digigender.gif',
  'https://blinkies.neocities.org/b/display/0174-hal9000.gif',
  'https://blinkies.neocities.org/b/display/0001-saucer.gif',
  'https://blinkies.neocities.org/b/display/0005-citystars.gif',
  // Row 4 (after contact) - replaced duplicates with new ones from your list
  'https://blinkies.neocities.org/b/display/0115-alpinelinux.gif',
  'https://y2k.neocities.org/blinkiez/newbatch/blinkiesmile.gif',
  'https://monsterboy.neocities.org/meow/werewolf.gif',
  'https://blinkies.neocities.org/b/display/0035-edgyred.gif',
  'https://blinkies.neocities.org/b/display/0063-darth.gif',
  'https://blinkies.neocities.org/b/display/0057-ophiuchus.gif',
  'https://blinkies.neocities.org/b/display/0056-pirate.gif',
  'https://blinkies.neocities.org/b/display/0021-vampirefangs.gif',
];

const retroStyles = `
  @font-face {
    font-family: 'RuneScape';
    src: url('${RuneScapeBold}') format('truetype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'RuneScape';
    src: url('${RuneScapePlain}') format('truetype');
    font-weight: normal;
  }

  .retro-page {
    min-height: 100vh;
    background: #000000;
    color: #00ff00;
    font-family: 'Courier New', 'RuneScape', monospace;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .matrix-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .retro-container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.85);
    border: 2px solid #00ff00;
    padding: 20px;
    box-shadow: 0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.1);
    position: relative;
    z-index: 1;
  }

  .runescape-title {
    font-family: 'RuneScape', 'Courier New', monospace;
    font-size: 48px;
    font-weight: bold;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
    text-align: center;
    margin: 20px 0;
  }

  .blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .rainbow-text {
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00;
    font-weight: bold;
  }

  .retro-marquee {
    background: #001100;
    color: #00ff00;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid #00ff00;
    text-shadow: 0 0 5px #00ff00;
  }

  .flame-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .retro-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 2px;
    border: 2px solid #00ff00;
    background: rgba(0, 20, 0, 0.8);
    margin: 20px 0;
  }

  .retro-table th {
    background: #003300;
    color: #00ff00;
    padding: 10px;
    border: 1px solid #00ff00;
    font-family: 'RuneScape', 'Courier New', monospace;
    font-size: 18px;
    text-shadow: 0 0 5px #00ff00;
  }

  .retro-table td {
    padding: 10px;
    border: 1px solid #004400;
    vertical-align: top;
  }

  .retro-table tr:nth-child(even) td {
    background: rgba(0, 30, 0, 0.6);
  }

  .retro-table tr:nth-child(odd) td {
    background: rgba(0, 50, 0, 0.6);
  }

  .retro-button {
    display: inline-block;
    background: #001100;
    color: #00ff00;
    padding: 10px 20px;
    border: 2px solid #00ff00;
    font-family: 'RuneScape', 'Courier New', monospace;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    margin: 10px;
    text-shadow: 0 0 5px #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    transition: all 0.2s;
  }

  .retro-button:hover {
    background: #003300;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
  }

  .retro-button:active {
    transform: translate(2px, 2px);
  }

  .badge-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }

  .blinkie-wall {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    margin: 15px 0;
    padding: 10px;
    background: rgba(0, 20, 0, 0.5);
    border: 1px solid #00ff00;
  }

  .blinkie-wall img {
    height: 20px;
    image-rendering: pixelated;
  }

  .visitor-counter {
    background: #000000;
    border: 2px solid #00ff00;
    padding: 5px 10px;
    font-family: 'Courier New', monospace;
    color: #00ff00;
    font-size: 24px;
    display: inline-block;
    text-shadow: 0 0 10px #00ff00;
  }

  .midi-player {
    background: #001100;
    border: 1px solid #00ff00;
    padding: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #00ff00;
  }

  .midi-button {
    width: 24px;
    height: 24px;
    background: #002200;
    border: 1px solid #00ff00;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #00ff00;
  }

  .midi-button:hover {
    background: #003300;
    box-shadow: 0 0 10px #00ff00;
  }

  .section-title {
    font-family: 'RuneScape', 'Courier New', monospace;
    font-size: 32px;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00;
    text-align: center;
    margin: 30px 0 20px;
  }

  .section-title img {
    display: inline-block;
    vertical-align: middle;
  }

  .guestbook-entry {
    background: #ffffcc;
    border: 2px inset #808080;
    padding: 10px;
    margin: 10px 0;
    color: #000000;
    font-family: 'Times New Roman', serif;
  }

  .sparkle {
    position: fixed;
    pointer-events: none;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, #00ff00, #003300, transparent);
    border-radius: 50%;
    animation: sparkle-fade 0.5s ease-out forwards;
  }

  @keyframes sparkle-fade {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }

  .retro-hr {
    border: none;
    height: 2px;
    background: #00ff00;
    box-shadow: 0 0 10px #00ff00;
    margin: 20px 0;
  }

  .center-text {
    text-align: center;
  }

  .center-text img {
    display: inline-block;
    max-width: 100%;
  }

  .retro-link {
    color: #00ff00;
    text-decoration: underline;
  }

  .retro-link:hover {
    color: #ffffff;
    text-shadow: 0 0 10px #00ff00;
  }

  .footer-text {
    font-size: 12px;
    color: #008800;
    text-align: center;
    margin-top: 20px;
  }
`;

export const RetroPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${e.clientX - 5}px`;
      sparkle.style.top = `${e.clientY - 5}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Autoplay music on first user interaction (browsers block autoplay without interaction)
  useEffect(() => {
    const tryAutoplay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked, will play on user interaction
        });
      }
    };
    
    // Try autoplay immediately
    tryAutoplay();
    
    // Also try on first click (for browsers that block autoplay)
    const handleFirstClick = () => {
      tryAutoplay();
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);
    
    return () => document.removeEventListener('click', handleFirstClick);
  }, [isPlaying]);

  // Matrix rain effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const visitorCount = '001337';

  return (
    <>
      <style>{retroStyles}</style>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <div className="retro-page" ref={containerRef}>
        <canvas id="matrix-canvas" className="matrix-bg" />
        <div className="retro-container">
          {/* Marquee Banner */}
          <marquee className="retro-marquee" scrollamount={5}>
            ⟨ SYSTEM BREACH DETECTED ⟩ WELCOME TO ALVARO'S TERMINAL ⟨ VISITOR #{visitorCount} ⟩ ACCESS GRANTED ⟨ WAKE UP NEO ⟩
          </marquee>

          {/* Top blinkies */}
          <div className="blinkie-wall">
            {BLINKIES.slice(0, 8).map((url, i) => (
              <img key={i} src={url} alt="blinkie" />
            ))}
          </div>

          {/* Hero Section */}
          <div className="center-text">
            <img src={GIFS.underConstruction} alt="Under Construction" style={{ margin: '20px 0' }} />
          </div>

          <div className="flame-container">
            <img src={GIFS.flame} alt="flame" height={60} />
            <h1 className="runescape-title">ALVARO LLAMOJHA</h1>
            <img src={GIFS.flame} alt="flame" height={60} />
          </div>

          <h2 className="center-text blink" style={{ color: '#00ff00', fontSize: '24px' }}>
            &gt;&gt; DevOps & Observability Engineer &lt;&lt;
          </h2>

          <p className="center-text" style={{ fontSize: '16px', lineHeight: '1.8', margin: '20px', color: '#00ff00' }}>
            <span className="rainbow-text">[ SYSTEM PROFILE LOADED ]</span><br /><br />
            Extensive experience designing cloud-native platforms for large-scale e-commerce organisations. 
            Skilled in AWS, serverless architectures, IaC, and end-to-end monitoring. 
            Passionate about developer enablement and the responsible adoption of generative AI.
          </p>

          {/* Blinkies after hero */}
          <div className="blinkie-wall">
            {BLINKIES.slice(8, 16).map((url, i) => (
              <img key={i} src={url} alt="blinkie" />
            ))}
          </div>

          <div className="retro-hr" />

          {/* Experience Section */}
          <h2 className="section-title">
            <img src={BULLET_BLINKIES[0]} alt="" height={20} /> PROFESSIONAL EXPERIENCE <img src={BULLET_BLINKIES[1]} alt="" height={20} />
          </h2>

          <table className="retro-table">
            <thead>
              <tr>
                <th>ROLE</th>
                <th>COMPANY</th>
                <th>PERIOD</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((job, i) => (
                <tr key={i}>
                  <td>
                    <img src={BULLET_BLINKIES[i % BULLET_BLINKIES.length]} alt="*" height={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    <strong style={{ color: '#00ff00' }}>{job.role}</strong>
                    <br />
                    <span style={{ fontSize: '14px', color: '#008800' }}>{job.description}</span>
                  </td>
                  <td style={{ color: '#00ff00', fontWeight: 'bold' }}>{job.company}</td>
                  <td style={{ color: '#00aa00' }}>{job.period}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="center-text">
            <a href="/#experience" className="retro-button">
              &gt; VIEW MODERN EXPERIENCE PAGE
            </a>
          </div>

          {/* Blinkies after experience */}
          <div className="blinkie-wall">
            {BLINKIES.slice(16, 24).map((url, i) => (
              <img key={i} src={url} alt="blinkie" />
            ))}
          </div>

          <div className="retro-hr" />

          {/* Contact Section */}
          <h2 className="section-title">
            <img src={GIFS.email} alt="email" /> ESTABLISH CONNECTION <img src={GIFS.email} alt="email" />
          </h2>

          <div className="center-text">
            <p style={{ fontSize: '18px', marginBottom: '20px', color: '#00ff00' }}>
              <span className="blink" style={{ color: '#00ff00' }}>&gt;</span>
              {' '}I'm always open to discussing new projects, creative ideas, or opportunities!{' '}
              <span className="blink" style={{ color: '#00ff00' }}>&lt;</span>
            </p>

            <a href="mailto:hello@amllamojha.com" className="retro-button">
              &gt; SEND TRANSMISSION
            </a>

            <a href="https://www.linkedin.com/in/llamojha/" target="_blank" rel="noreferrer" className="retro-button">
              &gt; LINKEDIN NODE
            </a>

            <br /><br />

            <a href="/#contact" className="retro-link">
              [ exit_matrix --modern ]
            </a>
          </div>

          {/* Blinkies after contact */}
          <div className="blinkie-wall">
            {BLINKIES.slice(24, 32).map((url, i) => (
              <img key={i} src={url} alt="blinkie" />
            ))}
          </div>

          <div className="retro-hr" />

          {/* Footer with badges */}
          <div className="badge-container">
            <img src={GIFS.netscape} alt="Best viewed in Netscape" title="Best viewed in Netscape Navigator" />
            <img src={GIFS.sparkle} alt="Sparkle" />
            <img src={GIFS.starryEyes} alt="Starry Eyes" />
          </div>

          <div className="center-text">
            <div className="midi-player">
              <span>🎵 AUDIO STREAM:</span>
              <button className="midi-button" title={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="midi-button" title="Stop" onClick={stopMusic}>⏹</button>
              <span style={{ marginLeft: '10px' }}>matrix_theme.wav {isPlaying ? '▓▓▓' : '░░░'}</span>
            </div>
          </div>

          <div className="center-text" style={{ margin: '20px 0' }}>
            <span style={{ color: '#00ff00' }}>CONNECTIONS:</span>
            <div className="visitor-counter">{visitorCount}</div>
          </div>

          <div className="center-text">
            <a href="/#" className="retro-link">[ DISCONNECT FROM MATRIX ]</a>
          </div>

          <p className="footer-text">
            LAST SYSTEM UPDATE: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <br />
            © 1991-{new Date().getFullYear()} LLAMOJHA_TERMINAL v2.0
            <br />
            <span style={{ fontSize: '10px' }}>THE MATRIX HAS YOU</span>
          </p>
        </div>
      </div>
    </>
  );
};
