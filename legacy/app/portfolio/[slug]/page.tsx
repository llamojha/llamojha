import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPortfolioProject, portfolioProjects } from "@/data/portfolios";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findPortfolioProject(params.slug);

  if (!project) {
    return {
      title: "Portfolio project coming soon"
    };
  }

  return {
    title: `${project.title} — Portfolio`
  };
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = findPortfolioProject(params.slug);

  if (!project) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-16 lg:px-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-faint)]">Portfolio</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Case study coming soon</h1>
        </header>
        <p className="max-w-2xl text-sm text-slate-200/90 sm:text-base">
          This portfolio project has not been published yet. Please return to the main portfolio hub to browse available work or
          check back shortly for the full write-up.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 transition hover:border-[var(--accent)] hover:text-white"
        >
          ← Back to portfolio
        </Link>
      </main>
    );
  }

  return notFound();
}
