## The best thing about Amplify

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

If you are coming from v1, tell me what hurt the most (auth redirects? env drift? IAM "works in dev, breaks in prod"?) and I will add it to a troubleshooting section with real fixes.