# Alvaro Llamojha — Personal Site

Modern personal website built with Next.js 14, Tailwind CSS, and the app router. The site highlights Alvaro's DevOps, observability, and mentoring experience and is optimised for static deployment on platforms such as Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the site in development mode.

## Production Build

```bash
npm run build
npm start
```

On Vercel, the project runs with the default Next.js build command (`npm run build`) and output (`.next`).

## Tech Stack

- [Next.js](https://nextjs.org/) 14 with the App Router
- [Tailwind CSS](https://tailwindcss.com/) with the Typography plugin
- TypeScript for type safety
- Heroicons for lightweight iconography

## Content

All profile content lives in [`data/profile.ts`](data/profile.ts) for quick updates without touching layout code.
