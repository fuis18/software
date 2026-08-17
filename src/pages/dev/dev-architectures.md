---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Dev Architectures
subtitle: Patrones de arquitectura de software
---

La forma en que se organiza el código y los procesos determina cómo se escala, despliega y mantiene un sistema. Cada arquitectura resuelve un problema distinto — y ninguna es "la mejor" por sí sola.

## Los patrones

| Name               | Descripción                                                                                                   | Uso                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Monolith**       | Aplicación única donde frontend, backend y lógica viven en un solo proyecto y proceso                         | Apps pequeñas/medianas, MVPs, sistemas internos, startups en etapa inicial               |
| **SOA**            | Sistema compuesto por servicios independientes que se comunican vía red (generalmente con contratos formales) | Empresas grandes con integración entre múltiples sistemas corporativos                   |
| **Microservicios** | Conjunto de servicios pequeños, autónomos y desplegables de forma independiente                               | Plataformas grandes, sistemas que necesitan alta escalabilidad y equipos distribuidos    |
| **Event-Driven**   | Componentes que reaccionan a eventos (mensajes) en lugar de llamadas directas síncronas                       | Sistemas con alta concurrencia, procesamiento en tiempo real, IoT, fintech               |
| **Serverless**     | Funciones independientes que se ejecutan bajo demanda en la nube                                              | APIs ligeras, backend para apps móviles/web, startups que buscan reducir infraestructura |
| **Layered / MVC**  | Separación por capas: presentación, lógica de negocio y acceso a datos                                        | Aplicaciones web tradicionales, APIs estructuradas, sistemas empresariales               |

## Cómo elegir

- **Monolith** — el punto de partida correcto para la mayoría de los proyectos: un solo proceso que se despliega entero y se entiende de una vez. Se extrae a microservicios cuando el tamaño del equipo, la velocidad de deploy o la escala empiezan a justificar la complejidad extra.
- **SOA vs. Microservicios** — ambos dividen el sistema en servicios; SOA los piensa como unidades corporativas reutilizables con contratos formales (a menudo con un bus de integración), mientras que los microservicios los piensan como unidades de negocio pequeñas, autónomas y desplegables por separado. Los microservicios traen consigo la necesidad de observar y orquestar la comunicación entre servicios: ver [back-technologies](../back-technologies/) para las formas de comunicación y [ops-sdn](../../ops/ops-sdn/) para el service mesh.
- **Event-Driven** — desacopla productores de consumidores: en vez de llamar a otro componente y esperar su respuesta, se publica un evento y cada interesado reacciona. Es la base de la mensajería asíncrona de [back-technologies](../back-technologies/).
- **Serverless** — la infraestructura desaparece: funciones que corren bajo demanda, escalan solas y se cobran por ejecución. Las plataformas que las hospedan se ven en [ops-cloud](../../ops/ops-cloud/).
- **Layered / MVC** — la separación en capas es la base sobre la que se construyen casi todas las demás: separar presentación, lógica y datos es lo que permite cambiar una sin reescribir las otras.

## Las arquitecturas no son excluyentes

- Un **monolito bien modular** (código separado por módulos pero en un solo deploy) puede ser la mejor opción aun en equipos medianos.
- Es común que un sistema combine patrones: una API **Layered** de cara al público, con un flujo **Event-Driven** internamente y funciones **Serverless** para tareas puntuales.
- La regla práctica: empezar simple (monolito/layered), y mover piezas a otras arquitecturas cuando el problema real lo exige — no adoptar arquitectura por moda.