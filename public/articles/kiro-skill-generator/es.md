# Kiro Hub: Genera un Kiro Skill en 60 segundos con Amazon Bedrock Registry y AgentCore Harness

**Tags:** `#kiro` `#ai` `#aws` `#agentcore`

**TLDR;** Usé dos capacidades de Amazon Bedrock AgentCore, AWS Agent Registry para búsqueda híbrida sobre más de 10k recursos de Kiro, y AgentCore Harness para probar skills generados contra un agente real, para construir un generador de skills con IA para Kiro Hub. Pruébalo en [kirohub.dev/generate](https://kirohub.dev/generate).

---

## El problema del archivo en blanco

Llevo unos meses construyendo [Kiro Hub](https://kirohub.dev). El hub tiene más de 10.000 recursos de la comunidad, incluyendo archivos de steering, hooks, agentes y skills. Puedes explorar, buscar e instalar cualquiera de ellos con:

```bash
npx kirohub add <slug>
```

Quería expandir Kiro Hub y el siguiente paso lógico es poder crear recursos basados en nuestro dataset actual de +10k. Decidí empezar con Agent Skills. Esto significa que necesito una forma mejor y más segura de ingestar Skills personalizados. Pero hay otro problema, ¿cómo pruebas el Skill?

Así que decidí implementar Bedrock Registry para evolucionar Kiro Hub hacia un registro de contexto de IA con estados y pasos para pasar de borrador a disponible. Bedrock AgentCore Harness es una solución realmente sólida y segura para ejecutar agentes, que también tiene compatibilidad con Skills. Esto encaja con mi requisito de probar Skills agénticos en un sandbox. ¿Por qué no conectar esas piezas?

## Crear Skills con sentido

La funcionalidad está en [kirohub.dev/generate](https://kirohub.dev/generate). Describes lo que necesitas en lenguaje natural:

> Crea un skill para mejores prácticas de manejo de errores en AWS Lambda

o:

> Necesito un skill que me ayude a escribir poemas Haiku y los explique

![Generación de skill Haiku](/articles/kiro-skill-generator/haiku-generation-1.png)

El sistema genera un archivo `SKILL.md` completo y estructurado.

Es una interfaz basada en chat. Puedes refinar el skill con mensajes de seguimiento, probarlo contra un agente real para ver si las instrucciones realmente funcionan, y publicarlo en el hub con un clic. De prompt a skill publicado e instalable, el camino normal toma menos de un minuto.

Lo interesante no es el editor ni las funciones Lambda. Lo interesante es la combinación de recuperación y pruebas. Registry hace que el skill generado sea más específico. Harness hace que la prueba sea más realista.

## Recuperación y almacenamiento con Amazon Bedrock Registry

El enfoque para generar skills es simple pero ingenuo: darle a un modelo un prompt, explicar el formato `SKILL.md`, y pedirle que genere algo.

Lo que hace útil a un skill es la especificidad. Patrones concretos, guía con opinión, trade-offs del mundo real, y una estructura que un agente pueda seguir. Ese tipo de contenido ya existe en los más de 10.000 recursos de Kiro Hub. La pregunta era cómo poner los ejemplos correctos frente al modelo en el momento de la generación. Y para esto tuve que evolucionar Kiro Hub hacia un registro propiamente dicho.

[AWS Agent Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html) resuelve esa parte. Los recursos de Kiro Hub se sincronizan al Registry como descriptores con nombres, descripciones, referencias de contenido y metadatos. Kiro Hub puede entonces resolver los registros coincidentes de vuelta al contenido fuente completo usado como contexto de generación.

El Registry expone un endpoint MCP integrado. La Lambda `generate-skill` lo llama del lado del servidor con JSON-RPC:

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

La búsqueda del Registry usa tanto coincidencia semántica como por palabras clave, así que la consulta no necesita coincidir con palabras exactas. Una búsqueda de "Lambda error handling" puede encontrar recursos relacionados sobre observabilidad serverless, estrategias de reintentos, debugging operacional y logging con CloudWatch.

En el lado de la generación, la Lambda expone esto como una herramienta `search_skills` al modelo. El modelo decide qué buscar y cuándo. Para un skill de migración a PostgreSQL, podría buscar "patrones de migración de bases de datos", "mejores prácticas de PostgreSQL" y "versionado de esquemas" por separado, y luego sintetizar las partes útiles en un nuevo skill.

Eso cambia el resultado. Sin recuperación, el modelo escribe desde conocimiento general. Con recuperación, ha visto cómo otros autores de skills estructuraron guías similares, qué secciones incluyeron, qué herramientas referenciaron y cuán específicos fueron.

Personalmente, encuentro muy importante mostrar transparencia. Así que las fuentes de inspiración también aparecen en la UI. Puedes ver qué recursos existentes influyeron en el skill generado y hacer clic para ver los originales en Kiro Hub. Eso es útil durante el refinamiento. Si el modelo trajo algo que no es del todo relevante, puedes dirigirlo en otra dirección.

![Fuentes de inspiración del Registry](/articles/kiro-skill-generator/k8s-generation-2.png)

## Probando skills con Amazon Bedrock AgentCore Harness

Tenemos un skill basado en otros skills funcionales. Pero ¿cómo confiamos en que nuestro skill recién generado funciona como esperábamos?

Un skill no es solo markdown. Es un conjunto de instrucciones que un agente tiene que descubrir, cargar y seguir. No puedes evaluar eso correctamente leyendo el archivo. Necesitas ejecutarlo en algo cercano al entorno donde realmente se usará.

Ahí es donde encaja Amazon Bedrock [AgentCore Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html).

Un Harness es un entorno de agente gestionado y basado en configuración. Configuras el modelo, system prompt, skills, herramientas, memoria, límites y entorno de ejecución. Cada sesión se ejecuta en un entorno aislado, y reutilizar el mismo ID de sesión te permite continuar la conversación para pruebas de seguimiento. Esto me permite probar skills 'arriesgados' sin comprometer mis entornos.

Cuando un usuario prueba un skill generado, el sistema hace tres cosas:

Primero, la Lambda `test-skill` escribe el `SKILL.md` generado en el sistema de archivos de la sesión:

```text
/workspace/skills/test-skill/SKILL.md
```

Luego invoca el Harness con la ruta del skill y el escenario de prueba del usuario:

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
          "text": "Necesito ayuda configurando manejo de errores para mi Lambda en Node.js"
        }
      ]
    }
  ]
}
```

Finalmente, transmite la respuesta del agente de vuelta a la UI.

El detalle importante es que esto no es simplemente "poner el skill en el system prompt y llamar a un modelo". El skill se carga desde una ruta, se descubre a través de su frontmatter, y se activa cuando el escenario es relevante. Ese es el comportamiento de Agent Skill que me interesa probar.

Si la descripción del frontmatter es vaga, el agente puede no activar el skill. Si las instrucciones son demasiado amplias, la respuesta lo mostrará. Si los ejemplos son débiles, eso se vuelve obvio rápidamente.

Esta es una funcionalidad que quería tener en todo Kiro Hub. Poder probar si el recurso deseado funciona como esperábamos, que no tiene efectos secundarios (como inyección de prompts). Esta es la diferencia entre verificar si el markdown se ve bien y verificar si un agente realmente puede usarlo.

Harness me da aislamiento de sesión, acceso al sistema de archivos, pruebas de seguimiento con estado, y activación estándar de skills. Un Harness puede servir muchas solicitudes de prueba de forma segura porque el aislamiento viene de la sesión. Si el usuario quiere seguir probando, la misma sesión puede continuar la conversación con el skill aún disponible.

Eso importa para la experiencia del producto. Puedes generar un skill, ejecutar un escenario realista, hacer una pregunta de seguimiento, ver qué falla, y luego volver a refinar las instrucciones.

![Probando un skill con AgentCore Harness](/articles/kiro-skill-generator/haiku-generation-2.png)

## El flujo completo

Describes lo que necesitas en el panel lateral del chat. El modelo busca en el Registry recursos relevantes y genera un `SKILL.md`. Lo refinas en el chat si es necesario. Luego cambias a la pestaña Test, lo ejecutas contra el AgentCore, inspeccionas la respuesta, y haces cambios si algo no está claro.

![Flujo completo de generación](/articles/kiro-skill-generator/haiku-gen-resource.png)

Cuando publicas, el skill se escribe en DynamoDB y S3, luego se registra en AWS Agent Registry como un descriptor `AGENT_SKILLS`. Una regla de EventBridge dispara la auto-validación. Una función Lambda puntúa el skill con Bedrock en calidad de documentación, reusabilidad, completitud, claridad y especificidad, y luego lo aprueba o rechaza según el resultado.

Una vez aprobado, el skill está disponible en Kiro Hub e instalable con:

```bash
npx kirohub add <slug>
```

## Qué viene después

La siguiente pieza son los Agent Builders: un formulario guiado para crear configuraciones completas de agentes Kiro en `.kiro/agents/*.json`, no solo skills. La spec está escrita, la implementación es lo siguiente. Luego avanzar hacia generar y probar steerings, hooks y prompts siguiendo el mismo enfoque.

También estoy trabajando en Stacks: paquetes curados de recursos, agentes, skills y archivos de steering, instalables con un solo comando. Piensa en starter kits para tipos de proyecto comunes.

## Pruébalo

Ve a [kirohub.dev/generate](https://kirohub.dev/generate), describe lo que necesitas, y mira qué sale.

## Enlaces

- Kiro Hub: [kirohub.dev](https://kirohub.dev)
- Generar un Skill: [kirohub.dev/generate](https://kirohub.dev/generate)
- AWS Agent Registry: [docs.aws.amazon.com/bedrock-agentcore, Registry](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/registry.html)
- AgentCore Harness: [docs.aws.amazon.com/bedrock-agentcore, Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html)
- Kiro Skills docs: [kiro.dev/docs/skills](https://kiro.dev/docs/skills/)
