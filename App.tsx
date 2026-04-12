
import React, { useState, useEffect, FC } from 'react';
import { MenuIcon, XIcon, ArrowRightIcon, QuoteIcon, CheckCircleIcon, LinkedinIcon, TwitterIcon, GithubIcon, ArrowUpIcon } from './components/Icons';
import { AnimatedSection } from './components/AnimatedSection';
import { PortfolioPage } from './components/PortfolioPage';
import { AnimationsPage } from './components/AnimationsPage';
import { ArticlesPage, type Language } from './components/ArticlesPage';
import { RetroPage } from './components/RetroPage';
import { PodcastsPage } from './components/PodcastsPage';

type NavLink = {
  label: string;
  section: string;
  type: 'section' | 'route';
};

const copy = {
  en: {
    navLinks: [
      { label: 'Experience', section: 'experience', type: 'section' },
      { label: 'Skills', section: 'skills', type: 'section' },
      { label: 'Projects', section: 'projects', type: 'route' },
      { label: 'Animations', section: 'animations', type: 'route' },
      { label: 'Articles', section: 'article', type: 'route' },
      { label: 'Podcasts', section: 'podcasts', type: 'route' },
      { label: 'Talks', section: 'talks', type: 'section' },
      { label: 'Contact', section: 'contact', type: 'section' },
    ] as NavLink[],
    hero: {
      name: 'Alvaro Llamojha',
      title: 'DevOps & Observability Engineer',
      description:
        'Extensive experience designing cloud-native platforms for large-scale e-commerce organisations. Skilled in AWS, serverless architectures, IaC, and end-to-end monitoring. Passionate about developer enablement and the responsible adoption of generative AI.',
      primaryCta: 'Contact Me',
      secondaryCta: 'View Experience',
    },
    competencies: {
      title: 'Core Competencies',
      items: [
        {
          title: 'Cloud & Serverless Architecture',
          description:
            'AWS, Serverless Framework, ECS Fargate, and Terraform for scalable, resilient infrastructure.',
        },
        {
          title: 'CI/CD & Observability',
          description:
            'Automating delivery with CircleCI & GitHub Actions, ensuring reliability with New Relic, ELK, and PagerDuty.',
        },
        {
          title: 'Generative AI Enablement',
          description:
            'Partnering with start-ups to build AI-assisted workflows and prototypes using AWS Bedrock and LLM orchestration.',
        },
      ],
    },
    talks: {
      title: 'Public Tech Talks',
      subtitle:
        'Sharing knowledge and experience with the community on topics ranging from serverless architecture to deployment strategies.',
      talkTitle: 'Tag-Based Deployment for a Serverless Mono-repo',
      talkDescription: 'Presented at GCS Connect (2020).',
    },
    experience: {
      title: 'Professional Experience',
      jobs: [
        {
          role: 'Director & Principal Consultant',
          company: 'No Limits Solutions',
          period: 'May 2022 – Present',
          description:
            'Provided observability, platform, and DevOps consulting for retail and data-driven organisations. Delivered New Relic rollouts, established monitoring and alerting, and supported GenAI start-ups with AWS and serverless stacks.',
        },
        {
          role: 'Senior AWS DevOps & Serverless Engineer',
          company: 'LEGO.com',
          period: 'May 2018 – May 2022',
          description:
            'Designed the first serverless microservices with Node.js/TypeScript, transitioned infrastructure to AWS ECS Fargate with Terraform, and eliminated high-severity incidents during peak seasons through refined monitoring.',
        },
        {
          role: 'DevOps Engineer',
          company: 'SecretSales',
          period: 'Aug 2017 – May 2018',
          description:
            'Introduced Docker containerisation for local and AWS ECS environments using CloudFormation. Strengthened production observability with New Relic, CloudWatch, and PagerDuty.',
        },
        {
          role: 'Systems Engineer & DevOps',
          company: 'Various',
          period: 'Apr 2012 – Aug 2017',
          description:
            'Supported mission-critical air traffic systems (Indra UK), operated media data platforms (MetaBroadcast), and built CI/CD pipelines for various tech start-ups.',
        },
      ],
    },
    more: {
      title: 'More About Me',
      items: [
        {
          title: 'GenAI & Start-up Collaborations',
          description:
            'Partnered with early-stage start-ups on projects introducing AI-assisted internal tools, building prototypes on AWS Bedrock and developing serverless pipelines to orchestrate LLM prompts and embeddings.',
        },
        {
          title: 'Education & Certifications',
          description:
            'AWS Solutions Architect Associate (2020). Continuously learning and applying modern technologies in cloud and software engineering.',
        },
        {
          title: 'Volunteering',
          description:
            'As a mentor at CodeYourFuture, I support aspiring technologists through project guidance, pair-programming, and career coaching to help them build confidence and employability.',
        },
      ],
    },
    cta: {
      title: "Let's Connect",
      description:
        "I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out and start a conversation.",
      button: 'Connect on LinkedIn',
    },
    footer: {
      name: 'Alvaro Llamojha',
      role: 'DevOps & Observability Engineer.',
      navTitle: 'Navigation',
      legalTitle: 'Legal',
      connectTitle: 'Connect',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      location: 'Located in London, UK. Built with passion and code.',
    },
    languageLabel: 'Language',
  },
  es: {
    navLinks: [
      { label: 'Experiencia', section: 'experience', type: 'section' },
      { label: 'Habilidades', section: 'skills', type: 'section' },
      { label: 'Proyectos', section: 'projects', type: 'route' },
      { label: 'Animaciones', section: 'animations', type: 'route' },
      { label: 'Articulos', section: 'article', type: 'route' },
      { label: 'Charlas', section: 'talks', type: 'section' },
      { label: 'Contacto', section: 'contact', type: 'section' },
    ] as NavLink[],
    hero: {
      name: 'Alvaro Llamojha',
      title: 'Ingeniero DevOps y Observabilidad',
      description:
        'Amplia experiencia disenando plataformas cloud-native para e-commerce a gran escala. Experto en AWS, arquitecturas serverless, IaC y monitoreo end-to-end. Apasionado por la habilitacion de equipos y la adopcion responsable de IA generativa.',
      primaryCta: 'Contactame',
      secondaryCta: 'Ver experiencia',
    },
    competencies: {
      title: 'Competencias principales',
      items: [
        {
          title: 'Arquitectura cloud y serverless',
          description:
            'AWS, Serverless Framework, ECS Fargate y Terraform para infraestructura escalable y resiliente.',
        },
        {
          title: 'CI/CD y observabilidad',
          description:
            'Automatizacion con CircleCI y GitHub Actions, confiabilidad con New Relic, ELK y PagerDuty.',
        },
        {
          title: 'Habilitacion de IA generativa',
          description:
            'Colaboracion con start-ups para flujos de trabajo asistidos por IA y prototipos con AWS Bedrock y orquestacion LLM.',
        },
      ],
    },
    talks: {
      title: 'Charlas tecnicas publicas',
      subtitle:
        'Compartiendo conocimiento y experiencia con la comunidad sobre arquitectura serverless y estrategias de despliegue.',
      talkTitle: 'Tag-Based Deployment for a Serverless Mono-repo',
      talkDescription: 'Presentado en GCS Connect (2020).',
    },
    experience: {
      title: 'Experiencia profesional',
      jobs: [
        {
          role: 'Director y consultor principal',
          company: 'No Limits Solutions',
          period: 'May 2022 – Presente',
          description:
            'Consultoria en observabilidad, plataforma y DevOps para retail y organizaciones data-driven. Despliegues de New Relic, alertas y soporte a start-ups de GenAI con AWS y serverless.',
        },
        {
          role: 'Senior AWS DevOps y Serverless Engineer',
          company: 'LEGO.com',
          period: 'May 2018 – May 2022',
          description:
            'Diseno de los primeros microservicios serverless con Node.js/TypeScript, migracion a AWS ECS Fargate con Terraform y reduccion de incidentes en temporadas pico.',
        },
        {
          role: 'DevOps Engineer',
          company: 'SecretSales',
          period: 'Aug 2017 – May 2018',
          description:
            'Introduccion de Docker para entornos locales y AWS ECS usando CloudFormation. Observabilidad de produccion con New Relic, CloudWatch y PagerDuty.',
        },
        {
          role: 'Systems Engineer y DevOps',
          company: 'Various',
          period: 'Apr 2012 – Aug 2017',
          description:
            'Soporte a sistemas criticos de trafico aereo (Indra UK), operacion de plataformas de datos de medios (MetaBroadcast) y pipelines CI/CD para start-ups.',
        },
      ],
    },
    more: {
      title: 'Mas sobre mi',
      items: [
        {
          title: 'Colaboraciones GenAI y start-ups',
          description:
            'Colaboracion con start-ups en herramientas internas asistidas por IA, prototipos en AWS Bedrock y pipelines serverless para orquestar prompts y embeddings.',
        },
        {
          title: 'Educacion y certificaciones',
          description:
            'AWS Solutions Architect Associate (2020). Aprendizaje continuo y aplicacion de tecnologias modernas en cloud y software.',
        },
        {
          title: 'Voluntariado',
          description:
            'Como mentor en CodeYourFuture apoyo a tecnicos emergentes con guia de proyectos, pair-programming y coaching profesional.',
        },
      ],
    },
    cta: {
      title: 'Conectemos',
      description:
        'Siempre estoy abierto a conversar sobre nuevos proyectos, ideas creativas u oportunidades para ser parte de una vision ambiciosa. Escribeme y empecemos a hablar.',
      button: 'Conectar en LinkedIn',
    },
    footer: {
      name: 'Alvaro Llamojha',
      role: 'Ingeniero DevOps y Observabilidad.',
      navTitle: 'Navegacion',
      legalTitle: 'Legal',
      connectTitle: 'Conectar',
      privacy: 'Politica de privacidad',
      terms: 'Terminos de servicio',
      location: 'Ubicado en Londres, Reino Unido. Construido con pasion y codigo.',
    },
    languageLabel: 'Idioma',
  },
};

