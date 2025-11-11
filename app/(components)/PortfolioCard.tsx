import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolios";

export type PortfolioCardProps = {
  project: PortfolioProject;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.35)]">
      <header className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        {project.summary ? (
          <p className="text-sm text-slate-300/90">{project.summary}</p>
        ) : null}
      </header>
      {project.tags?.length ? (
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-3">
        <Link href="/portfolio" className="text-sm font-semibold text-[var(--accent)] transition hover:text-white">
          View details
        </Link>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400/70">Coming soon</span>
      </div>
    </article>
  );
}
