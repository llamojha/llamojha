import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { LibraryHeader } from "./library-header";

const llamojhaCss = readFileSync(join(process.cwd(), "app/llamojha.css"), "utf8");
const libraryCss = `body { padding: 0 !important; }
` + llamojhaCss;

const containerStyle: CSSProperties = {
  marginInline: "auto",
  maxInlineSize: "min(110ch, 96vw)",
  paddingInline: "clamp(var(--space-4), 4vw, var(--space-6))"
};

const colors = [
  { token: "--bg", label: "Background", usage: "Body background" },
  { token: "--surface", label: "Surface", usage: "Base cards" },
  { token: "--surface-3", label: "Surface 3", usage: "Elevated cards" },
  { token: "--text", label: "Text", usage: "Primary copy" },
  { token: "--text-muted", label: "Muted", usage: "Supporting text" },
  { token: "--accent-srgb", label: "Accent", usage: "Brand gradient" },
  { token: "--success", label: "Success", usage: "Positive states" },
  { token: "--warning", label: "Warning", usage: "Cautionary states" },
  { token: "--error", label: "Error", usage: "Destructive" },
  { token: "--info", label: "Info", usage: "Announcements" }
];

const tableRows = [
  {
    feature: "Buttons",
    details: "Primary, secondary, subtle variants with loading state",
    tokens: "--accent, --shadow-2",
    status: "Ready"
  },
  {
    feature: "Forms",
    details: "Input, select, helper, :has() validation",
    tokens: "--border, --success, --error",
    status: "Ready"
  },
  {
    feature: "Cards",
    details: "Media slot, header, actions, container queries",
    tokens: "--surface-2, --shadow-3",
    status: "Ready"
  },
  {
    feature: "Tables",
    details: "Sticky head, zebra rows, responsive reflow",
    tokens: "container-name: content",
    status: "Ready"
  }
];

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="container-content stack" style={containerStyle}>
      <header className="stack" style={{ gap: "var(--space-2)" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
        <p className="lead">{description}</p>
      </header>
      {children}
    </section>
  );
}

export const metadata: Metadata = {
  title: "llamojha.css Component Library",
  description:
    "Showcase of the llamojha.css design system — tokens, components, and utilities available for future projects."
};

