## El Problema que Ambos Resuelven

Construir un agente bueno y seguro no es sencillo. Requiere un buen harness e infraestructura — runtime, límites de aislamiento, manejo de sesiones, lógica de recuperación, gestión de credenciales, observabilidad y gobernanza cuando más de un equipo empieza a construirlos.

Es mucho trabajo. ¿Por qué hacerlo tú mismo cuando alguien más puede manejarlo? Aquí es donde entra Agents as a Service.

Anthropic anunció recientemente [**Claude Managed Agents**](https://www.anthropic.com/engineering/managed-agents) y AWS tiene [**Amazon Bedrock AgentCore**](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html).

Resuelven el mismo problema desde diferentes supuestos. Anthropic empaqueta un **runtime de worker nativo de Claude**. AWS empaqueta una **plataforma modular de servicios de infraestructura para agentes**. Uno gestiona el worker. El otro gestiona la fábrica alrededor del worker.

## Claude Managed Agents

[Claude Managed Agents](https://www.anthropic.com/engineering/managed-agents) es la respuesta de Anthropic a Agent as a Service. El producto es opinionado por diseño. En lugar de exponer bloques de infraestructura de bajo nivel, Anthropic te da un runtime gestionado para ejecutar un agente basado en Claude.

Anthropic toma propiedad de las preocupaciones del runtime: manejo de sesiones, flujo de ejecución, el harness alrededor del modelo y la relación entre trabajo de larga duración y el entorno de ejecución.

Arquitectónicamente, el sistema separa la capa de orquestación del entorno de ejecución de herramientas y el estado persistente de sesión. La sesión puede sobrevivir al contenedor específico haciendo el trabajo. Si la ejecución falla o un contenedor muere, el agente no pierde todo el hilo de trabajo.

Esto reduce la infraestructura que un equipo tiene que construir antes de que el agente sea útil. Obtienes velocidad y un runtime más integrado, pero la abstracción es más opinionada y acoplada al ecosistema Claude.

Si tu equipo ya está comprometido con Claude y quiere el camino más corto de prototipo a producción, ese es exactamente el atractivo.

## Amazon Bedrock AgentCore

AWS no intenta empaquetar toda la experiencia del agente en un harness integrado. En cambio, construye un sistema más amplio de servicios alrededor de las realidades operativas de los agentes.

[Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html) es parte de ese sistema, pero no toda la historia. Alrededor, AWS ha añadido [Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/how-it-works.html), [Gateway](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-core-concepts.html), [Identity](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity-overview.html), [Observability](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html), Policy, [Browser](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-tool.html), [Code Interpreter](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html) y [Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html).

Asume que los sistemas de agentes en producción tienen múltiples preocupaciones distintas que deberían tener superficies, controles y límites de servicio separados:
- **Runtime** maneja la ejecución
- **Identity** maneja autenticación y autorización
- **Gateway** expone herramientas y servicios, incluyendo patrones orientados a MCP
- **Memory** maneja contexto de corto y largo plazo
- **Observability y Policy** existen porque una vez que los agentes toman acciones, la inspección y los guardrails dejan de ser opcionales
- **Registry** existe porque una vez que múltiples equipos construyen agentes, el descubrimiento y la gobernanza se vuelven problemas reales de plataforma

Puedes usar el catálogo de modelos de Amazon Bedrock (incluyendo Claude), o [traer tu propio modelo](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/using-any-model.html). Esto da flexibilidad en una era donde aparece un nuevo modelo cada semana.

AgentCore se siente más como un sustrato de plataforma para sistemas de agentes. Se trata menos de ocultar las partes móviles y más de estandarizarlas. Eso lo hace mejor para equipos que piensan en términos de plataforma, les importan los límites explícitos, o necesitan que su stack de agentes encaje naturalmente dentro de operaciones AWS más amplias.

## El Pricing Refleja la Filosofía

En [pricing de Claude Managed Agents](https://platform.claude.com/docs/en/about-claude/pricing), pagas por uso del modelo más una tarifa de runtime basada en sesión. Tarifas de tokens de Claude más **$0.08 por hora de sesión activa**. Simple de estimar porque el costo extra de runtime está atado a la sesión misma.

[Pricing de Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/pricing/) es más granular y estilo AWS. Pagas por inferencia del modelo por separado, luego pricing estilo infraestructura para Runtime a **$0.0895 por vCPU-hora** y **$0.00945 por GB-hora**, con Gateway y Memory facturados por uso según sea necesario.

## Cuál Encaja Mejor

Esta no es una comparación de ganador absoluto. El mejor producto depende de dónde quieras que esté el límite de abstracción.

**Si quieres que el proveedor gestione el worker** — Claude Managed Agents está más cerca de ese modelo. Anthropic posee más del harness, ciclo de vida de sesión y flujo de ejecución. Atractivo cuando la velocidad importa, cuando confías en el stack de Claude, y cuando tu objetivo es poner un worker capaz basado en Claude en producción sin construir infraestructura circundante.

**Si quieres que el proveedor gestione la fábrica alrededor del worker** — AgentCore está más cerca de ese modelo. AWS te da un conjunto más amplio de servicios para runtime, memoria, identidad, gateway, observabilidad, política y descubrimiento. Mejor para entornos donde esas preocupaciones necesitan ser explícitas, separadas y gobernables.

## Conclusión

Los servicios de agentes gestionados se están volviendo importantes por la misma razón que las bases de datos gestionadas, runtimes serverless y sistemas de mensajería gestionados se volvieron importantes. Los equipos no quieren seguir reconstruyendo el sustrato alrededor de lo que realmente les importa.

En el caso de los agentes, ese sustrato incluye ejecución, aislamiento, sesiones, herramientas, credenciales, observabilidad, memoria, política, identidad y gobernanza.

- **Claude Managed Agents** reduce complejidad al poseer más del harness de runtime
- **Amazon Bedrock AgentCore** reduce complejidad al estandarizar los servicios circundantes como plataforma

Uno te da un worker Claude gestionado.
El otro te da una plataforma empresarial modular para agentes.