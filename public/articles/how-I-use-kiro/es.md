![Cómo uso Kiro — flujos de trabajo y patrones principales](/articles/how-I-use-kiro/banner.png)

## 1. Por qué uso Kiro

Llevo casi 1 año usando Kiro, lo uso como Arquitecto Cloud y también para construir proyectos personales por diversión. La razón principal por la que uso Kiro frente a otras herramientas es cómo trabaja contigo como ingeniero. A lo largo de los meses, he notado ciertos patrones en cómo lo uso. Vamos a repasarlos:

## Índice

* [1. Por qué uso Kiro](#1-por-qué-uso-kiro)
* [2. Pair Programming con Kiro](#2-pair-programming-con-kiro)
* [3. Flujos de trabajo repetibles como Skills](#3-flujos-de-trabajo-repetibles-como-skills)
* [4. Usar Plan, Specs y Agentes](#4-usar-plan-specs-y-agentes)
* [5. El Consejo de Agentes](#5-el-consejo-de-agentes)
* [6. Documentación, Documentación, Documentación](#6-documentación-documentación-documentación)

## 2. Pair Programming con Kiro

![Pair Programming con Kiro — tú diriges, Kiro ejecuta](/articles/how-I-use-kiro/pair-programming.png)

La forma más común en la que uso Kiro es haciendo Pair Programming. El Pair Programming es cuando hay 2 desarrolladores trabajando juntos en la misma tarea; pueden trabajar en tándem o uno de ellos puede ser quien guía/planifica mientras el otro escribe el código. En mi caso, con Kiro, yo soy quien guía y planifica mientras Kiro es quien ejecuta e implementa el código.

También uso Kiro como mi pato de goma (rubber duck). Si tengo una idea nueva o estoy atascado con un bug, hablo con Kiro para que me dé un punto de vista diferente, investigue y me oriente hacia buenas prácticas.

La razón principal para hacerlo de esta manera es que, una vez que termina la sesión, puedo ejecutar un prompt/skill para registrar todo lo de la sesión:

> Kiro, resume esta sesión y guárdala en una carpeta `.memory` con el formato yyyymmdd y como markdown

Así, todo lo que hemos hecho queda registrado ahí.

¿Recuerdas todo lo que hiciste ayer? Puede ser. ¿Pero qué hay de la semana pasada? ¿Y de hace un mes? Yo desde luego no lo recuerdo.

En el clásico Ciclo de Vida del Desarrollo de Software tenemos tickets, y tenemos una forma de recuperar toda esa información, pero el contexto más detallado de por qué lo hiciste se pierde por completo.

Ahora, con herramientas como Kiro, esto sí se puede recordar. Solo necesitas una carpeta `.memory` donde resumes todas tus sesiones. Así, en el futuro, podríamos tener una situación como esta:

> Oye, no recuerdo qué cambios hice en este clúster hace dos meses, y ahora mi jefe me está preguntando por ello. Basándote en las sesiones de hace dos meses, dime qué hicimos en el clúster ordenado por fecha

Y Kiro me va a salvar el día.

## 3. Flujos de trabajo repetibles como Skills

![Flujos de trabajo repetibles como Skills — automatiza, estandariza, escala](/articles/how-I-use-kiro/repeatable-workflows-as-skills.png)

Mi experiencia como ingeniero DevOps me ha enseñado a automatizar todo. A veces usarás Kiro para hacer una tarea repetitiva, como:

* entrar en AWS y revisar el estado de facturación y las cuotas de presupuesto;

* hacer una revisión de seguridad de CVE recientes contra nuestro código y las versiones que usamos;

* revisar todas las alertas que ocurrieron la semana pasada.

Estas son cosas repetitivas que hago, y tienen ciertos scripts o comandos que le pido a Kiro que ejecute una y otra vez.
Podemos automatizar esto registrándolo como un prompt o skill. Con Kiro, simplemente puedo decir:

> Vale, acabamos de hacer todo esto. Ahora regístralo como un skill o como un prompt.

Así, la próxima vez que necesite revisar la facturación o las alertas, solo voy a pedirle a Kiro:

> revisemos las alertas, usa el skill alerts_review.md

Y va a leer el skill y empezar a hacerlo tal como ya lo diseñamos. Y como la primera vez que lo hiciste funcionó, ayuda a asegurar que Kiro use los mismos pasos, lo que hace menos probable que alucine o se desvíe del objetivo principal.
Si es una tarea repetible, regístrala y haz que puedas reutilizarla.

## 4. Usar Plan, Specs y Agentes

![Usar Plan, Specs y Agentes — del plan a la ejecución con control](/articles/how-I-use-kiro/plan-specs-agents.png)

Normalmente empiezo una tarea nueva siguiendo tres pasos principales:

* Primero entro en modo plan (built-in del CLI), doy la idea general de mis tareas y, junto con Kiro, entramos en una sesión de preguntas y respuestas para aclarar los objetivos, las lagunas y la implementación. Personalmente me encanta esta función; tener este feedback de ida y vuelta me ayuda no solo a planificarlo bien, sino a hacerme pensar a fondo. Una vez que el plan está listo, le pido que lo escriba como un Spec.
* La alternativa en el IDE es usar las funciones de Spec integradas, que generan un Requirements.md, Design.md y Task.md con pausas después de cada uno que te permiten leerlos y verificarlos. Los Specs no solo son útiles para definir la tarea en cuestión, sino también para tener un registro de las decisiones tomadas para implementarla.
* El paso final es asegurarme de que Kiro use mis sub-agentes personalizados. Le pido a Kiro que revise la lista de tareas y la optimice para usar sub-agentes y ejecuciones en paralelo. He construido un registro para Kiro Context (kirohub.dev) donde tengo montones de agentes personalizados que son muy útiles para este caso.

No uso el auto-approve completo. Me gusta ver qué está haciendo realmente y cómo lo está haciendo, algo que creo que Kiro hace muy bien como herramienta. No es una herramienta que simplemente va a hacer one-shot y vibe-codear tus cosas. Es una herramienta que te permite ver lo que hace, y te pide feedback y permisos, lo cual, como ingeniero, agradezco mucho porque me mantiene en el bucle.

Al final de la implementación de la tarea, hago dos cosas:

* code review: tengo un prompt para hacer code review de todos los cambios en staging y luego añadirlos como una lista de TODOs para ir arreglándolos uno por uno. Suelo hacer esto también con un modelo diferente para obtener un 'segundo punto de vista'.
* Pre-Mortem: ejecutar un escenario en el que fingimos que la implementación de la tarea falló, como un post-mortem pero antes de que siquiera ocurra.

## 5. El Consejo de Agentes

![El Consejo de Agentes — múltiples perspectivas, una mejor decisión](/articles/how-I-use-kiro/council-of-agents.png)

Aunque el pair programming y el método del pato de goma normalmente funcionan bien, a veces quiero ver diferentes puntos de vista o hacer brainstorming de ideas nuevas. Para este caso concreto construyo lo que llamo 'El Consejo de Agentes'.

Creé un sub-agente para Opus, un sub-agente que usa Sonnet, un sub-agente que usa Haiku, y así sucesivamente.
Luego tengo un sub-agente que va a ser el regente del consejo, que va a invocar a esos sub-agentes para una tarea específica.

Funciona muy bien porque, aunque pueden ver puntos similares, cada uno suele ver algo diferente. Luego simplemente elijo lo mejor de cada uno. Reduciendo la posibilidad de alucinaciones salvajes.

## 6. Documentación, Documentación, Documentación

![Documentación, Documentación, Documentación — capturar, estructurar, transformar, compartir](/articles/how-I-use-kiro/documentation.png)

La documentación es esa cosa que todos amamos pero que cuesta hacer de verdad. Cuando empiezo a trabajar en un proyecto existente, normalmente voy y leo toda la documentación, encontrando cosas que están deprecadas, que ya no se usan, y obteniendo una versión desactualizada del sistema.

La forma en que abordo esto con Kiro es pedir un análisis del código y generar dos archivos markdown principales:

* Un detalle de muy alto nivel de la lógica de este código, con diagramas simples en Mermaid.
* Una explicación muy profunda y detallada del código. Diagramas de arquitectura en Mermaid y fragmentos de código.

Una vez que obtiene toda la información y la pone en esos dos archivos Markdown, lo que voy a pedir es que cree algunos archivos HTML para que pueda mostrármelo de una forma fácil de leer. Prefiero tema oscuro, un TLDR al inicio y algunos puntos de feedback/gotchas al final.

A partir de ahí, puedo profundizar en las cosas específicas que quiero.

Quizás quiero ver solo diagramas, expandirlo a formato drawio, ver cómo se interconecta el sistema, mostrar fragmentos del código, añadir enlaces al SDK o a la documentación de terceros. Así que, dependiendo de lo que quiera hacer o lo que quiera ver, voy a pedir eso y crear más documentación.

Cuando comparto esta documentación siempre me fijo en quién va a ser el usuario objetivo. Si va a ser documentación de contexto para que la use otra herramienta de IA, entonces elegiré formato Markdown. Si va a ser un informe para que lo lean otras personas, entonces será HTML.

## Reflexiones finales

Así es como **yo** uso Kiro. Para mí, no se trata solo de pedirle a una herramienta de IA que escriba código. Se trata más de cómo puedo usarla en diferentes partes de mi flujo de trabajo.

Esa es la parte importante para mí. No quiero que la herramienta simplemente se vaya y lo construya todo por sí sola. Quiero ver qué está haciendo. Quiero dar feedback. Quiero mantener el contexto. Y quiero reutilizar las cosas que funcionan. Por eso Kiro encaja con mi forma de trabajar.

Me encantaría ver cómo otras personas están usando Kiro o cualquier otra herramienta de IA en su día a día. ¿Usas alguna de las formas que mencioné? ¿Tienes alguna manera de trabajar con IA que te haya funcionado bien? Por favor, compártela en los comentarios.
