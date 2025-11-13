export type PortfolioProject = {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  miniSitePath?: string;
};

export const portfolioProjects: PortfolioProject[] = [];

export const findPortfolioProject = (slug: string) =>
  portfolioProjects.find((project) => project.slug === slug);
