import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedSection } from "./AnimatedSection";

export type Language = "en" | "es";

type ArticleCopy = {
  title: string;
  summary: string;
  body: string;
};

type Article = {
  slug: string;
  date: { en: string; es: string };
  readTime: { en: string; es: string };
  content: { en: ArticleCopy; es: ArticleCopy };
  externalUrl?: string;
  source?: { en: string; es: string };
  thumbnail?: string;
  pdfUrl?: string;
  downloadUrl?: string;
};

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

const markdownComponents = {
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3">
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
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
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

const articles: Article[] = [
  {
    slug: "kiro-context-engineering",
    date: { en: "Mar 19, 2026", es: "19 Mar 2026" },
    readTime: { en: "Slides", es: "Diapositivas" },
    thumbnail: "/kiro-context-engineering-preview.png",
    pdfUrl: "/kiro-context-engineering.pdf",
    downloadUrl: "/kiro-context-engineering.pptx",
    source: { en: "Presentation", es: "Presentación" },
    content: {
      en: {
        title: "Kiro Context Engineering",
        summary:
          "A presentation on context engineering with Kiro — steering files, specs, and hooks for AI-assisted development.",
        body: "",
      },
      es: {
        title: "Kiro Context Engineering",
        summary:
          "Una presentación sobre ingeniería de contexto con Kiro — archivos de dirección, specs y hooks para desarrollo asistido por IA.",
        body: "",
      },
    },
  },
  {
    slug: "aws-builders-como-sacar-maximo-partido-kiro",
    date: { en: "Mar 16, 2026", es: "16 Mar 2026" },
    readTime: { en: "10 min", es: "10 min" },
    externalUrl:
      "https://dev.to/aws-builders/como-sacar-el-maximo-partido-a-kiro-4i00",
    source: { en: "Dev.to", es: "Dev.to" },
    content: {
      en: {
        title: "How to Get the Most Out of Kiro",
        summary:
          "A deep dive into Kiro's ecosystem — steerings, hooks, MCPs, powers, agents, and how they all fit together.",
        body: "",
      },
      es: {
        title: "Cómo sacar el máximo partido a Kiro",
        summary:
          "Un recorrido por el ecosistema de Kiro — steerings, hooks, MCPs, powers, agentes y cómo encajan todas las piezas.",
        body: "",
      },
    },
  },
  {
    slug: "aws-builders-nova-agent-manager",
    date: { en: "Feb 10, 2026", es: "10 Feb 2026" },
    readTime: { en: "5 min", es: "5 min" },
    externalUrl:
      "https://builder.aws.com/content/39TlwWxgPcIawL93p5UAcE0vSjT/nova-agent-manager-interface-a-nova-powered-command-centre-for-coding-agents",
    source: { en: "AWS Community", es: "AWS Community" },
    content: {
      en: {
        title: "Nova Agent Manager Interface",
        summary:
          "A Nova-powered command centre for coding agents — managing and orchestrating AI agents from a single interface.",
        body: "",
      },
      es: {
        title: "Nova Agent Manager Interface",
        summary:
          "Un centro de mando impulsado por Nova para agentes de código — gestionando y orquestando agentes de IA desde una sola interfaz.",
        body: "",
      },
    },
  },
  {
    slug: "devto-kiro-cli-raspberry-pi-400",
    date: { en: "Jan 15, 2026", es: "15 Ene 2026" },
    readTime: { en: "4 min", es: "4 min" },
    externalUrl:
      "https://dev.to/kirodotdev/running-kiro-cli-from-a-raspberry-pi-400-4d2h",
    source: { en: "Dev.to", es: "Dev.to" },
    content: {
      en: {
        title: "Running Kiro CLI from a Raspberry Pi 400",
        summary:
          "Setting up and running Kiro CLI on a Raspberry Pi 400 — from SIGILL crashes to a working ARM64 setup.",
        body: "",
      },
      es: {
        title: "Ejecutando Kiro CLI desde una Raspberry Pi 400",
        summary:
          "Configurando y ejecutando Kiro CLI en una Raspberry Pi 400 — desde errores SIGILL hasta una instalación ARM64 funcional.",
        body: "",
      },
    },
  },
  {
    slug: "devto-stop-vibecoding-ai-monoliths",
    date: { en: "Jan 5, 2026", es: "5 Ene 2026" },
    readTime: { en: "4 min", es: "4 min" },
    externalUrl: "https://dev.to/llamojha/stop-vibecoding-ai-monoliths-295g",
    source: { en: "Dev.to", es: "Dev.to" },
    content: {
      en: {
        title: "Stop Vibecoding AI Monoliths",
        summary:
          "A practical take on avoiding AI-driven monoliths by structuring work into smaller, reusable pieces.",
        body: "",
      },
      es: {
        title: "Deten los monolitos de IA por vibe coding",
        summary:
          "Una guia practica para evitar monolitos de IA y volver a piezas pequenas y reutilizables.",
        body: "",
      },
    },
  },
  {
    slug: "devto-posthog-observability",
    date: { en: "Dec 18, 2025", es: "18 Dic 2025" },
    readTime: { en: "5 min", es: "5 min" },
    externalUrl:
      "https://dev.to/kirodotdev/building-my-first-kiro-power-posthog-observability-fik",
    source: { en: "Dev.to", es: "Dev.to" },
    content: {
      en: {
        title: "Building My First Kiro: Power PostHog Observability",
        summary: "A build log on wiring observability workflows with PostHog.",
        body: "",
      },
      es: {
        title: "Construyendo mi primer Kiro: observabilidad con PostHog",
        summary:
          "Registro de construccion sobre workflows de observabilidad con PostHog.",
        body: "",
      },
    },
  },
  {
    slug: "devto-no-vibe-no-code",
    date: { en: "Dec 3, 2025", es: "3 Dic 2025" },
    readTime: { en: "6 min", es: "6 min" },
    externalUrl:
      "https://dev.to/kirodotdev/no-vibe-no-code-bootstrapping-ideas-o88",
    source: { en: "Dev.to", es: "Dev.to" },
    content: {
      en: {
        title: "No Vibe No Code: Bootstrapping Ideas",
        summary:
          "How the idea for No Vibe No Code took shape, from concept to execution.",
        body: "",
      },
      es: {
        title: "No Vibe No Code: ideas para bootstrapping",
        summary:
          "Como nacio la idea de No Vibe No Code, desde el concepto hasta la ejecucion.",
        body: "",
      },
    },
  },
  {
    slug: "serverless-migrations",
    date: { en: "Oct 21, 2025", es: "21 Oct 2025" },
    readTime: { en: "4 min", es: "4 min" },
    content: {
      en: {
        title:
          "From vibe coding to specs: how I started shipping bigger changes with Kiro",
        summary:
          "Why vibe coding breaks at scale, how specs fixed the drift, and the workflow that made Kiro practical.",
        body: `## My "vibe coding" phase

I started vibe coding the way most of us do: I wanted momentum. I used AI mostly to revive projects I had never finished and to build a simple survival-style game. Small scope, quick feedback, instant dopamine. It was straightforward and it did the job.

In that mode, the workflow is basically: *idea -> prompt -> code -> tweak -> ship*. And honestly, for tiny games and "weekend projects," it is a cheat code. You are not optimizing for perfect architecture, you are optimizing for getting something alive.

But there is a trap: vibe coding feels so good that you try to use it everywhere, even when the project stops being small.

## The breaking point: complexity makes AI drift

The moment I moved into "real app" territory, full websites with a backend, database, auth, the whole stack, I hit friction. Not because AI is useless, but because the lack of planning becomes the plan.

At that scale, I started losing context. The tool would do *something*, sometimes even impressive, but not always what I actually wanted. Diffs got bigger, changes got fuzzier, and I found myself figuring out what the project is while building the project.

When the repo is big, AI can get distracted. It drifts. And drift is expensive.

So I naturally fell back to something very boring. Very engineering. Very works in production.

## The shift: Spec-Driven Development

At some point I realized: as software engineers, we already have a system for "big changes without chaos."

We do sprint planning. We curate tickets. We write acceptance criteria. We break work down. We review. We ship. Same concept.

So I started doing that with AI work too: instead of "one big prompt," I would create "tickets" (or docs) that contained the context and acceptance criteria, then work through them one by one. Each small step had a clear definition of done, and I could verify progress without praying that the agent got the vibe.

Later, I learned this approach has a name: **Spec-Driven Development** - using a well-crafted spec as the source of truth for what gets built (often with AI agents helping implement it).

Here is the simplest version of the spec I ended up using:

- **Goal** (what we are trying to achieve)
- **Non-goals** (what we are explicitly not doing)
- **Acceptance criteria** (how we know it is done)
- **Plan** (small tasks with clear "done")
- **Risks** (and how we will mitigate them)

That is it. Not bureaucracy. Just enough structure so the AI does not freestyle in your codebase.

## Why Kiro made it practical

This is where Kiro clicked for me.

Kiro is positioned as an agentic IDE that brings *structure* to AI coding through specs, tasks, and automation hooks. Basically: it helps you move from prototype energy to production habits.

And the big thing: it is not black magic. It is a workflow.

What I do in practice looks like this:

1. **Start from a GitHub issue / ticket**
   I have been writing issues like I normally would (context + acceptance criteria), then asking Kiro to pull that context and turn it into a spec. (PM-me writes the spec; Kiro helps scaffold the execution.)

2. **Turn spec -> tasks -> PR**
   Once the spec is clear, tasks become small and verifiable. That keeps diffs coherent and PRs reviewable - because you are not letting the agent "boil the ocean."

3. **Use guardrails so the agent cannot go rogue**
   My personal rule stays the same: **the agent proposes; I accept with tests.**

4. **Bonus: AWS ecosystem fit (especially infra work)**
   In my world, the AWS angle matters. Kiro has "powers" and integrations that can load specialized context - like an AWS CDK power for infrastructure work - so you are not re-explaining everything every time.

If you want to explore the broader ecosystem around this workflow (beyond Kiro), two useful references:
- **Kiro**: https://kiro.dev/
- **Spec-Driven Development** (overview with Kiro): https://kiro.dev/blog/kiro-and-the-future-of-software-development/
- **OpenSpec**: https://openspec.dev

My takeaway: vibe coding is amazing for starting. Specs are how you finish, especially when the project is bigger than your short-term memory. Kiro keeps the loop practical and concrete, not process for its own sake.

**"Stop chasing better prompts. Write a better spec."**`,
      },
      es: {
        title:
          "De vibe coding a specs: como empece a entregar cambios mas grandes con Kiro",
        summary:
          "Por que el vibe coding se rompe a escala, como los specs reducen el drift y el flujo que hizo Kiro practico.",
        body: `## Mi fase de "vibe coding"

Empece con vibe coding como casi todos: queria momentum. Use AI para revivir proyectos que nunca termine y para construir un juego sencillo tipo survival. Alcance pequeno, feedback rapido, dopamina instantanea. Funcionaba y cumplia.

En ese modo, el flujo es: *idea -> prompt -> code -> tweak -> ship*. Para juegos chicos y proyectos de fin de semana, es un cheat code. No optimizas arquitectura perfecta; optimizas que algo viva.

Pero hay una trampa: vibe coding se siente tan bien que intentas usarlo para todo... incluso cuando el proyecto deja de ser pequeno.

## El punto de quiebre: la complejidad hace que el AI derive

Cuando pase a "apps reales", sitios completos con backend, base de datos, auth, todo el stack, aparecio la friccion. No porque el AI sea inutil, sino porque la falta de planning se vuelve el plan.

A esa escala empece a perder contexto. La herramienta hacia *algo*, a veces impresionante, pero no siempre lo que yo queria. Los diffs crecian, los cambios se volvían difusos y yo iba descubriendo de que era el proyecto mientras lo construia.

Cuando el repo es grande, el AI se distrae. Deriva. Y la deriva es cara.

Asi que volvi a algo muy aburrido. Muy engineering. Muy de "funciona en prod".

## El cambio: Spec-Driven Development

En algun punto me di cuenta: como ingenieros ya tenemos un sistema para "cambios grandes sin caos".

Hacemos sprint planning. Curamos tickets. Escribimos acceptance criteria. Partimos el trabajo. Revisamos. Shipeamos. El mismo concepto.

Asi que empece a hacer eso con AI: en lugar de un prompt grande, creaba "tickets" (o docs) con contexto y acceptance criteria, y los iba resolviendo uno por uno. Cada paso tenia una definicion clara de done, y yo podia verificar progreso sin rezar para que el agente "entienda la vibra".

Despues supe que este enfoque tiene nombre: **Spec-Driven Development** - usar un spec bien armado como fuente de verdad de lo que se va a construir (muchas veces con agentes AI ayudando a implementarlo).

Esta es la version mas simple del contrato de spec que termine usando:

- **Goal** (lo que queremos lograr)
- **Non-goals** (lo que explicitamente no vamos a hacer)
- **Acceptance criteria** (como sabemos que esta listo)
- **Plan** (tareas chicas con "done" claro)
- **Risks** (y como mitigarlos)

Eso es todo. No es burocracia. Es estructura suficiente para que el AI no improvise en tu codebase.

## Por que Kiro lo hizo practico

Aqui fue donde Kiro hizo click.

Kiro es un IDE agentico que trae *estructura* al coding con AI mediante specs, tasks y hooks de automatizacion. En pocas palabras: ayuda a pasar de energia de prototipo a habitos de produccion.

Y lo grande: no es magia negra. Es un workflow.

Lo que hago en la practica se ve asi:

1. **Arranco de un issue / ticket de GitHub**
   Escribo issues como siempre (contexto + acceptance criteria), y le pido a Kiro que convierta ese contexto en un spec. (El PM interno escribe el contrato; Kiro ayuda a ejecutar.)

2. **Spec -> tasks -> PR**
   Cuando el spec esta claro, las tareas se vuelven chicas y verificables. Eso mantiene los diffs coherentes y los PRs revisables, porque no dejas que el agente "hierva el oceano".

3. **Guardrails para que el agente no se vaya de paseo**
   Mi regla personal sigue igual: **el agente propone; yo acepto con tests.**

4. **Bonus: encaje con el ecosistema AWS (especialmente infra)**
   En mi mundo, el angulo AWS importa. Kiro puede cargar contexto especializado, como un power de AWS CDK, para no re-explicar todo cada vez.

Si quieres explorar el ecosistema alrededor de este flujo (mas alla de Kiro), dos referencias utiles:
- **Kiro**: https://kiro.dev/
- **Spec-Driven Development** (overview / discussions): https://www.geoffreylitt.com/2024/02/16/specs.html
- **OpenSpec**: https://github.com/yaniv-golan/openspec

Mi takeaway: vibe coding es genial para empezar. Los specs son como terminas, sobre todo cuando el proyecto es mas grande que tu memoria de corto plazo. Kiro mantiene el loop practico y concreto, no proceso por proceso.

Si quieres una linea de cierre fuerte para el post, yo usaria:
**"Deja de perseguir mejores prompts. Escribe un mejor contrato."**`,
      },
    },
  },
  {
    slug: "genai-ops",
    date: { en: "Sep 3, 2025", es: "3 Sep 2025" },
    readTime: { en: "5 min", es: "5 min" },
    content: {
      en: {
        title:
          "Amplify v1 → Amplify Gen 2: why I loved v1 for hosting, why I hated it for backend, and why Gen 2 finally feels right",
        summary:
          "Why v1 nailed hosting but hurt backend management, and how Gen 2 fixes the workflow with code-first backend and sandbox environments.",
        body: `## The best thing about Amplify

"The best thing about Amplify is how easy it is to set up a site with AWS Power Services. I wanted to go all in on AWS."

That is the core of it. I have hosted sites in other places, and sure, it can be easy, but the moment you want to go deeper with AWS services, the integration story is not always there. I wanted to go full AWS without turning my personal projects into an infra project. Amplify v1 made that ridiculously simple for frontend hosting.

Frontend in v1? Smooth. Repo connected, build runs, site is live. You get that "AWS power services" feeling without needing to stitch everything yourself.

## The main pain point in v1: backend management

"The main pain point that I had with Amplify is the backend management. So on the frontend one, everything was fine, smooth, it was working fine. Backend one, DynamoDB, CognitoAuth, was a bit of a pain at the time of setting it up. It was a bit confusing on the structure, on my repository."

"and also at the time of deployment and managing. As someone with a DevOps experience, I want the experience to be as smooth as possible. I want to automate this as much as possible."

This was my experience. Hosting felt clean. Backend felt confusing.

The second you bring in DynamoDB or Cognito/Auth, the mental model in v1 starts to wobble. Where does this live? What is the source of truth? Why does my repo structure feel like I am babysitting generated artifacts and tribal knowledge?

And deployment-wise: I am picky. I do not mind opinionated tools. I do mind workflows that make automation harder than it should be. If I am going to use AWS, I want predictable environments, reproducible deploys, and a pipeline flow that does not fight me.

## What is actually different in Amplify v2 (Gen 2)

Gen 2 flips the backend experience into code-first. Instead of "configure things through a flow and hope the structure makes sense later", Gen 2 is designed around defining backend in TypeScript as part of your project.

For me, that matters because it targets the exact two things that hurt in v1:

### 1) Backend is no longer "that separate thing" — it is part of the repo, clearly

In Gen 2, backend definition lives in code. That means the backend is not a weird parallel universe; it is reviewable, diffable, and easier to reason about.

This matters because it lets me treat backend like normal code, similar to how I work with CDK. That is the DevOps end goal.

### 2) Deploy and automation get a lot more DevOps-friendly

Gen 2 fits modern workflows better: branch-based environments, reproducible pipelines, and an easier path to integrating with the CI/CD tooling you already use.

Translation: I can bring Amplify into my way of working instead of reshaping my workflow around Amplify's limits.

## Cloud Sandbox environments

Back in my time, setting up Feature Environments or Pull Request environments was always a challenge. It is not that it is impossible, it is that it is overhead. And usually that overhead lands on... you guessed it... the DevOps person.

Gen 2's cloud sandbox changes that dynamic completely.

Now it is super easy for devs to have an AWS sandbox environment to try their app without much overhead from me (the DevOps). Each developer gets an isolated dev space to build/test/iterate without stepping on other people's work, and without turning every experiment into an ops request.

This removes the "DevOps gate" bottleneck for teams:

- devs can spin up their own sandbox and move fast
- it is isolated, so experimentation does not become a coordination nightmare
- the shared environment bottleneck disappears

For me, it replaces manual environment setup with devs spinning up their own safely.

## My situation: I am mostly hosting-first

This is important context: I am not coming from "I have 50 models, custom resolvers, and a super complex data layer". I am coming from a website hosted on Amplify v1 where frontend was great, and backend management was where I felt friction.

So my approach to Gen 2 is pragmatic:

- start with hosting + the Gen 2 workflow
- keep backend minimal until I need it
- and when I do need auth/data/functions, I want it to feel like normal code + normal automation

## Closing

Amplify v1 was amazing for "get a site live on AWS fast." My pain was backend management and deployment/automation, especially as someone who wants DevOps smoothness by default.

Gen 2 solves that for me with a code-first backend (TypeScript), a workflow that fits modern CI/CD and environment strategies better, and the cloud sandbox feature that makes per-dev environments easy instead of a DevOps tax.

If you are coming from v1, tell me what hurt the most (auth redirects? env drift? IAM "works in dev, breaks in prod"?) and I will add it to a troubleshooting section with real fixes.`,
      },
      es: {
        title:
          "Amplify v1 → Amplify Gen 2: por que me encanto v1 para hosting, por que odie el backend, y por que Gen 2 por fin se siente bien",
        summary:
          "Por que v1 era perfecto para hosting pero doloroso en backend, y como Gen 2 arregla el flujo con backend code-first y sandbox.",
        body: `## Lo mejor de Amplify

"Lo mejor de Amplify es lo facil que es levantar un sitio con AWS Power Services. Queria ir full AWS."

Ese es el centro del tema. He hosteado sitios en otros lugares y si, puede ser facil, pero cuando quieres ir mas profundo con servicios de AWS, la integracion no siempre esta. Yo queria ir full AWS sin convertir mis proyectos personales en un proyecto de infraestructura. Amplify v1 hizo eso absurdamente simple para hosting frontend.

Frontend en v1? Suave. Repo conectado, build corre, sitio en vivo. Tienes esa sensacion de "AWS power services" sin tener que coser todo a mano.

## El dolor principal en v1: manejo de backend

"The main pain point that I had with Amplify is the backend management. So on the frontend one, everything was fine, smooth, it was working fine. Backend one, DynamoDB, CognitoAuth, was a bit of a pain at the time of setting it up. It was a bit confusing on the structure, on my repository."

"and also at the time of deployment and managing. As someone with a DevOps experience, I want the experience to be as smooth as possible. I want to automate this as much as possible."

Esta fue mi experiencia. Hosting se sentia limpio. Backend se sentia confuso.

En el momento en que metes DynamoDB o Cognito/Auth, el modelo mental de v1 empieza a tambalear. Donde vive esto? Cual es la fuente de verdad? Por que mi repo se siente como si estuviera cuidando artefactos generados y conocimiento tribal?

Y en despliegues: soy exigente. No me molestan herramientas opinionadas. Me molestan los flujos que hacen la automatizacion mas dificil de lo necesario. Si voy a usar AWS, quiero entornos predecibles, deploys reproducibles y un pipeline que no me pelee.

## Que cambia realmente en Amplify v2 (Gen 2)

Gen 2 da vuelta la experiencia del backend a code-first. En vez de "configura cosas en un flujo y espera que la estructura haga sentido despues", Gen 2 esta pensado para definir backend en TypeScript dentro del proyecto.

Para mi eso importa porque ataca exactamente dos cosas que dolian en v1:

### 1) El backend deja de ser "esa cosa aparte"

En Gen 2, la definicion del backend vive en codigo. Eso significa que el backend no es un universo paralelo raro; es revisable, tiene diffs, y es mas facil de razonar.

Este es el upgrade de "menos trauma":

- menos "donde se configura esto?"
- menos caos en el repo
- mas "este es el backend, definido aqui, y cambia como cualquier codigo"

### 2) Deploy y automatizacion se vuelven mas DevOps-friendly

Gen 2 encaja mejor con workflows modernos: entornos por branch, pipelines reproducibles y un camino mas facil para integrarse con las herramientas de CI/CD que ya usas.

Traduccion: puedo llevar Amplify a mi forma de trabajo en vez de torcer mi flujo por los limites de Amplify.

## Cloud Sandbox

En mis tiempos, setear Feature Environments o Pull Request environments era siempre un desafio. No es que sea imposible, es que es overhead. Y normalmente ese overhead cae en... adivinaste... la persona de DevOps.

El cloud sandbox de Gen 2 cambia esa dinamica por completo.

Ahora es super facil que los devs tengan un AWS sandbox para probar su app sin mucho overhead de mi lado (DevOps). Cada dev tiene un espacio aislado para construir/probar/iterar sin pisar el trabajo de los demas y sin convertir cada experimento en un "pedido a ops".

Por eso elimina el cuello de botella del "DevOps gate" en los equipos:

- los devs pueden levantar su propio sandbox y moverse rapido
- es aislado, asi que la experimentacion no se vuelve un caos de coordinacion
- desaparece el cuello de botella del entorno compartido

Para mi, es pasar de crear entornos a mano a que el equipo los levante en minutos y de forma segura.

## Mi situacion: soy mas hosting-first

Este contexto importa: no vengo de "tengo 50 modelos, resolvers custom y una capa de datos compleja". Vengo de un sitio en Amplify v1 donde el frontend era genial y el backend era donde senti friccion.

Mi enfoque con Gen 2 es pragmatico:

- empezar con hosting + el workflow de Gen 2
- mantener el backend minimo hasta que lo necesite
- y cuando necesite auth/data/functions, que se sienta como codigo normal + automatizacion normal

## Cierre

Amplify v1 era increible para "poner un sitio en AWS rapido". Mi dolor era backend y deployment/automation, especialmente como alguien que quiere DevOps smooth por defecto.

Gen 2 me arregla eso con un backend code-first (TypeScript), un flujo que encaja mejor con CI/CD y estrategias de entornos modernas, y el cloud sandbox que hace faciles los entornos por dev en vez de un impuesto de DevOps.

Si vienes de v1, dime que fue lo que mas dolio (auth redirects? env drift? IAM "funciona en dev, rompe en prod"?) y lo agrego a una seccion de troubleshooting con fixes reales.`,
      },
    },
  },
  {
    slug: "observability-playbook",
    date: { en: "Aug 11, 2025", es: "11 Ago 2025" },
    readTime: { en: "7 min", es: "7 min" },
    content: {
      en: {
        title:
          'Deployment patterns on AWS: from "ship to prod and pray" to controlled, low-risk deployments',
        summary:
          "A practical map of rolling, blue/green, and canary deployments plus a minimal checklist for safer AWS deployments.",
        body: `I have spent years helping teams move from manual releases to automated rollouts.

Not in the "I love YAML" way (okay... sometimes), but in the practical way: helping teams move from a single server with manual releases to a setup that scales, rolls back fast, and does not make you sweat every Friday release.

Over the last years I have been having a bunch of conversations around this topic: basic deployments, monorepos, serverless architectures, and that classic journey of taking something primitive (a single box) and evolving it into something scalable and boring to operate.

> Here is a talk I gave on Deployments with Monorepos:
> - Monorepos + deploys: [YouTube](https://www.youtube.com/watch?v=Dg2WcgMZ62Y) - I walk through how I structure and ship monorepo deploys in practice.

And here is the thing: on AWS there is not one correct way to deploy. There are multiple patterns, each with tradeoffs. The real question is:

**What problem are you actually solving?**
- Downtime?
- Slow rollbacks?
- Releases that feel like a roulette?
- "We don't deploy on Friday because we are scared"?

This post is a practical map so you can:
- choose a deployment pattern (Rolling, Blue/Green, Canary/Weighted), and
- implement it with a simple checklist (no ceremony, just good habits).

---

## The map of deployments

### Rolling

Rolling is the "update the fleet gradually" pattern.

If you have 5 servers, you update one, then the next, then the next. You can do it:
- one-at-a-time
- or percentage-based batches (5% or 20% are common)

In AWS CodeDeploy, those "how many at once?" knobs are built-in deployment configurations like \`CodeDeployDefault.OneAtATime\`, \`HalfAtATime\`, and \`AllAtOnce\`. ([AWS Documentation][1])

**When Rolling is a good choice**
- You want something fast, straightforward, and you can tolerate some risk.
- Your system is **backward compatible** (more on that later).
- You can handle the reality that old and new versions will coexist during the rollout.

**The catch (aka where people get burned)**
- If you ship a breaking DB change or breaking API contract, rolling can turn into a partial outage generator.
- Rollbacks can be slower and messier because you are undoing across the fleet in steps (and might be mid-rollout).

---

### Blue/Green

Blue/Green is the "two environments, one switch" pattern.

You keep **Blue** (current production) running, you create **Green** (new version) next to it, validate Green, and then you flip traffic. If something smells wrong, you flip back. Smooth, fast rollback, low-stress rollback.

For ECS specifically, AWS supports a **blue/green deployment type controlled by CodeDeploy**, where you verify the new service before sending production traffic. ([AWS Documentation][2])

**Why you choose Blue/Green**
- You want **rollback to be instant-ish**: switch traffic back, done.
- You are doing a bigger change where you do not want mixed versions running side by side.
- You care about controlled cutover and clear validation gates.

**The main drawback**
- **Cost.** You are temporarily running a second production-like stack (double infra for a bit).
- And you must have at least basic smoke tests before the switch, otherwise you are just flipping coins faster.

---

### Canary / Weighted

This is my favorite story because it is literally from mining: canaries were used to detect dangerous gas early. The canary is your early warning system.

In software terms: you ship the new version to a small slice of traffic first.

Example:
- 5% of users hit the new version
- you watch metrics
- if it is clean, you go 10% -> 20% -> 50% -> 100%
- if it is not clean, you stop and roll back with limited blast radius

**Why you choose Canary**
- You want risk control. You accept slower rollout in exchange for fewer "oh no" moments.
- You are confident you can observe what matters (errors and latency) and make a promote/rollback decision.

**What Canary demands**
- Clear metrics and thresholds (otherwise it is canary theater).
- A defined window of observation (for example, keep 10% for 10 minutes, then decide).

---

## Mini decision table

| Pattern | Risk | Cost | Complexity | Rollback speed | You must have |
| --- | --- | --- | --- | --- | --- |
| Rolling / In-place | Medium-High | Low | Low | Medium | Backward compatibility |
| Blue/Green | Low-Medium | Medium-High | Medium | Fast | Smoke tests + traffic switch |
| Canary / Weighted | Low | Medium | Medium-High | Fast (if automated) | Metrics, thresholds, time window |

---

## Implementation: ECS + ALB + CodeDeploy

You said you do not want a massive post, so here is the concise, practical setup I would actually show: **ECS behind an ALB, deploying with CodeDeploy**.

The key mental model:
- **ALB target groups** are your blue vs green traffic destinations.
- **CodeDeploy** orchestrates the deployment and traffic shift.
- Your **AppSpec** tells CodeDeploy what to deploy (task definition, container name/port).

### The building blocks (what you need)

1. **An Application Load Balancer** with listeners
2. **Two target groups** (blue + green) - plus an optional test listener/port if you want validation before production traffic ([AWS Documentation][3])
3. **An ECS service** configured for blue/green deployments (deployment controller = CodeDeploy) ([AWS Documentation][2])
4. **An AppSpec file** for ECS deployments (this is how CodeDeploy knows your task definition + container details) ([AWS Documentation][4])

### The flow (what happens during a deployment)

- You register a new task definition revision (new image/tag).
- CodeDeploy launches the green version behind the green target group.
- Health checks + optional test listener validation happens.
- If everything looks good, traffic shifts to green.
- If not, rollback is basically stop, keep blue serving traffic.

If you want the shortest path to "I can do this": follow the AWS tutorial steps for the AppSpec + ECS/CodeDeploy integration and keep your first version dead simple. ([AWS Documentation][4])

---

## The "safe release" checklist

You did not want a big checklist, so aqui va the minimum viable safety list:

- **Backward compatibility**: DB migrations + API contracts will not break old/new coexistence.
- **Observability basics**: error rate + latency + logs you can actually trace (a correlation id goes a long way).
- **Decision rule**: "If X happens (threshold) for Y minutes (window), we roll back."
- **Rollback is real**: you have actually practiced it once, not just assumed it.

---

## Anti-patterns

- **Canary with no metrics** -> you are not doing canary, you are doing hope.
- **Blue/Green with no smoke tests** -> you are just failing faster.
- **Destructive DB migrations** -> the fastest way to make rollback impossible.
- **Huge all-in-one deploys** -> make changes smaller; reduce blast radius.

---

## TL;DR

- **Rolling / in-place**: when you want simple and fast, and your system is backward compatible. Cheapest, but riskier if you ship breaking changes. ([AWS Documentation][1])
- **Blue/Green**: when you want clean cutover + fast rollback, and you can afford temporary extra cost. Great for bigger changes. ([AWS Documentation][2])
- **Canary / weighted**: when you want the safest rollout through gradual traffic + observation. Requires real metrics + thresholds.

If you want, drop me your existing setup (ECS on EC2? Fargate? single service? multiple?) and I will help you pick the one pattern that fits your reality.

---

## Links (copy/paste)

~~~
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
~~~

[1]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html?utm_source=chatgpt.com "Working with deployment configurations in CodeDeploy"
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html?utm_source=chatgpt.com "CodeDeploy blue/green deployments for Amazon ECS"
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html?utm_source=chatgpt.com "Set up a load balancer, target groups, and listeners for ECS"
[4]: https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html?utm_source=chatgpt.com "Step 2: Create the AppSpec file - AWS CodeDeploy"`,
      },
      es: {
        title:
          'Patrones de despliegue en AWS: de "subo a prod y rezo" a releases controlados y de bajo riesgo',
        summary:
          "Mapa practico de rolling, blue/green y canary, mas un checklist minimo para desplegar en AWS con menos riesgo.",
        body: `He pasado anos ayudando equipos a pasar de releases manuales a despliegues automatizados.

No en el sentido de "amo YAML" (ok... a veces), sino en el practico: ayudar equipos a pasar de un solo servidor con releases manuales a un setup que escala, revierte rapido y no te hace sudar cada release del viernes.

En los ultimos anos he tenido (y grabado) varias conversaciones sobre esto: despliegues basicos, monorepos, arquitecturas serverless y ese viaje clasico de tomar algo primitivo (una sola caja) y volverlo escalable y aburrido de operar.

> Voy a linkear esas charlas aqui:
> - Monorepos + deploys: [YouTube](https://www.youtube.com/watch?v=Dg2WcgMZ62Y) - Explico como estructuro y hago deploy de monorepos en la practica.

Y aqui va lo importante: en AWS no hay una sola forma correcta de desplegar. Hay varios patrones, cada uno con tradeoffs. La pregunta real es:

**Que problema estas resolviendo en realidad?**
- Downtime?
- Rollbacks lentos?
- Releases que se sienten como ruleta?
- "Desplegamos de noche porque da miedo"?

Este post es un mapa practico para que puedas:
- elegir un patron de despliegue (Rolling, Blue/Green, Canary/Weighted), y
- implementarlo con un checklist simple (sin ceremonia, solo buenos habitos).

---

## El mapa de despliegues

### Rolling

Rolling es el patron de "actualizar la flota gradualmente".

Si tienes 5 servers, actualizas uno, luego el siguiente, y asi. Puedes hacerlo:
- uno por uno,
- por porcentajes grandes (5% o 20% son comunes).

En AWS CodeDeploy, esos "cuantos a la vez?" vienen listos como configuraciones de despliegue tipo \`CodeDeployDefault.OneAtATime\`, \`HalfAtATime\` y \`AllAtOnce\`. ([AWS Documentation][1])

**Cuando Rolling es buena opcion**
- Quieres algo rapido, simple y toleras algo de riesgo.
- Tu sistema es **backward compatible** (mas sobre eso mas adelante).
- Puedes vivir con versiones viejas y nuevas coexistiendo durante el rollout.

**El catch (donde la gente se quema)**
- Si envias un cambio de DB o contrato API que rompe, rolling puede generar un outage parcial.
- Los rollbacks pueden ser mas lentos y desordenados porque se deshacen en pasos (y puede estar a medio rollout).

---

### Blue/Green

Blue/Green es el patron de "dos entornos, un switch".

Mantienes **Blue** (prod actual) corriendo, creas **Green** (nueva version) al lado, validas Green y luego mueves trafico. Si algo huele raro, vuelves atras. Rollback rapido, con menos estres.

Para ECS, AWS soporta despliegue **blue/green controlado por CodeDeploy**, donde validas el servicio nuevo antes de enviar trafico de prod. ([AWS Documentation][2])

**Por que elegir Blue/Green**
- Quieres rollback casi instantaneo: cambias el trafico y listo.
- Estas haciendo un cambio grande y no quieres versiones mezcladas.
- Te importa un cutover controlado y puertas claras de validacion.

**La desventaja principal**
- **Costo.** Corres un segundo stack tipo prod temporalmente.
- Necesitas al menos smoke tests antes del switch, si no solo estas tirando monedas mas rapido.

---

### Canary / Weighted

Mi historia favorita viene de minas: los canarios se usaban para detectar gas peligroso. El canario es tu alerta temprana.

En software: mandas la nueva version a una porcion pequena de trafico primero.

Ejemplo:
- 5% de usuarios pega la version nueva
- miras metricas
- si esta limpio, vas 10% -> 20% -> 50% -> 100%
- si no, paras y haces rollback con blast radius limitado

**Por que elegir Canary**
- Quieres control de riesgo. Aceptas un rollout mas lento por menos "oh no".
- Tienes observabilidad para decidir promover o hacer rollback.

**Lo que Canary exige**
- Metricas y thresholds claras (si no, es canary theater).
- Ventana de observacion definida (por ejemplo, 10% por 10 minutos y decidir).

---

## Mini tabla de decision

| Patron | Riesgo | Costo | Complejidad | Velocidad de rollback | Debes tener |
| --- | --- | --- | --- | --- | --- |
| Rolling / In-place | Medio-Alto | Bajo | Bajo | Medio | Backward compatibility |
| Blue/Green | Bajo-Medio | Medio-Alto | Medio | Rapido | Smoke tests + switch de trafico |
| Canary / Weighted | Bajo | Medio | Medio-Alto | Rapido (si es automatico) | Metricas, thresholds, ventana |

---

## Implementacion: ECS + ALB + CodeDeploy

Dijiste que no quieres un post gigante, asi que aqui va la version concisa que yo mostraria: **ECS detras de un ALB, desplegando con CodeDeploy**.

El modelo mental clave:
- Los **target groups del ALB** son tus destinos blue vs green.
- **CodeDeploy** orquesta el despliegue y el cambio de trafico.
- Tu **AppSpec** le dice a CodeDeploy que desplegar (task definition, container name y port).

### Los bloques (lo que necesitas)

1. Un **Application Load Balancer** con listeners
2. **Dos target groups** (blue + green) - mas un listener/puerto de test opcional si quieres validar antes del trafico de prod ([AWS Documentation][3])
3. Un **ECS service** configurado para despliegues blue/green (deployment controller = CodeDeploy) ([AWS Documentation][2])
4. Un **AppSpec file** para despliegues ECS (esto le dice a CodeDeploy tu task definition + container details) ([AWS Documentation][4])

### El flujo (que pasa durante un despliegue)

- Registras una nueva revision de task definition (nueva imagen/tag).
- CodeDeploy lanza la version green detras del target group green.
- Corren health checks y validacion del listener de test si aplica.
- Si todo va bien, el trafico cambia a green.
- Si no, rollback es basicamente parar y dejar blue sirviendo.

Si quieres el camino mas corto a "puedo hacerlo": sigue los pasos del tutorial de AppSpec + ECS/CodeDeploy y manten la primera version simple. ([AWS Documentation][4])

---

## El checklist de release seguro

No querias un checklist gigante, asi que aqui va el minimo viable:

- **Backward compatibility**: migraciones de DB y contratos de API no rompen la coexistencia.
- **Observabilidad basica**: error rate + latencia + logs trazables (un correlation id ayuda mucho).
- **Regla de decision**: "Si X pasa (threshold) por Y minutos (ventana), hacemos rollback."
- **Rollback es real**: lo has practicado al menos una vez, no solo asumido.

---

## Anti-patterns

- **Canary sin metricas** -> no es canary, es esperanza.
- **Blue/Green sin smoke tests** -> solo estas fallando mas rapido.
- **Migraciones de DB destructivas** -> la forma mas rapida de hacer rollback imposible.
- **Deploys enormes todo-en-uno** -> cambios mas pequenos; menos blast radius.

---

## TL;DR

- **Rolling / in-place**: simple y rapido, con backward compatibility. Mas barato, pero mas riesgoso si rompes algo. ([AWS Documentation][1])
- **Blue/Green**: cutover limpio + rollback rapido, si puedes pagar costo temporal extra. Ideal para cambios grandes. ([AWS Documentation][2])
- **Canary / weighted**: el rollout mas seguro con trafico gradual y observacion. Requiere metricas reales + thresholds.

Si quieres, dime tu setup actual (ECS en EC2? Fargate? un servicio? varios?) y te ayudo a elegir el patron que mejor encaja con tu realidad.

---

## Links (copy/paste)

~~~
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
~~~

[1]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html?utm_source=chatgpt.com "Working with deployment configurations in CodeDeploy"
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html?utm_source=chatgpt.com "CodeDeploy blue/green deployments for Amazon ECS"
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html?utm_source=chatgpt.com "Set up a load balancer, target groups, and listeners for ECS"
[4]: https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html?utm_source=chatgpt.com "Step 2: Create the AppSpec file - AWS CodeDeploy"`,
      },
    },
  },
];

export const ArticlesPage: FC<Props> = ({ route, language }) => {
  const slug = route.replace(/^#\/article\/?/, "").trim();
  const article = slug
    ? articles.find((item) => item.slug === slug)
    : undefined;
  const copy = labels[language];

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
    const articleCopy = article.content[language];

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
            {articleCopy.title}
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
          <p className="text-lg text-gray-300 mb-8">{articleCopy.summary}</p>
          {article.pdfUrl ? (
            <div className="space-y-6">
              <iframe
                src={article.pdfUrl}
                className="w-full rounded-lg border border-gray-800"
                style={{ height: "80vh" }}
                title={articleCopy.title}
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
          ) : (
            <div className="space-y-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {articleCopy.body}
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
          const articleCopy = item.content[language];
          const isExternal = Boolean(item.externalUrl);
          return (
            <a
              key={item.externalUrl || item.slug}
              href={isExternal ? item.externalUrl : `/#/article/${item.slug}`}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.12)]"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={articleCopy.title}
                  className="w-full rounded-lg mb-4 object-cover"
                />
              )}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 mb-3">
                <span>{item.date[language]}</span>
                {item.source && (
                  <span className="text-amber-300/80">
                    {item.source?.[language] || "External"}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-200 transition-colors">
                {articleCopy.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {articleCopy.summary}
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
