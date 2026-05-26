# Get the Best Out of Kiro

**Tags:** `#kiro` `#ai` `#aws` `#context-engineering`

**TLDR;** A guide to Kiro's ecosystem — steerings, hooks, MCPs, powers, customizable agents, and spec-driven development — and how all the pieces fit together.

---

I started with Kiro a few months ago, back in October 2025, in a hackathon called Kiroween.

It was basically my starting point with Kiro IDE and an opportunity to understand what AWS was trying to do with this offering. My objective was to try Kiro and check what was different from the other tools that I was using back then.

Back then there weren't many guides about Kiro. So most of what I did was exploratory: creating new projects, trying "vibecoding", understanding what this "Spec-Driven Development" is and how it integrates with the IDE.

As months went by, I was getting more involved in the Kiro community, I started to discover everything that was behind the IDE. It's not just an IDE with AI on the side. There is a whole system on how to

That is where concepts such as these start to appear:

- steerings
- hooks
- MCPs
- powers
- agents
- prompts
- skills

If you are already using Kiro, or you are thinking about using it, and you still do not know how all these pieces fit together, this article is for you.

## TLDR: install Kiro

If you still do not have Kiro installed, here are the links:

- [Kiro installation](https://kiro.dev)
- [Installation on Windows](https://kiro.dev)
- [Installation on Linux](https://kiro.dev)

With that you should be able to have the IDE running in a few minutes. From here is where things start to get interesting.

## Steerings

Steerings are simply Markdown files where you define instructions, rules or context that you want Kiro to take into account when it works on your project.

They are not only useful for giving instructions. They can also contain structural information about your project.

For example:

- The structure and organization of the repository
- Code and naming conventions
- Project architecture
- How to generate the documentation

One of the most common cases is asking Kiro to generate the **Foundational Steerings**.

When you do this, Kiro scans your project and generates several files inside Kiro's configuration directory. They normally include:

- `product`
- `structure`
- `tech`

All this is generated using the context that Kiro detects in the repository. It is a good starting point because it gives you a documentation base that the AI can use when it works on the code.

### Steerings I recommend using

Besides the foundational steerings, there are several types that are quite useful to add in real projects.

**Project working rules**

How the team works in that repository. This can include things like:

- Naming conventions
- Folder structure
- Vision and Mission of the project

This helps a lot so that Kiro does not start generating things that fall outside the project's style.

**Documentation style**

You can define how the code is documented, which sections should appear, or how READMEs are written.

**Architecture conventions**

If your project follows a specific pattern, hexagonal, event driven, clean architecture, etc., having that defined in a steering helps quite a lot to maintain consistency.

The clearer you make it for Kiro how your project works, the better results you are going to get.

## Hooks

Hooks are another quite powerful piece inside Kiro. Basically, they are prompts that run automatically when an event occurs.

Some examples of those events are:

- When a file is created, modified or deleted
- When starting or finishing a task
- Manually

A fairly simple example: if you are modifying Markdown files, you can have a hook that:

- Runs a lint
- Formats the Markdown
- Checks for broken links

Another example: if you are modifying code, you could have a hook that automatically generates documentation about the changes that have been made.

This opens the door to automating quite a few things inside the development flow.

### How to start with hooks

Hooks have different ways of being triggered: hook triggers.

My recommendation is to always start with **manual hooks**.

First you test what they do, verify that the result is what you expected and make sure they are not doing anything weird. When you are already happy with the result, then you can start automating them.

> Remember that hooks launch a task in Kiro, if you have many automated hooks that can lead to a high cost in credits. That was one of the first lessons I learned with hooks.

## MCPs

MCPs are another important piece inside Kiro and AI in general.

To explain it in a very simple way, an MCP is basically like an API for AI to use. MCPs allow you to connect AI with external services. It gives it access to information or tools that normally would not be inside the project context.

Some fairly common examples:

- AWS documentation
- Context7 for technical documentation
- Integration with Atlassian, such as Jira or Confluence

You can connect Kiro with documentation, external tools or the team's internal systems and make the AI able to work with all of that.

## Powers

The not-so-good part of MCPs is that they add context inside the AI session. And the more MCPs you have activated, the more context they are going to consume, causing tasks to cost you more.

Many times you do not need to have all MCPs active all the time. And this is where **Kiro Powers** come in.

Powers allow you to encapsulate tasks or domains that are repeated a lot. Including tasks that use MCPs. Imagine that you have an MCP for the Supabase database. But for this task you know that you are not going to need the database. If you encapsulate it with a Power, Kiro would invoke it only when you need the database, freeing you from the context that this MCP would use when you are not using it.

Some time ago I wrote an article about creating my first Power, it is in English, sorry: [Building my first Kiro Power - Posthog Observability](https://dev.to/kirodotdev/building-my-first-kiro-power-posthog-observability-fik).

## Customizable agents

At the beginning of this year, Kiro announced customizable agents or sub-agents. Agents already existed inside Kiro, you will have seen this if you have already done spec-driven development in the IDE or plan mode with the CLI. Both use agents that are already defined inside Kiro, to execute a specific type of task.

Agents have their own structure and prompt that make them behave in the specified way.

What they do is they have a structure and an internal prompt in which only the agent appears. They have certain tools which are enabled or not. And they can have a selected model. For example, the plan agent behaves like a guide for planning a given task, it asks you questions about the task and makes you a detailed plan. This agent has the file-writing tool disabled, since it is only a plan that you are going to make, you are not going to do the implementation.

The plan is an agent that was already predefined by Kiro. Now you can make your own, which means you can take this to the next level. Or four levels further. And why four? Because with sub-agents you can have **four agents running in parallel**.

### How I use customizable agents

The agents that I always use are agents that are related to what you are doing in the project itself.

For example, I have a project that is TypeScript, so I have an agent that is a TypeScript expert. It has a specific prompt for how to work as a TypeScript expert. And I enable write and read tools for it.

### LLM council advice for planning and architecture

Another example I have is for planning, architecture and decision-making tasks.

Normally, if you ask the best model you have, it can give you an option that is quite good, but ideally you should have several options, since AI is non-deterministic and can hallucinate.

When doing planning, architecture, decision-making, matters where it is more about creating a plan or a design, and not an implementation, in real life you get together with a team, brainstorm and have different opinions from the team.

How would we take this inside Kiro? You have customizable agents that have a specific prompt, for example for planning. Since in customizable agents you can say which model it is using, you can give it a different model for the same type of agent. For example: Opus, Sonnet, Haiku and Auto, four models.

When making a plan, I ask Kiro to use my Agent Council in parallel. Kiro launches these four models running in parallel, each one making me an independent plan. Once they finish, the default agent compiles those four plans for me, taking the best from each one.

This is something that changes the model of doing planning completely. You brainstorm with several models and make sure you always have the best of the best. Maybe one model can hallucinate, but four hallucinating at the same time is more difficult.

## Spec-driven development

The part that most caught my attention about Kiro is the spec-driven development that was already included inside the IDE.

For developers this is not an entirely new concept, it is similar to defining a ticket, giving it requirements, producing the design and then implementing the ticket based on different sub-tasks.

Kiro's spec-mode creates requirements, a design and generates a task list for you, all in Markdown files, which you can review and have as context for your application or your repository.

If you are interested in me writing an article more focused on Spec-Driven Development, leave me a comment with your interest.

## Conclusion

In this article we have seen what Steerings, Hooks, MCPs, Powers and customizable agents are, and we have looked over spec-driven development.

All these functionalities inside Kiro are defined as the context of the AI. If you have heard about Context-Driven Development, this is the context they are referring to.

This article is the result of learning that I have done over the months. And learning is continuous, I keep finding new functionalities, such as skills, which I have not mentioned, but it is something that is also included inside Kiro and has become very famous recently.

If you are not using Kiro, I would recommend that you try it, both the IDE and through the command line, the CLI, and that you try spec-driven development.

And if you are interested in knowing more about Kiro, Context-Driven Development and Spec-Driven Development, or you want to comment on your experience with Kiro, do not hesitate to contact me or write it in the comments.
