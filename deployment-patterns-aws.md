# Deployment patterns on AWS: from "ship to prod and pray" to controlled, low-risk deployments

I have spent years helping teams move from manual releases to automated rollouts.

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

---

## Links

~~~
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
~~~

[1]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html?utm_source=chatgpt.com "Working with deployment configurations in CodeDeploy"
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html?utm_source=chatgpt.com "CodeDeploy blue/green deployments for Amazon ECS"
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer-for-ecs.html?utm_source=chatgpt.com "Set up a load balancer, target groups, and listeners for ECS"
[4]: https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-create-appspec-file.html?utm_source=chatgpt.com "Step 2: Create the AppSpec file - AWS CodeDeploy"
