# Kiro Hub: Generate a Kiro Skill in 60 Seconds Built with Amazon Bedrock Registry and AgentCore Harness

**Tags:** `#kiro` `#ai` `#aws` `#agentcore`

**TLDR;** I used two Amazon Bedrock AgentCore capabilities, AWS Agent Registry for hybrid search over 10k+ Kiro resources, and AgentCore Harness for testing generated skills against a real agent, to build an AI-powered skill generator for Kiro Hub. Try it at [kirohub.dev/generate](https://kirohub.dev/generate).

---

## The blank file problem 

I've been building [Kiro Hub](https://kirohub.dev) for a few months now. The hub has over 10,000 community resources, including steering files, hooks, agents, and skills. You can browse, search, and install any of them with:

```bash
npx kirohub add <slug>
```

I wanted to expand Kiro Hub and the next logical step is to be able to create resources based on our current dataset of +10k. I decided to start with Agent Skills. This means that I have to have a better and secure way to ingest custom made Skills. But there is another problem, how do you test the Skill? 

So I decided to implement Bedrock Registry to evolve Kiro Hub into a proper AI context registry with status and steps to move from draft to available. Bedrock AgentCore Harness is a really solid and secure solution to run agents, that also has Skills compatibility. This matches my requirement of testing Agentic Skills in a sandbox. Why not connect those pieces?

## Create meaningful Skills

The feature lives at [kirohub.dev/generate](https://kirohub.dev/generate). You describe what you need in plain language:

> Create a skill for AWS Lambda error handling best practices

or:

> I need a skill that helps me write Haiku poems and explains them 

![Haiku skill generation](/articles/kiro-skill-generator/haiku-generation-1.png)

The system generates a complete, structured `SKILL.md` file.

It is a chat-based interface. You can refine the skill with follow-ups, test it against a real agent to see whether the instructions actually work, and publish it to the hub with one click. From prompt to published, installable skill, the normal path takes under a minute.

The interesting part is not the editor or the Lambda functions. The interesting part is the combination of retrieval and testing. Registry makes the generated skill more specific. Harness makes the test more realistic.

## Retrieval and storage with Amazon Bedrock Registry

The approach to skill generation is simple but naive: give a model a prompt, explain the `SKILL.md` format, and ask it to generate something.

What makes a skill useful is specificity. Concrete patterns, opinionated guidance, real-world trade-offs, and a structure that an agent can follow. That kind of content already exists across the 10,000+ resources in Kiro Hub. The question was how to get the right examples in front of the model at generation time. And for this I had to evolve Kiro Hub into a proper registry. 

[AWS Agent Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html) solves that part. Kiro Hub resources are synced to the Registry as descriptors with names, descriptions, content references, and metadata. Kiro Hub can then resolve matched records back to the full source content used as generation context.

The Registry exposes a built-in MCP endpoint. The `generate-skill` Lambda calls it server-side with JSON-RPC:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_registry_records",
    "arguments": {
      "searchQuery": "AWS Lambda error handling",
      "maxResults": 5
    }
  }
}
```

Registry search uses both semantic and keyword matching, so the query does not need to match exact words. A search for “Lambda error handling” can surface related resources about serverless observability, retry strategies, operational debugging, and CloudWatch logging.

On the generation side, the Lambda exposes this as a `search_skills` tool to the model. The model decides what to search for and when. For a PostgreSQL migration skill, it might search for “database migration patterns,” “PostgreSQL best practices,” and “schema versioning” separately, then synthesize the useful parts into a new skill.

That changes the output. Without retrieval, the model writes from general knowledge. With retrieval, it has seen how other skill authors structured similar guidance, what sections they included, what tools they referenced, and how specific they were.

Personally, I find it very important to show transparency. So the inspiration sources also show up in the UI. You can see which existing resources influenced the generated skill and click through to the originals on Kiro Hub. That is useful during refinement. If the model pulled in something that is not quite relevant, you can steer it in another direction.

![Inspiration sources from Registry](/articles/kiro-skill-generator/k8s-generation-2.png)

## Testing skills with Amazon Bedrock AgentCore Harness

We got a skill based on other working skills. But how do we trust that our newly generated skill works as we expected? 

A skill is not just markdown. It is a set of instructions that an agent has to discover, load, and follow. You cannot properly evaluate that by reading the file. You need to run it in something close to the environment where it will actually be used.

That is where Amazon Bedrock [AgentCore Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html) fits in. 

A Harness is a managed, config-based agent environment. You configure the model, system prompt, skills, tools, memory, limits, and runtime environment. Each session runs in an isolated environment, and reusing the same session ID lets you continue the conversation for follow-up tests. This allows me to test 'risky' skills without having to compromise my environments. 

When a user tests a generated skill, the system does three things:

First, the `test-skill` Lambda writes the generated `SKILL.md` into the session filesystem:

```text
/workspace/skills/test-skill/SKILL.md
```

Then it invokes the Harness with the skill path and the user’s test scenario:

```json
{
  "skills": [
    {
      "path": "/workspace/skills/test-skill"
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "text": "I need help setting up error handling for my Node.js Lambda"
        }
      ]
    }
  ]
}
```

Finally, it streams the agent response back to the UI.

The important detail is that this is not just “put the skill in the system prompt and call a model.” The skill is loaded from a path, discovered through its frontmatter, and activated when the scenario is relevant. That is the Agent Skill behavior I care about testing.

If the frontmatter description is vague, the agent may not activate the skill. If the instructions are too broad, the response will show it. If the examples are weak, that becomes obvious quickly. 

This is a feature I wanted to have across Kiro Hub. Be able to test if the desired resource works as we expected, that it doesn't have any side-effects (like prompt injection). This is the difference between checking whether markdown looks good and checking whether an agent can actually use it. 

Harness gives me session isolation, filesystem access, stateful follow-up testing, and standard skill activation. One Harness can serve many test requests safely because isolation comes from the session. If the user wants to keep probing, the same session can continue the conversation with the skill still available.

That matters for the product experience. You can generate a skill, run a realistic scenario, ask a follow-up, see what breaks, then go back and refine the instructions.

![Testing a skill with AgentCore Harness](/articles/kiro-skill-generator/haiku-generation-2.png)

## The full flow

You describe what you need in the side panel chat. The model searches the Registry for relevant resources and generates a `SKILL.md`. You refine it in chat if needed. Then you switch to the Test tab, run it against the AgentCore, inspect the response, and make changes if something is unclear.

![Full generation flow](/articles/kiro-skill-generator/haiku-gen-resource.png)

When you publish, the skill is written to DynamoDB and S3, then registered in AWS Agent Registry as an `AGENT_SKILLS` descriptor. An EventBridge rule triggers auto-validation. A Lambda function scores the skill with Bedrock across documentation quality, reusability, completeness, clarity, and specificity, then approves or rejects it based on the result. 

Once approved, the skill is live on Kiro Hub and installable with:

```bash
npx kirohub add <slug>
```

## What is next

The next piece is Agent Builders: a guided form for creating full Kiro agent configurations in `.kiro/agents/*.json`, not just skills. The spec is written, implementation is next. Then moving towards generating and testing steerings, hooks and prompts following the same approach. 

I am also working on Stacks: curated bundles of resources, agents, skills, and steering files, installable with one command. Think starter kits for common project types.

## Try it

Head to [kirohub.dev/generate](https://kirohub.dev/generate), describe what you need, and see what comes out.

## Links

- Kiro Hub: [kirohub.dev](https://kirohub.dev)
- Generate a Skill: [kirohub.dev/generate](https://kirohub.dev/generate)
- AWS Agent Registry: [docs.aws.amazon.com/bedrock-agentcore, Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html)
- AgentCore Harness: [docs.aws.amazon.com/bedrock-agentcore, Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html)
- Kiro Skills docs: [kiro.dev/docs/skills](https://kiro.dev/docs/skills/)
