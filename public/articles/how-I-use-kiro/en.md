![How I Use Kiro — main workflows and patterns](/articles/how-I-use-kiro/banner.png)

## 1. Why I use Kiro

I've been using Kiro for almost 1 year now, I'm using it as a Cloud Architect and also to build side projects for fun. The main reason I use Kiro over other tools is how it works with you as an engineer. Over the months, I've noticed certain patterns in how I use Kiro. Let's go over them:

## Index

* [1. Why I use Kiro](#1-why-i-use-kiro)
* [2. Pair Programming with Kiro](#2-pair-programming-with-kiro)
* [3. Repeatable workflows as Skills](#3-repeatable-workflows-as-skills)
* [4. Using Plan, Specs and Agents](#4-using-plan-specs-and-agents)
* [5. Council of agents](#5-council-of-agents)
* [6. Documentation, Documentation, Documentation](#6-documentation-documentation-documentation)

## 2. Pair Programming with Kiro

![Pair Programming with Kiro — you drive, Kiro executes](/articles/how-I-use-kiro/pair-programming.png)

The most common way that I use Kiro is in Pair Programming. Pair Programming is when there are 2 developers working together on the same task, they can work in tandem or one of them can be the one guiding/planning while the other one does the code. In my case, with Kiro, I'm the one doing the guiding and planning while Kiro is the one executing and implementing the code.

I'm also using Kiro as my rubber duck. If I have a new idea or I'm working on a blocking bug, I talk to Kiro so it can give me a different point of view, investigate and steer me into good practices.

The main reason for me to do it this way is because once the session is over, I can run a prompt/skill to record everything from the session:

> Kiro, summarize this session and save it into a `.memory` folder with the format yyyymmdd and as a markdown

So then everything that we've done is going to be recorded there.

Do you remember everything that you've done yesterday? Maybe. But what about last week? And what about one month ago? I definitely don't remember it.

In the classic Software Development Life Cycle, we have tickets, and we have a way that we can recall all this information, but the more detailed context of why you did it is going to be completely missed.

Now, with tools like Kiro, this is possible to remember. You just have a `.memory` folder where you summarize all your sessions. So in the future, we could have a situation like this:

> Oh, I don't remember what changes I did in this cluster two months ago, and now my boss is asking about it. Based on the sessions from two months ago, tell me what we did in the cluster sorted by date

And Kiro is going to save my day.

## 3. Repeatable workflows as Skills

![Repeatable Workflows as Skills — automate, standardize, scale](/articles/how-I-use-kiro/repeatable-workflows-as-skills.png)

My experience as a DevOps Engineer has taught me to automate everything. Sometimes you will use Kiro to do a repetitive task, like:

* going into AWS and checking the billing state and budget quotas;

* do a security check of recent CVE against our codebase and the versions that we use;

* reviewing all the alerts that happened last week.

These are repetitive things that I do, and they have certain scripts or commands that I'm asking Kiro to do again and again.
We can automate this by recording it as a prompt or skill. With Kiro, I can just say:

> Okay, we just did all of this. Now record it as a skill or as a prompt.

So next time that I need to review the billing or review the alerts, I'm just going to ask Kiro:

> let's review the alerts, use the skill alerts_review.md

And it's going to read the skill and start doing it as we already designed. And because the first time you did it was working, it helps ensure that Kiro uses the same steps, which makes hallucination or drifting from the main goal less likely.
If it is a repeatable task, record it and make it so you can use it again.

## 4. Using Plan, Specs and Agents

![Using Plan, Specs and Agents — from plan to execution with control](/articles/how-I-use-kiro/plan-specs-agents.png)

I usually start a new task following three main steps:

* First I go into plan mode (CLI built-in), I give the gist of my tasks and together with Kiro, we go into a question-answer session to clarify the goals, gaps and implementation. I personally love this feature, having this back-and-forth feedback helps me not just plan it properly but to make me think through it. Once the plan is over I ask it to write it as a Spec
* The IDE alternative is to use the built-in Spec features, it will generate a Requirements.md, Design.md and Task.md with breaks after each of them that allow you to read them and verify them. Specs are not only useful for defining the task at hand, but to also have a record of the decisions taken to implement the task.
* The final step is to make sure that Kiro will use my custom sub-agents. I ask Kiro to review the task list and to optimise it to use sub-agents and parallel executions. I've built a registry for Kiro Context (kirohub.dev) where I have loads of custom agents which are really useful for this case.

I don't go full auto-approve. I like to see what it's actually doing and how it is doing it, which I think Kiro does very well as a tool. It's not a tool that is just going to one-shot and vibe-code your stuff. It's a tool that allows you to see what it's doing, and it's asking for feedback and permissions, which as an engineer, I really appreciate because it keeps me in the loop.

At the end of the task implementation, I do two things:

* code review, I have a prompt to code review all staged changes and then add them as a TODO list so we can go one-by-one fixing them. I tend to do this also with a different model to get a 'second point of view'.
* Pre-Mortem, run a scenario where we pretend that the task implementation failed, running like a post-mortem but before it even happens.

## 5. Council of agents

![Council of Agents — multiple perspectives, one better decision](/articles/how-I-use-kiro/council-of-agents.png)

While pair programming and the rubber duck method usually work well, sometimes I want to see different points of view or brainstorm some new ideas. For this specific case I build what I call 'The Council of Agents'.

I created a sub-agent for Opus, a sub-agent that is using Sonnet, a sub-agent that is using Haiku, and so on.
Then I have a sub-agent that is going to be the council ruler, which is going to invoke those sub-agents for a specific task.

It works very well because, while they can see similar points, each of them usually sees something different. Then I just pick the best of each of them. Reducing the chance of wild hallucinations.

## 6. Documentation, Documentation, Documentation

![Documentation, Documentation, Documentation — capture, structure, transform, share](/articles/how-I-use-kiro/documentation.png)

Documentation is that thing that we all love but is hard to actually do. When I start working on an existing project I usually go and read all the documentation finding things that are deprecated, not in use anymore and getting an out-of-date version of the system.

The way that I approach this with Kiro is to ask for an analysis of the codebase and generate two main markdown files:

* A very high-level detail of the logic of this codebase, with simple diagrams in Mermaid.
* A very deep-level and detailed explanation of the codebase. Architecture diagrams in Mermaid and code snippets.

Once it gets all the information and puts it into those two Markdown files, what I'm going to ask is to create some HTML files so it can display this for me in a way that is easy for me to read. I prefer dark-themed, TLDR at the start and some feedback/gotchas points at the end.

From there, I can go more into detail for the specific things that I want.

Maybe I want to see just diagrams, expand it to drawio format, see how the system interconnects,  display snippets of the code, add links for the SDK or documentation for third parties. So depending on what I want to do or what I want to see, I'm going to ask for that and create more documentation.

When I share this documentation I always focus on who is going to be the user target. If it is going to be context documentation for another AI tool to use, then I'll choose Markdown format. If it is going to be a report for other humans to read, then it will be HTML.

## Final thoughts

This is how **I** use Kiro. For me, it's not just about asking an AI tool to write code. It's more about how I can use it in different parts of my workflow.

That is the important part for me. I don't want the tool to just go away and build everything by itself. I want to see what it's doing. I want to give feedback. I want to keep the context. And I want to reuse the things that work. That is why Kiro fits the way I work.

I would love to see how other people are using Kiro or any other AI tool in their day-to-day. Do you use any of the ways that I mentioned? Do you have a way to work with AI that has been working well for you? Please share it in the comments.
