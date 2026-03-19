# From vibe coding to specs: how I started shipping bigger changes with Kiro

## My "vibe coding" phase

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

**"Stop chasing better prompts. Write a better spec."**
