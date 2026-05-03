## Mi fase de "vibe coding"

Empece con vibe coding como casi todos: queria momentum. Use AI para revivir proyectos que nunca termine y para construir un juego sencillo tipo survival. Alcance pequeno, feedback rapido, dopamina instantanea. Funcionaba y cumplia.

En ese modo, el flujo es: *idea -> prompt -> code -> tweak -> ship*. Para juegos chicos y proyectos de fin de semana, es un cheat code. No optimizas arquitectura perfecta; optimizas que algo viva.

Pero hay una trampa: vibe coding se siente tan bien que intentas usarlo para todo... incluso cuando el proyecto deja de ser pequeno.

## El punto de quiebre: la complejidad hace que el AI derive

Cuando pase a "apps reales", sitios completos con backend, base de datos, auth, todo el stack, aparecio la friccion. No porque el AI sea inutil, sino porque la falta de planning se vuelve el plan.

A esa escala empece a perder contexto. La herramienta hacia *algo*, a veces impresionante, pero no siempre lo que yo queria. Los diffs crecian, los cambios se volvían difusos y yo iba descubriendo de que era el proyecto mientras lo construia.

Cuando el repo es grande, el AI se distrae. Deriva. Y la deriva es cara.

Asi que volvi a algo muy aburrido. Muy engineering. Muy de "funciona en prod".

## El cambio: Spec-Driven Development

En algun punto me di cuenta: como ingenieros ya tenemos un sistema para "cambios grandes sin caos".

Hacemos sprint planning. Curamos tickets. Escribimos acceptance criteria. Partimos el trabajo. Revisamos. Shipeamos. El mismo concepto.

Asi que empece a hacer eso con AI: en lugar de un prompt grande, creaba "tickets" (o docs) con contexto y acceptance criteria, y los iba resolviendo uno por uno. Cada paso tenia una definicion clara de done, y yo podia verificar progreso sin rezar para que el agente "entienda la vibra".

Despues supe que este enfoque tiene nombre: **Spec-Driven Development** - usar un spec bien armado como fuente de verdad de lo que se va a construir (muchas veces con agentes AI ayudando a implementarlo).

Esta es la version mas simple del contrato de spec que termine usando:

- **Goal** (lo que queremos lograr)
- **Non-goals** (lo que explicitamente no vamos a hacer)
- **Acceptance criteria** (como sabemos que esta listo)
- **Plan** (tareas chicas con "done" claro)
- **Risks** (y como mitigarlos)

Eso es todo. No es burocracia. Es estructura suficiente para que el AI no improvise en tu codebase.

## Por que Kiro lo hizo practico

Aqui fue donde Kiro hizo click.

Kiro es un IDE agentico que trae *estructura* al coding con AI mediante specs, tasks y hooks de automatizacion. En pocas palabras: ayuda a pasar de energia de prototipo a habitos de produccion.

Y lo grande: no es magia negra. Es un workflow.

Lo que hago en la practica se ve asi:

1. **Arranco de un issue / ticket de GitHub**
   Escribo issues como siempre (contexto + acceptance criteria), y le pido a Kiro que convierta ese contexto en un spec. (El PM interno escribe el contrato; Kiro ayuda a ejecutar.)

2. **Spec -> tasks -> PR**
   Cuando el spec esta claro, las tareas se vuelven chicas y verificables. Eso mantiene los diffs coherentes y los PRs revisables, porque no dejas que el agente "hierva el oceano".

3. **Guardrails para que el agente no se vaya de paseo**
   Mi regla personal sigue igual: **el agente propone; yo acepto con tests.**

4. **Bonus: encaje con el ecosistema AWS (especialmente infra)**
   En mi mundo, el angulo AWS importa. Kiro puede cargar contexto especializado, como un power de AWS CDK, para no re-explicar todo cada vez.

Si quieres explorar el ecosistema alrededor de este flujo (mas alla de Kiro), dos referencias utiles:
- **Kiro**: https://kiro.dev/
- **Spec-Driven Development** (overview / discussions): https://www.geoffreylitt.com/2024/02/16/specs.html
- **OpenSpec**: https://github.com/yaniv-golan/openspec

Mi takeaway: vibe coding es genial para empezar. Los specs son como terminas, sobre todo cuando el proyecto es mas grande que tu memoria de corto plazo. Kiro mantiene el loop practico y concreto, no proceso por proceso.

Si quieres una linea de cierre fuerte para el post, yo usaria:
**"Deja de perseguir mejores prompts. Escribe un mejor contrato."**