import React, { FC, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedSection } from "./AnimatedSection";

export type Language = "en" | "es";

interface BaseArticle {
  slug: string;
  date: { en: string; es: string };
  readTime: { en: string; es: string };
  title: { en: string; es: string };
  summary: { en: string; es: string };
  thumbnail?: string;
}

interface MarkdownArticle extends BaseArticle {
  type: "markdown";
}

interface PdfArticle extends BaseArticle {
  type: "pdf";
  pdfUrl: string;
  downloadUrl?: string;
  source?: { en: string; es: string };
}

interface ExternalArticle extends BaseArticle {
  type: "external";
  externalUrl: string;
  source?: { en: string; es: string };
}

interface SlidesArticle extends BaseArticle {
  type: "slides";
  embedUrl: string;
  downloadUrl?: string;
  source?: { en: string; es: string };
}

type Article = MarkdownArticle | PdfArticle | ExternalArticle | SlidesArticle;

type Props = {
  route: string;
  language: Language;
};

const labels = {
  en: {
    title: "Articles",
    subtitle: "Notes, guides, and playbooks from the field.",
    backToList: "Back to articles",
    readTimeLabel: "Read time",
    notFoundTitle: "Article not found",
    notFoundBody:
      "The link might be outdated. Head back to the article list to keep exploring.",
    notFoundCta: "View all articles",
  },
  es: {
    title: "Articulos",
    subtitle: "Notas, guias y playbooks desde el campo.",
    backToList: "Volver a los articulos",
    readTimeLabel: "Tiempo de lectura",
    notFoundTitle: "Articulo no encontrado",
    notFoundBody:
      "El enlace puede estar desactualizado. Vuelve a la lista para seguir explorando.",
    notFoundCta: "Ver todos los articulos",
  },
};

const getNodeText = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node))
    return getNodeText((node.props as { children?: React.ReactNode }).children);
  return "";
};

// GitHub-style slug so in-document anchor links (e.g. a TOC) resolve to headings.
const slugify = (node: React.ReactNode): string =>
  getNodeText(node)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");

const markdownComponents = {
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2
      id={slugify(children)}
      className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3
      id={slugify(children)}
      className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 space-y-2 text-gray-300">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-6 space-y-2 text-gray-300">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-amber-300/60 pl-4 italic text-gray-300">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => {
    const isExternal = href?.startsWith("http");
    const isAnchor = href?.startsWith("#");
    return (
      <a
        href={href}
        // In-page anchors (TOC) must scroll without changing the hash, which
        // drives the app router (App.tsx) and would otherwise leave the article.
        onClick={
          isAnchor
            ? (event) => {
                event.preventDefault();
                const raw = href!.slice(1);
                const target =
                  document.getElementById(raw) ||
                  document.getElementById(decodeURIComponent(raw));
                target?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            : undefined
        }
        className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  code: ({
    inline,
    children,
  }: {
    inline?: boolean;
    children: React.ReactNode;
  }) =>
    inline ? (
      <code className="bg-gray-900/70 border border-gray-800 rounded px-1.5 py-0.5 text-amber-200 text-sm">
        {children}
      </code>
    ) : (
      <code className="text-amber-200 text-sm">{children}</code>
    ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto">
      {children}
    </pre>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-800 text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-900 text-gray-200">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="text-gray-300">{children}</tbody>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-gray-800 px-3 py-2 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-800 px-3 py-2 align-top">{children}</td>
  ),
  hr: () => <hr className="border-gray-800" />,
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
};

function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/articles/articles.json")
      .then((r) => r.json())
      .then((data) => setArticles(data.articles))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading };
}

function useMarkdownBody(slug: string | undefined, language: Language, type: string | undefined) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug || type !== "markdown") {
      setBody("");
      return;
    }
    setLoading(true);
    fetch(`/articles/${slug}/${language}.md`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.text();
      })
      .then(setBody)
      .catch(() => setBody(""))
      .finally(() => setLoading(false));
  }, [slug, language, type]);

  return { body, loading };
}

