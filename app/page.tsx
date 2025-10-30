"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  education,
  experience,
  expertise,
  interests,
  profile,
  talks,
  volunteering
} from "@/data/profile";

type ContactButtonProps = {
  motionEnabled: boolean;
};

const ContactButton = ({ motionEnabled }: ContactButtonProps) => (
  <Link
    href={profile.callToAction.href}
    data-animate-on-scroll={motionEnabled ? "cta" : undefined}
    className="contact-button inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#1f1503] shadow-lg shadow-[0_18px_40px_var(--accent-shadow)] transition"
  >
    {profile.callToAction.label}
    <ArrowUpRightIcon className="h-4 w-4" />
  </Link>
);

export default function HomePage() {
  const [motionEnabled, setMotionEnabled] = useState<boolean | null>(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setMotionEnabled(!mediaQuery.matches);
    };

    updateMotionPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);
    } else {
      mediaQuery.addListener(updateMotionPreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      } else {
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (motionEnabled === null) {
      return;
    }

    if (!motionEnabled) {
      setHeroReady(true);
      return;
    }

    setHeroReady(false);
    const raf = window.requestAnimationFrame(() => setHeroReady(true));

    return () => window.cancelAnimationFrame(raf);
  }, [motionEnabled]);

  useEffect(() => {
    if (motionEnabled === null) {
      return;
    }

    if (!motionEnabled) {
      const elements = document.querySelectorAll<HTMLElement>("[data-animate-on-scroll]");
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10%"
      }
    );

    const elements = document.querySelectorAll<HTMLElement>("[data-animate-on-scroll]");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [motionEnabled]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: "https://amllamojha.com",
    email: "mailto:hello@amllamojha.com",
    sameAs: [
      "https://www.linkedin.com/in/alvarollamojha",
      "https://github.com/llamojha",
      "https://twitter.com/llamojha"
    ]
  };

  const heroSpotlights = [
    {
      title: "Black Friday command centre",
      description: "New Relic dashboards that let JD Sports teams spot Black Friday spikes and act before incidents escalated.",
      metric: "Black Friday 2022 peak trading support"
    },
    {
      title: "Serverless delivery foundations",
      description: "Node.js and TypeScript microservices with GitHub Actions pipelines moving LEGO.com from weekly drops to daily canary releases.",
      metric: "GitHub Actions workflows for the LEGO.com monorepo"
    }
  ];

  return (
    <>
      <Script type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 lg:px-12">
        <nav className="hero-nav flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300/70 backdrop-blur">
          <span className="hero-logo">amllamojha.com</span>
          <div className="flex items-center gap-4 text-[0.7rem] tracking-[0.35em]">
            <Link href="#expertise" className="hero-nav-link">
              Expertise
            </Link>
            <Link href="#experience" className="hero-nav-link">
              Experience
            </Link>
            <Link href={profile.callToAction.href} className="hero-nav-cta">
              Let’s talk
            </Link>
          </div>
        </nav>
        <header className="gradient-border rounded-[2.5rem] bg-white/5 p-[1px]">
          <div
            className={`card relative isolate overflow-hidden rounded-[2.45rem] border-white/10 bg-slate-950/60 px-8 py-12 sm:px-12 lg:px-16 hero-card ${
              heroReady ? "is-visible" : ""
            }`}
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.32),transparent_60%)]" />
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(102,76,14,0.25),transparent_65%)]" />
            <div className="hero-glow" aria-hidden />
            <div className="hero-motion-layer" aria-hidden />
            <div className="hero-motion-grid" aria-hidden />
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-8">
                <div className="space-y-4">
                  <span className="hero-badge">Observability-first DevOps leadership</span>
                  <div className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {profile.name}
                    </h1>
                    <p className="hero-subtitle text-lg font-medium text-slate-200/90 sm:text-xl">{profile.title}</p>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400/80">{profile.location}</p>
                  </div>
                </div>
                <p className="max-w-xl text-base text-slate-200/90 sm:text-lg">{profile.summary}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {profile.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className="tag"
                      data-animate-on-scroll={motionEnabled ? "badge" : undefined}
                      style={motionEnabled ? { transitionDelay: `${index * 0.08}s` } : undefined}
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <ContactButton motionEnabled={motionEnabled ?? false} />
                  <Link
                    href="#experience"
                    className="hero-secondary-link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-faint)]"
                  >
                    View track record
                    <ArrowUpRightIcon className="h-3 w-3" />
                  </Link>
                </div>
                <div className="hero-impact-grid">
                  {profile.impact.map((metric, index) => (
                    <div
                      key={metric.label}
                      className="hero-impact-card"
                      data-animate-on-scroll={motionEnabled ? "metric" : undefined}
                      style={motionEnabled ? { transitionDelay: `${index * 0.1}s` } : undefined}
                    >
                      <span className="hero-impact-value">{metric.value}</span>
                      <span className="hero-impact-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-visual-orb" aria-hidden />
                {heroSpotlights.map((spotlight, index) => (
                  <div
                    key={spotlight.title}
                    className="hero-spotlight"
                    data-animate-on-scroll={motionEnabled ? "spotlight" : undefined}
                    style={motionEnabled ? { transitionDelay: `${index * 0.12}s` } : undefined}
                  >
                    <p className="hero-spotlight-title">{spotlight.title}</p>
                    <p className="hero-spotlight-description">{spotlight.description}</p>
                    <span className="hero-spotlight-metric">{spotlight.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

      <section className="resume-grid">
        <div className="space-y-8">
          <div className="card" id="expertise">
            <h2 className="section-title">Expertise</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {expertise.map((item, index) => (
                <li
                  key={item}
                  className="expertise-item rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100/90"
                  data-animate-on-scroll={motionEnabled ? "expertise" : undefined}
                  style={motionEnabled ? { transitionDelay: `${index * 0.1}s` } : undefined}
                >
                  <span aria-hidden className="expertise-glyph" />
                  <span className="expertise-label">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="section-title">Talks & Media</h2>
            <ul className="space-y-6">
              {talks.map((talk) => (
                <li key={`${talk.title}-${talk.year}`} className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    {talk.title}
                    {talk.url && (
                      <Link
                        href={talk.url}
                        className="interactive-link ml-2 inline-flex items-center text-xs font-normal text-[var(--accent-faint)]"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch
                        <ArrowUpRightIcon className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300/80">
                    {talk.event} · {talk.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="section-title">Volunteering</h2>
            <ul className="space-y-5">
              {volunteering.map((item) => (
                <li key={item.name}>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-300/90">{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card card-muted">
            <h2 className="section-title text-slate-200">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="tag"
                  data-animate-on-scroll={motionEnabled ? "badge" : undefined}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card space-y-12">
          <div id="experience">
            <h2 className="section-title">Experience</h2>
            <div className="relative timeline">
              {experience.map((item, index) => (
                <article
                  key={`${item.company}-${item.role}`}
                  className="timeline-item experience-card"
                  data-animate-on-scroll={motionEnabled ? "experience" : undefined}
                  style={motionEnabled ? { transitionDelay: `${index * 0.12}s` } : undefined}
                >
                  <span aria-hidden className="experience-arrow" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.role}
                        <span className="block text-base font-normal text-slate-200/90">
                          {item.company}
                        </span>
                      </h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
                        {item.location} · {item.timeframe}
                      </p>
                    </div>
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="interactive-link inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-faint)]"
                      >
                        Visit
                        <ArrowUpRightIcon className="h-3 w-3" />
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm text-slate-200/90">{item.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-1 block h-1 w-1 rounded-full bg-amber-300" aria-hidden />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">Education</h2>
            <ul className="space-y-4 text-sm text-slate-200/90">
              {education.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300/80">{item.institution}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400/80">{item.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="pb-10">
        <div className="card flex flex-col items-start gap-6 rounded-[2rem] border-white/5 bg-white/5 p-10 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400/80">Let's collaborate</p>
            <p className="mt-2 text-lg font-semibold text-white">
              Have a platform reliability challenge? Alvaro Llamojha is available for consulting and advisory conversations.
            </p>
          </div>
          <ContactButton motionEnabled={motionEnabled ?? false} />
        </div>
      </footer>
      </main>
    </>
  );
}
