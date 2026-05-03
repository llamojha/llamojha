He pasado anos ayudando equipos a pasar de releases manuales a despliegues automatizados.

No en el sentido de "amo YAML" (ok... a veces), sino en el practico: ayudar equipos a pasar de un solo servidor con releases manuales a un setup que escala, revierte rapido y no te hace sudar cada release del viernes.

En los ultimos anos he tenido (y grabado) varias conversaciones sobre esto: despliegues basicos, monorepos, arquitecturas serverless y ese viaje clasico de tomar algo primitivo (una sola caja) y volverlo escalable y aburrido de operar.

> Voy a linkear esas charlas aqui:
> - Monorepos + deploys: [YouTube](https://www.youtube.com/watch?v=Dg2WcgMZ62Y) - Explico como estructuro y hago deploy de monorepos en la practica.

Y aqui va lo importante: en AWS no hay una sola forma correcta de desplegar. Hay varios patrones, cada uno con tradeoffs. La pregunta real es:

**Que problema estas resolviendo en realidad?**
- Downtime?
- Rollbacks lentos?
- Releases que se sienten como ruleta?
- "Desplegamos de noche porque da miedo"?

Este post es un mapa practico para que puedas:
- elegir un patron de despliegue (Rolling, Blue/Green, Canary/Weighted), y
- implementarlo con un checklist simple (sin ceremonia, solo buenos habitos).

---

## El mapa de despliegues

### Rolling

Rolling es el patron de "actualizar la flota gradualmente".

Si tienes 5 servers, actualizas uno, luego el siguiente, y asi. Puedes hacerlo:
- uno por uno,
- por porcentajes grandes (5% o 20% son comunes).

En AWS CodeDeploy, esos "cuantos a la vez?" vienen listos como configuraciones de despliegue tipo `CodeDeployDefault.OneAtATime`, `HalfAtATime` y `AllAtOnce`. ([AWS Documentation][1])

**Cuando Rolling es buena opcion**
- Quieres algo rapido, simple y toleras algo de riesgo.
- Tu sistema es **backward compatible** (mas sobre eso mas adelante).
- Puedes vivir con versiones viejas y nuevas coexistiendo durante el rollout.

**El catch (donde la gente se quema)**
- Si envias un cambio de DB o contrato API que rompe, rolling puede generar un outage parcial.
- Los rollbacks pueden ser mas lentos y desordenados porque se deshacen en pasos (y puede estar a medio rollout).

---

### Blue/Green

Blue/Green es el patron de "dos entornos, un switch".

Mantienes **Blue** (prod actual) corriendo, creas **Green** (nueva version) al lado, validas Green y luego mueves trafico. Si algo huele raro, vuelves atras. Rollback rapido, con menos estres.

Para ECS, AWS soporta despliegue **blue/green controlado por CodeDeploy**, donde validas el servicio nuevo antes de enviar trafico de prod. ([AWS Documentation][2])

**Por que elegir Blue/Green**
- Quieres rollback casi instantaneo: cambias el trafico y listo.
- Estas haciendo un cambio grande y no quieres versiones mezcladas.
- Te importa un cutover controlado y puertas claras de validacion.

**La desventaja principal**
- **Costo.** Corres un segundo stack tipo prod temporalmente.
- Necesitas al menos smoke tests antes del switch, si no solo estas tirando monedas mas rapido.

---

### Canary / Weighted

Mi historia favorita viene de minas: los canarios se usaban para detectar gas peligroso. El canario es tu alerta temprana.

En software: mandas la nueva version a una porcion pequena de trafico primero.

Ejemplo:
- 5% de usuarios pega la version nueva
- miras metricas
- si esta limpio, vas 10% -> 20% -> 50% -> 100%
- si no, paras y haces rollback con blast radius limitado

**Por que elegir Canary**
- Quieres control de riesgo. Aceptas un rollout mas lento por menos "oh no".
- Tienes observabilidad para decidir promover o hacer rollback.

**Lo que Canary exige**
- Metricas y thresholds claras (si no, es canary theater).
- Ventana de observacion definida (por ejemplo, 10% por 10 minutos y decidir).

---

## Mini tabla de decision

| Patron | Riesgo | Costo | Complejidad | Velocidad de rollback | Debes tener |
| --- | --- | --- | --- | --- | --- |
| Rolling / In-place | Medio-Alto | Bajo | Bajo | Medio | Backward compatibility |
| Blue/Green | Bajo-Medio | Medio-Alto | Medio | Rapido | Smoke tests + switch de trafico |
| Canary / Weighted | Bajo | Medio | Medio-Alto | Rapido (si es automatico) | Metricas, thresholds, ventana |

---

## Implementacion: ECS + ALB + CodeDeploy

Dijiste que no quieres un post gigante, asi que aqui va la version concisa que yo mostraria: **ECS detras de un ALB, desplegando con CodeDeploy**.

El modelo mental clave:
- Los **target groups del ALB** son tus destinos blue vs green.
- **CodeDeploy** orquesta el despliegue y el cambio de trafico.
- Tu **AppSpec** le dice a CodeDeploy que desplegar (task definition, container name y port).

### Los bloques (lo que necesitas)

1. Un **Application Load Balancer** con listeners
2. **Dos target groups** (blue + green) - mas un listener/puerto de test opcional si quieres validar antes del trafico de prod ([AWS Documentation][3])
3. Un **ECS service** configurado para despliegues blue/green (deployment controller = CodeDeploy) ([AWS Documentation][2])
4. Un **AppSpec file** para despliegues ECS (esto le dice a CodeDeploy tu task definition + container details) ([AWS Documentation][4])

### El flujo (que pasa durante un despliegue)

- Registras una nueva revision de task definition (nueva imagen/tag).
- CodeDeploy lanza la version green detras del target group green.
- Corren health checks y validacion del listener de test si aplica.
- Si todo va bien, el trafico cambia a green.
- Si no, rollback es basicamente parar y dejar blue sirviendo.

Si quieres el camino mas corto a "puedo hacerlo": sigue los pasos del tutorial de AppSpec + ECS/CodeDeploy y manten la primera version simple. ([AWS Documentation][4])

---

## El checklist de release seguro

No querias un checklist gigante, asi que aqui va el minimo viable:

- **Backward compatibility**: migraciones de DB y contratos de API no rompen la coexistencia.
- **Observabilidad basica**: error rate + latencia + logs trazables (un correlation id ayuda mucho).
- **Regla de decision**: "Si X pasa (threshold) por Y minutos (ventana), hacemos rollback."
- **Rollback es real**: lo has practicado al menos una vez, no solo asumido.

---

## Anti-patterns

- **Canary sin metricas** -> no es canary, es esperanza.
- **Blue/Green sin smoke tests** -> solo estas fallando mas rapido.
- **Migraciones de DB destructivas** -> la forma mas rapida de hacer rollback imposible.
- **Deploys enormes todo-en-uno** -> cambios mas pequenos; menos blast radius.

---

## TL;DR

- **Rolling / in-place**: simple y rapido, con backward compatibility. Mas barato, pero mas riesgoso si rompes algo. ([AWS Documentation][1])
- **Blue/Green**: cutover limpio + rollback rapido, si puedes pagar costo temporal extra. Ideal para cambios grandes. ([AWS Documentation][2])
- **Canary / weighted**: el rollout mas seguro con trafico gradual y observacion. Requiere metricas reales + thresholds.

Si quieres, dime tu setup actual (ECS en EC2? Fargate? un servicio? varios?) y te ayudo a elegir el patron que mejor encaja con tu realidad.

---

## Links (copy/paste)

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