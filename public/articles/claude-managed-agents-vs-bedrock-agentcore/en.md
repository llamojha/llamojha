![Claude Managed Agents vs Amazon Bedrock AgentCore](/claude-vs-agentcore.png)

I've come to realise that building a good and secure agent is not straightforward, it relies on a good harness and good infrastructure. It needs a runtime, isolation boundaries, session handling, recovery logic, credential management, observability, and some workable approach to governance once more than one team starts building them. The scaffolding required to make that agent do real work safely and reliably.

That is a lot of work and a lot of moving pieces, and why should you do it yourself when someone else can handle it for you? This is where Agents as a Service come in.

Anthropic recently announced [**Claude Managed Agents**](https://platform.claude.com/docs/en/managed-agents/overview) and AWS had its own solution already [**Amazon Bedrock AgentCore**](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html).

They are both responses to the same problem, but they solve it from different starting assumptions. Anthropic is packaging a managed **Claude-native worker runtime**. AWS is packaging a **modular platform of agent infrastructure services**. One is closer to managing the worker itself. The other is closer to managing the factory around the worker.

## Claude Managed Agents

![Claude Managed Agents](/claude-managed-agents-diagram.png)

[Claude Managed Agents](https://www.anthropic.com/engineering/managed-agents) is Anthropic's answer to Agent as a Service. The product is opinionated by design. Instead of exposing a set of low-level infrastructure building blocks and asking users to assemble them, Anthropic gives you a managed runtime for running a Claude-based agent over time.

The important part in here is that Anthropic is taking ownership of the runtime concerns around the agent itself. Session handling, execution flow, the harness around the model, and the relationship between long-running work and the execution environment are treated as part of the managed product.

Architecturally, this is where Anthropic's approach stands out. The system separates the orchestration layer from the tool execution environment and persistent session state. In practice, that means the session can outlive the specific container doing the work. If execution fails or a container dies, the agent does not have to lose the whole thread of work with it.

This approach reduces the amount of infrastructure a team has to build before the agent becomes useful. You are closer to a working system earlier. It also means you are buying into Anthropic's way of structuring agent execution. That is the trade-off here. You get speed and a more integrated runtime, but the abstraction is more opinionated and more tightly coupled to the Claude ecosystem.

If your team is already committed to Claude (and only to Claude) and wants the shortest path from prototype to production, that is exactly the appeal.

## Amazon Bedrock AgentCore

![Amazon Bedrock AgentCore](/agentcore-diagram.png)

AWS is not really trying to package the entire agent experience into one tightly integrated harness. Instead, it does what it knows best. It is building a broader system of services around the operational realities of agents. [Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html) is part of that system, but it is not the whole story. Around it, AWS has added [Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/how-it-works.html), [Gateway](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-core-concepts.html), [Identity](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity-overview.html), [Observability](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html), Policy, [Browser](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-tool.html), [Code Interpreter](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html), and [Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html).

It assumes that production agent systems have multiple distinct concerns, and those concerns should have separate surfaces, separate controls, and separate service boundaries. Runtime handles execution. Identity handles authentication and authorization. Gateway helps expose tools and services in a cleaner way, including MCP-oriented patterns. Memory deals with short-term and longer-lived context. Observability and Policy exist because once agents start taking actions, inspection and guardrails stop being optional. [Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html) exists because once multiple teams start building agents, tools, prompts, and workflows, discovery and governance become real platform problems.

It is worth mentioning that while you can use Amazon Bedrock catalogue of models (including Claude models), you can also [bring your own model](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/using-any-model.html) and integrate it into the runtime. This gives you the flexibility you need in an era where a new model seems to appear every week.

So, while Claude Managed Agents feels like a managed worker runtime, AgentCore feels more like a platform substrate for agent systems. It is less about hiding the moving parts and more about standardizing them.

That makes it a better fit for teams that already think in platform terms, care about explicit boundaries, or need their agent stack to sit naturally inside broader AWS operations.

## Pricing reflects the philosophy

In [Claude Managed Agents pricing](https://platform.claude.com/docs/en/about-claude/pricing), you pay for model usage, and on top of that Anthropic charges a session-based runtime fee while the agent is actively running. Claude Managed Agents keeps pricing relatively simple: you pay the normal Claude token rates, plus **$0.08 per active session-hour** while the agent is running, which makes it easier to estimate from the outside because the extra runtime cost is tied to the session itself rather than broken into infrastructure-style units.

[Amazon Bedrock AgentCore pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) is more granular and more AWS-like. You pay for model inference separately, and then pay infrastructure-style pricing for Runtime at **$0.0895 per vCPU-hour** and **$0.00945 per GB-hour**, with other services such as Gateway and Memory billed by usage as needed.

## Which one actually fits better

This is not a winner-takes-all comparison. The better product depends on where you want the abstraction boundary to sit.

If you want the provider to manage the worker, Claude Managed Agents is closer to that model. Anthropic owns more of the harness, the session lifecycle, and the execution flow. That is attractive when speed matters, when you already trust the Claude stack, and when your main goal is to get a capable Claude-based worker into production without building too much surrounding infrastructure yourself.

If you want the provider to manage the factory around the worker, AgentCore is closer to that model. AWS gives you a broader set of services for runtime, memory, identity, gateway, observability, policy, and discovery. That is a better fit for environments where those concerns need to be explicit, separate, and governable.

So the real decision is not whether one product is universally better. The real decision is whether you want a more opinionated managed runtime or a more modular agent platform.

If you want a managed Claude worker runtime, Claude Managed Agents is the cleaner answer.
If you want a modular enterprise platform for agents, AgentCore is the stronger answer.

## Conclusion

Managed agent services are becoming important for the same reason managed databases, serverless runtimes, and managed messaging systems became important. Teams do not want to keep rebuilding the substrate around the thing they actually care about.

In the case of agents, that substrate includes execution, isolation, sessions, tools, credentials, observability, memory, policy, identity, and governance. That is the space both Claude Managed Agents and Amazon Bedrock AgentCore are trying to own.

Claude Managed Agents reduces complexity by owning more of the runtime harness itself.

Amazon Bedrock AgentCore reduces complexity by standardizing the surrounding services as a platform.

One is giving you a managed Claude worker.
The other is giving you a modular enterprise platform for agents.