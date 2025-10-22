import Link from "next/link";
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

const ContactButton = () => (
  <Link
    href={profile.callToAction.href}
    className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-400/50"
  >
    {profile.callToAction.label}
    <ArrowUpRightIcon className="h-4 w-4" />
  </Link>
);

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 lg:px-12">
      <header className="gradient-border rounded-[2.5rem] bg-white/5 p-[1px]">
        <div className="card relative isolate overflow-hidden rounded-[2.45rem] border-white/10 bg-slate-950/60 px-8 py-12 sm:px-12 lg:px-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.35),transparent_55%)]" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(79,101,170,0.25),transparent_60%)]" />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-300/80">DevOps Leadership</p>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {profile.name}
                </h1>
                <p className="text-lg font-medium text-slate-200/90 sm:text-xl">{profile.title}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400/80">{profile.location}</p>
              </div>
              <p className="max-w-xl text-base text-slate-200/90 sm:text-lg">{profile.summary}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {profile.highlights.map((highlight) => (
                  <li key={highlight} className="tag">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <ContactButton />
          </div>
        </div>
      </header>

      <section className="resume-grid">
        <div className="space-y-8">
          <div className="card">
            <h2 className="section-title">Expertise</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {expertise.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100/90">
                  {item}
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
                        className="ml-2 inline-flex items-center text-xs font-normal text-sky-200/80 hover:text-sky-100"
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
                <span key={interest} className="tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card space-y-12">
          <div>
            <h2 className="section-title">Experience</h2>
            <div className="relative timeline">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="timeline-item">
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
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200/80 hover:text-sky-100"
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
                        <span className="mt-1 block h-1 w-1 rounded-full bg-sky-300" aria-hidden />
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
              Have a platform reliability challenge? Alvaro is available for consulting and advisory conversations.
            </p>
          </div>
          <ContactButton />
        </div>
      </footer>
    </main>
  );
}