// --- Section Components ---

const LanguageToggle: FC<{
  language: Language;
  onChange: (language: Language) => void;
  label: string;
  className?: string;
}> = ({ language, onChange, label, className }) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <span className="text-xs uppercase tracking-widest text-gray-500">{label}</span>
      <div className="flex items-center rounded-full border border-gray-700 bg-gray-900/60 p-1">
        {(['en', 'es'] as Language[]).map(lang => (
          <button
            key={lang}
            type="button"
            onClick={() => onChange(lang)}
            aria-pressed={language === lang}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
              language === lang
                ? 'bg-amber-300 text-gray-900 shadow-[0_0_10px_rgba(252,211,77,0.35)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

const Header: FC<{
  currentRoute: string;
  navLinks: NavLink[];
  language: Language;
  onLanguageChange: (language: Language) => void;
  languageLabel: string;
}> = ({ currentRoute, navLinks, language, onLanguageChange, languageLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderLink = (link: NavLink, isMobile = false) => {
    let href = '';

    const isExternalPage = link.type === 'route';
    const isOnExternalPage = ['#/projects', '#/animations', '#/article'].some(prefix =>
      currentRoute.startsWith(prefix)
    );

    if (isExternalPage) {
      href = `/#/${link.section}`;
    } else {
      href = isOnExternalPage ? `/#${link.section}` : `#${link.section}`;
    }

    const mobileProps = isMobile ? { onClick: () => setIsOpen(false) } : {};

    return (
      <a
        key={`${link.section}-${link.label}`}
        href={href}
        {...mobileProps}
        className={isMobile
          ? "text-xl text-gray-300 hover:text-amber-300 transition-colors duration-300"
          : "text-gray-300 hover:text-amber-300 transition-colors duration-300 relative group"
        }
      >
        {link.label}
        {!isMobile && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>}
      </a>
    );
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-gray-950/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          <a href="/#" className="text-2xl md:text-3xl font-bold text-amber-300 font-['Cormorant_Garamond']">Alvaro Llamojha</a>
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navLinks.map(link => renderLink(link))}
            </nav>
            <LanguageToggle language={language} onChange={onLanguageChange} label={languageLabel} />
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-amber-300">
            {isOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`transition-all duration-500 ease-in-out md:hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="flex flex-col items-center py-8 space-y-6 bg-gray-950/90">
          {navLinks.map(link => renderLink(link, true))}
          <LanguageToggle
            language={language}
            onChange={lang => {
              onLanguageChange(lang);
              setIsOpen(false);
            }}
            label={languageLabel}
            className="pt-2"
          />
        </nav>
      </div>
    </header>
  );
};

const Hero: FC<{ content: typeof copy.en.hero }> = ({ content }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-tight will-animate" style={{ animationDelay: '100ms' }}>
          {content.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-amber-300/90 max-w-2xl mx-auto mb-6 will-animate" style={{ animationDelay: '300ms' }}>
          {content.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 will-animate" style={{ animationDelay: '500ms' }}>
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 will-animate" style={{ animationDelay: '700ms' }}>
          <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-900 bg-amber-300 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)] w-full sm:w-auto">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="relative">{content.primaryCta}</span>
          </a>
          <a href="#experience" className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto">
            <span>{content.secondaryCta}</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

const CoreCompetencies: FC<{ content: typeof copy.en.competencies }> = ({ content }) => {
  const competencies = [
    { ...content.items[0], icon: <div className="w-12 h-12 bg-amber-300/10 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg></div> },
    { ...content.items[1], icon: <div className="w-12 h-12 bg-amber-300/10 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div> },
    { ...content.items[2], icon: <div className="w-12 h-12 bg-amber-300/10 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300"><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m5.64 5.64 2.12 2.12"/><path d="m16.24 16.24 2.12 2.12"/><path d="m5.64 18.36 2.12-2.12"/><path d="m16.24 7.76 2.12-2.12"/></svg></div> }
  ];

  return (
    <AnimatedSection id="skills" className="bg-gray-950/50" stagger>
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">{content.title}</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {competencies.map((prop, i) => (
          <div key={i} className="group p-8 border border-gray-800 rounded-xl transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.15)] bg-gray-900">
            <div className="flex justify-center mb-6">{prop.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-3">{prop.title}</h3>
            <p className="text-gray-400 leading-relaxed">{prop.description}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

const PublicTalks: FC<{ content: typeof copy.en.talks }> = ({ content }) => {
    const talk = {
        title: content.talkTitle,
        description: content.talkDescription,
        videoUrl: "https://www.youtube.com/watch?v=Dg2WcgMZ62Y",
        thumbnailUrl: "https://img.youtube.com/vi/Dg2WcgMZ62Y/maxresdefault.jpg"
    }

    return (
        <AnimatedSection id="talks" stagger>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">{content.title}</h2>
            <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-16">{content.subtitle}</p>
            <a href="#" className="block relative group aspect-video rounded-xl overflow-hidden border-2 border-amber-400/20 hover:border-amber-400/60 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(252,211,77,0.2)]">
                <img src={talk.thumbnailUrl} alt={talk.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                     <div className="w-20 h-20 rounded-full bg-amber-300/20 backdrop-blur-sm flex items-center justify-center text-amber-300 border border-amber-300/50 transition-all duration-300 scale-90 group-hover:scale-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-6">{talk.title}</h3>
                    <p className="text-gray-300 mt-2">{talk.description}</p>
                </div>
            </a>
        </AnimatedSection>
    );
};

const Experience: FC<{ content: typeof copy.en.experience }> = ({ content }) => {
  const jobs = content.jobs;
  return (
    <AnimatedSection id="experience" stagger className="bg-gray-950/50">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">{content.title}</h2>
      <div className="relative">
        <div className="hidden md:block absolute top-5 left-0 w-full h-px bg-gray-700/50"></div>
        <div className="absolute top-5 left-1/2 w-px h-full bg-gray-700/50 md:hidden"></div>

        <div className="grid md:grid-cols-4 gap-x-8 gap-y-16">
          {jobs.map((job, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="z-10 w-10 h-10 bg-gray-800 border-2 border-amber-300 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-amber-300">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{job.role}</h3>
              <p className="text-amber-300/80 font-semibold mb-3 text-sm">{job.company} · {job.period}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const CollaborationsAndMore: FC<{ content: typeof copy.en.more }> = ({ content }) => {
    const items = [
        { ...content.items[0], icon: <QuoteIcon className="w-8 h-8 text-amber-400/50 mb-6" /> },
        { ...content.items[1], icon: <CheckCircleIcon className="w-8 h-8 text-amber-400/50 mb-6" /> },
        { ...content.items[2], icon: <GithubIcon className="w-8 h-8 text-amber-400/50 mb-6" /> }
    ];

    return (
        <AnimatedSection stagger>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">{content.title}</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.1)]">
                        {item.icon}
                        <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const CTA: FC<{ content: typeof copy.en.cta }> = ({ content }) => (
    <AnimatedSection id="contact" className="!pt-0">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-t-2 border-amber-300/50 rounded-t-xl p-10 md:p-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-amber-300/5 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">{content.description}</p>
                <a
                    href="https://www.linkedin.com/in/llamojha/"
                    className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-semibold text-gray-900 bg-amber-300 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(252,211,77,0.6)]"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64"></span>
                    <span className="relative">{content.button}</span>
                </a>
            </div>
        </div>
    </AnimatedSection>
);

const Footer: FC<{
    currentRoute: string;
    navLinks: NavLink[];
    content: typeof copy.en.footer;
}> = ({ currentRoute, navLinks, content }) => {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 relative pt-16 pb-8 px-6 md:px-12">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8 mb-8 text-gray-400">
                    <div>
                        <h3 className="text-2xl font-bold text-amber-300 mb-4 font-['Cormorant_Garamond']">{content.name}</h3>
                        <p className="text-sm">{content.role} &copy; {new Date().getFullYear()}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">{content.navTitle}</h4>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map(link => {
                                const isExternalPage = link.type === 'route';
                                const isOnExternalPage = ['#/projects', '#/animations', '#/article'].some(prefix =>
                                  currentRoute.startsWith(prefix)
                                );
                                const href = isExternalPage
                                    ? `/#/${link.section}`
                                    : (isOnExternalPage ? `/#${link.section}` : `#${link.section}`);

                                return <li key={`${link.section}-${link.label}`}><a href={href} className="hover:text-amber-300 transition-colors">{link.label}</a></li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">{content.legalTitle}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-amber-300 transition-colors">{content.privacy}</a></li>
                            <li><a href="#" className="hover:text-amber-300 transition-colors">{content.terms}</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-4">{content.connectTitle}</h4>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-amber-300 transition-colors"><TwitterIcon /></a>
                            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-amber-300 transition-colors"><GithubIcon /></a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-amber-300 transition-colors"><LinkedinIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
                    <p>{content.location}</p>
                </div>
            </div>
        </footer>
    );
}

const BackToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-amber-400/20 backdrop-blur-sm text-amber-300 border border-amber-400/40 transition-all duration-300 hover:bg-amber-400/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-gray-950 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Go to top"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

// --- Page Components ---

const HomePage: FC<{ content: typeof copy.en }> = ({ content }) => (
  <>
    <Hero content={content.hero} />
    <Experience content={content.experience} />
    <CoreCompetencies content={content.competencies} />
    <PublicTalks content={content.talks} />
    <CollaborationsAndMore content={content.more} />
    <CTA content={content.cta} />
  </>
);

// --- Main App Component ---
export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem('language');
    return stored === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const handleHashChange = () => {
      window.scrollTo(0, 0);
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (route.startsWith('#/retro')) {
      return <RetroPage />;
    }
    if (route.startsWith('#/projects')) {
      return <PortfolioPage language={language} />;
    }
    if (route.startsWith('#/animations')) {
      return <AnimationsPage language={language} />;
    }
    if (route.startsWith('#/article')) {
      return <ArticlesPage route={route} language={language} />;
    }
    if (route.startsWith('#/podcasts')) {
      return <PodcastsPage route={route} language={language} />;
    }
    return <HomePage content={copy[language]} />;
  };

  const isRetroPage = route.startsWith('#/retro');
  const navLinks = copy[language].navLinks;
  
  return (
    <div className="text-white min-h-screen">
      {!isRetroPage && <Header
        currentRoute={route}
        navLinks={navLinks}
        language={language}
        onLanguageChange={setLanguage}
        languageLabel={copy[language].languageLabel}
      />}
      <main>
        {renderContent()}
      </main>
      {!isRetroPage && <Footer currentRoute={route} navLinks={navLinks} content={copy[language].footer}/>}
      {!isRetroPage && <BackToTopButton />}
    </div>
  );
}