export const ArticlesPage: FC<Props> = ({ route, language }) => {
  const slug = route.replace(/^#\/article\/?/, "").trim();
  const { articles, loading: manifestLoading } = useArticles();
  const article = slug ? articles.find((item) => item.slug === slug) : undefined;
  const { body: markdownBody, loading: bodyLoading } = useMarkdownBody(
    slug || undefined,
    language,
    article?.type
  );
  const copy = labels[language];

  if (manifestLoading) {
    return (
      <AnimatedSection id="article" stagger>
        <div className="pt-20 text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </AnimatedSection>
    );
  }

  if (slug && !article) {
    return (
      <AnimatedSection id="article" stagger>
        <div className="pt-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {copy.notFoundTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {copy.notFoundBody}
          </p>
          <a
            href="/#/article"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-900 bg-amber-300 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)]"
          >
            {copy.notFoundCta}
          </a>
        </div>
      </AnimatedSection>
    );
  }

  if (article) {
    return (
      <AnimatedSection id="article" stagger>
        <div className="pt-20 max-w-3xl mx-auto">
          <a
            href="/#/article"
            className="text-amber-300 hover:text-amber-200 transition-colors text-sm"
          >
            {copy.backToList}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-3">
            {article.title[language]}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-gray-500 mb-8">
            <span>{article.date[language]}</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-amber-300/60"
              aria-hidden
            />
            <span>
              {copy.readTimeLabel}: {article.readTime[language]}
            </span>
          </div>
          <p className="text-lg text-gray-300 mb-8">
            {article.summary[language]}
          </p>
          {article.type === "slides" ? (
            <div className="space-y-6">
              <iframe
                src={article.embedUrl}
                className="w-full rounded-lg border border-gray-800 bg-gray-950"
                style={{ height: "80vh" }}
                title={article.title[language]}
                allow="fullscreen"
                allowFullScreen
              />
              <div className="flex flex-wrap gap-4">
                <a
                  href={article.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 bg-amber-300 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)]"
                >
                  ⛶ {language === "en" ? "Open fullscreen" : "Abrir en pantalla completa"}
                </a>
                {article.downloadUrl && (
                  <a
                    href={article.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-300 border border-amber-300/40 rounded-full transition-all duration-300 hover:bg-amber-300/10"
                  >
                    ⬇ {language === "en" ? "Download PPTX" : "Descargar PPTX"}
                  </a>
                )}
              </div>
            </div>
          ) : article.type === "pdf" ? (
            <div className="space-y-6">
              <iframe
                src={article.pdfUrl}
                className="w-full rounded-lg border border-gray-800"
                style={{ height: "80vh" }}
                title={article.title[language]}
              />
              {article.downloadUrl && (
                <a
                  href={article.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 bg-amber-300 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)]"
                >
                  ⬇ {language === "en" ? "Download PPTX" : "Descargar PPTX"}
                </a>
              )}
            </div>
          ) : bodyLoading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <div className="space-y-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {markdownBody}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="article" stagger>
      <div className="pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {copy.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          {copy.subtitle}
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => {
          const isExternal = item.type === "external";
          return (
            <a
              key={item.slug}
              href={
                isExternal
                  ? (item as ExternalArticle).externalUrl
                  : `/#/article/${item.slug}`
              }
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.12)]"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title[language]}
                  className="w-full rounded-lg mb-4 object-cover"
                />
              )}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 mb-3">
                <span>{item.date[language]}</span>
                {"source" in item && item.source && (
                  <span className="text-amber-300/80">
                    {item.source[language] || "External"}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-200 transition-colors">
                {item.title[language]}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {item.summary[language]}
              </p>
              <div className="text-xs uppercase tracking-widest text-amber-300/80">
                {copy.readTimeLabel}: {item.readTime[language]}
              </div>
            </a>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default ArticlesPage;