export default function ComponentLibraryPage() {
  return (
    <div className="theme-dark" style={{ minHeight: "100vh", paddingBlockEnd: "var(--space-10)" }}>
      <style>{libraryCss}</style>
      <LibraryHeader containerStyle={containerStyle} />

      <main className="stack" style={{ gap: "var(--space-8)", paddingBlockStart: "var(--space-8)" }}>
        <section className="container-content" style={containerStyle}>
          <div className="hero container-content">
            <div className="stack" style={{ gap: "var(--space-4)" }}>
              <span className="eyebrow">Component library</span>
              <h1 className="hero-title">Build with confidence using llamojha.css</h1>
              <p className="hero-subtitle">
                Explore production-ready tokens, responsive layouts, and accessible UI patterns crafted for modern portfolio and
                SaaS storytelling experiences.
              </p>
              <div className="hero-cta">
                <a className="button button-primary" href="/component-library/download">
                  Download stylesheet
                </a>
                <a className="button button-secondary" href="#content">
                  Browse components
                </a>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true" />
          </div>
        </section>

        <Section
          id="foundations"
          eyebrow="Design tokens"
          title="Foundations for warm, resilient interfaces"
          description="Color, typography, spacing, and elevation primitives ensure consistent, high-contrast visuals across dark and light modes."
        >
          <div className="grid">
            {colors.map((color) => (
              <article key={color.token} className="card stack" style={{ gap: "var(--space-3)" }}>
                <div
                  aria-hidden="true"
                  style={{
                    background: `var(${color.token})`,
                    borderRadius: "var(--radius-md)",
                    blockSize: "6rem"
                  }}
                />
                <div className="stack" style={{ gap: "var(--space-2)" }}>
                  <span className="eyebrow">{color.token}</span>
                  <h3 className="h4">{color.label}</h3>
                  <p className="small">{color.usage}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="switcher" style={{ marginBlockStart: "var(--space-6)" }}>
            <article className="card stack theme-dark" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Dark mode canvas</h3>
              <p className="small">
                Default environment with AAA text contrast and glowing accent gradients for hero statements.
              </p>
              <div className="cluster">
                <span className="badge">--bg</span>
                <span className="badge">--surface-3</span>
                <span className="badge">--accent-strong</span>
              </div>
            </article>
            <article className="card stack theme-light" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Light mode canvas</h3>
              <p className="small">
                Optional override driven by the <code>.theme-light</code> class or system preferences for bright marketing moments.
              </p>
              <div className="cluster">
                <span className="badge">.theme-light</span>
                <span className="badge">color-scheme: light</span>
                <span className="badge">--text-muted</span>
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="interactions"
          eyebrow="Components"
          title="Buttons, form controls, and interactive patterns"
          description="Motion-safe hover states, visible focus rings, and generous hit areas comply with WCAG 2.2 guidance."
        >
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <div className="cluster">
              <button type="button" className="button button-primary">
                Primary action
              </button>
              <button type="button" className="button button-secondary">
                Secondary action
              </button>
              <button type="button" className="button button-subtle">
                Subtle action
              </button>
              <button type="button" className="button button-primary" data-loading="true">
                Loading state
              </button>
              <button type="button" className="button button-secondary" disabled>
                Disabled
              </button>
            </div>
            <form className="card stack" style={{ gap: "var(--space-4)" }}>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input className="input" id="name" name="name" placeholder="Alex Morgan" required />
                <p className="field-helper">Required for personalised outreach.</p>
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="hello@"
                  required
                />
                <p className="field-helper">Shows validation via :has(&lt;input:invalid&gt;).</p>
              </div>
              <div className="field">
                <label htmlFor="focus-area">Focus area</label>
                <select className="input" id="focus-area" name="focus-area" defaultValue="observability">
                  <option value="platform">Platform engineering</option>
                  <option value="observability">Observability</option>
                  <option value="genai">GenAI enablement</option>
                </select>
                <p className="field-helper">Accent-colored controls respect prefers-reduced-motion.</p>
              </div>
              <div className="cluster" style={{ alignItems: "flex-start" }}>
                <label className="cluster" style={{ gap: "var(--space-2)" }}>
                  <input type="checkbox" defaultChecked />
                  <span className="small">Email project updates</span>
                </label>
                <label className="cluster" style={{ gap: "var(--space-2)" }}>
                  <input type="radio" name="contact" defaultChecked />
                  <span className="small">Slack handoff</span>
                </label>
                <label className="cluster" style={{ gap: "var(--space-2)" }}>
                  <input type="radio" name="contact" />
                  <span className="small">Email follow-up</span>
                </label>
              </div>
              <div className="cluster">
                <button type="submit" className="button button-primary">
                  Submit brief
                </button>
                <button type="reset" className="button button-subtle">
                  Reset form
                </button>
              </div>
            </form>
          </div>
        </Section>

        <Section
          id="content"
          eyebrow="Content patterns"
          title="Narrative blocks, cards, and rich data"
          description="Structured layouts flex via container queries, keeping storytelling crisp on phones and desktops alike."
        >
          <div className="switcher">
            <article className="card stack" style={{ gap: "var(--space-4)" }}>
              <div className="card-header">
                <span className="eyebrow">Case study</span>
                <h3 className="h3">Realtime observability at global scale</h3>
                <p className="small">
                  Unified telemetry across 120+ microservices with adaptive incident command packs and proactive SLO alerts.
                </p>
              </div>
              <div className="card-media" role="img" aria-label="Screenshot placeholder">
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 214, 102, 0.4), rgba(77, 58, 12, 0.8))",
                    blockSize: "100%"
                  }}
                />
              </div>
              <div className="card-actions">
                <Link className="button button-primary" href="#">
                  View playbook
                </Link>
                <Link className="button button-secondary" href="#">
                  Download PDF
                </Link>
              </div>
            </article>
            <article className="card stack" style={{ gap: "var(--space-4)" }}>
              <div className="card-header">
                <span className="eyebrow">Testimonial</span>
                <h3 className="h3">“It feels like a platform five times the size.”</h3>
                <p className="small">
                  Balanced typography and calm shadows ensure long-form content stays readable across themes.
                </p>
              </div>
              <blockquote>
                The llamojha.css system gave us container query-ready layouts, so our onboarding hero, metrics, and customer logos all
                snapped into place without hand-authored breakpoints.
              </blockquote>
              <div className="cluster">
                <span className="badge badge-success">AA 4.5:1+</span>
                <span className="badge badge-warning">Motion guarded</span>
              </div>
            </article>
          </div>

          <div className="card stack container-content" style={{ gap: "var(--space-5)" }}>
            <div className="stack" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Component status matrix</h3>
              <p className="small">
                Sticky headers, zebra rows, and data-label fallbacks keep tables accessible when the container shrinks below 40rem.
              </p>
            </div>
            <div className="container-content" style={{ overflowX: "auto" }}>
              <table className="table" role="grid">
                <thead>
                  <tr>
                    <th scope="col">Component</th>
                    <th scope="col">Details</th>
                    <th scope="col">Tokens</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.feature}>
                      <td data-label="Component">{row.feature}</td>
                      <td data-label="Details">{row.details}</td>
                      <td data-label="Tokens">{row.tokens}</td>
                      <td data-label="Status">
                        <span className="badge badge-success">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <pre>
              <code>{`@layer components {
  .button-primary {
    background: linear-gradient(135deg, var(--accent-srgb), var(--accent-strong-srgb));
    box-shadow: var(--shadow-2);
  }
}`}</code>
              <button type="button" className="code-copy small" aria-label="Copy code snippet">
                Copy
              </button>
            </pre>
          </div>
        </Section>

        <Section
          id="utilities"
          eyebrow="Utilities"
          title="Layout helpers and semantic badges"
          description="Stack, cluster, switcher, and grid utilities compose complex views with token-driven spacing."
        >
          <div className="switcher">
            <div className="card stack" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Stack</h3>
              <p className="small">Vertical rhythm using the 8pt spacing scale.</p>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="badge">.stack</span>
                <span className="badge">.mt-4</span>
                <span className="badge">.gap-3</span>
              </div>
            </div>
            <div className="card stack" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Cluster</h3>
              <p className="small">Inline grouping with wrap support and even spacing.</p>
              <div className="cluster">
                <span className="badge">Logs</span>
                <span className="badge badge-success">Metrics</span>
                <span className="badge badge-warning">Traces</span>
                <span className="badge badge-error">Incidents</span>
              </div>
            </div>
            <div className="card stack" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Switcher</h3>
              <p className="small">Auto two-column layout when the container exceeds 40rem.</p>
              <div className="switcher">
                <div className="card" style={{ padding: "var(--space-4)" }}>
                  <span className="small">Left pane</span>
                </div>
                <div className="card" style={{ padding: "var(--space-4)" }}>
                  <span className="small">Right pane</span>
                </div>
              </div>
            </div>
            <div className="card stack" style={{ gap: "var(--space-3)" }}>
              <h3 className="h4">Alerts</h3>
              <p className="small">Semantic colors tuned for AA contrast.</p>
              <div className="stack" style={{ gap: "var(--space-3)" }}>
                <div className="alert alert-info">
                  <h4 className="h5">Info toast</h4>
                  <p className="small">Surface release notes or product tips without overwhelming content.</p>
                </div>
                <div className="alert alert-error">
                  <h4 className="h5">Error alert</h4>
                  <p className="small">Guides users toward remediation with color, iconography, and concise messaging.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
