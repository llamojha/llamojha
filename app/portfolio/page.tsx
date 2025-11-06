import Link from "next/link";
import { PortfolioCard } from "@/app/(components)/PortfolioCard";
import { portfolioProjects } from "@/data/portfolios";

export default function PortfolioPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16 lg:px-12">
      <header className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-faint)]">Selected work</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Portfolio</h1>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 transition hover:border-[var(--accent)] hover:text-white sm:inline-flex"
          >
            ← Back
          </Link>
        </div>
        <p className="max-w-3xl text-base text-slate-200/90 sm:text-lg">
          A dedicated look at recent engineering programmes will appear here soon. The structure is in place and projects will be
          published as they are ready to share.
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        {portfolioProjects.length ? (
          portfolioProjects.map((project) => <PortfolioCard key={project.slug} project={project} />)
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-300">
            Portfolio entries are coming soon. Check back shortly to explore the full case studies.
          </div>
        )}
      </section>
    </main>
  );
}
