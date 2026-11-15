---
eyebrow: Dev
title: Dev Architectures
subtitle: Patrones de arquitectura de software
group: Arquitectura
order: 13
summary: "Arquitectura de software en tres escalas: patrones de sistema (monolito, SOA, microservicios, event-driven, serverless, layered/MVC), estilos de código (Clean, Hexagonal, Onion, DDD), estructura de carpetas y cuándo elegir cada uno."
---

La forma en que se organiza el código y los procesos determina cómo se escala, despliega y mantiene un sistema. Cada arquitectura resuelve un problema distinto — y ninguna es "la mejor" por sí sola. La arquitectura aparece en tres escalas — el sistema (qué se despliega), las carpetas del repo (cómo se arma el proyecto) y el código (cómo se organiza cada servicio por dentro) — y esta página las recorre las tres.

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

## Patrones emergentes

| Patrón                                 | Qué resuelve                                          | Cuándo adoptarlo                                                                     |
| -------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Data Mesh**                          | Descentralizar la propiedad de los datos por dominio  | Cuando 5+ equipos independientes trabajan sobre datos y el equipo central es cuello de botella |
| **Data Fabric**                        | Integración automatizada y guiada por metadatos       | Cuando la integración manual entre fuentes se vuelve el cuello de botella            |
| **Capa semántica centralizada**        | Una sola definición de verdad para cada métrica       | Cuando marketing, finanzas y ops definen "ingresos" de formas distintas               |
| **MCP para datos**                     | Agentes de IA que consultan el pipeline sin API a medida | Cuando los agentes necesitan datos del warehouse sin endpoints manuales             |

- **Data Mesh vs Data Fabric** — el mesh cambia la organización (dominios dueños de sus datos, con sus propios contratos y calidad); el fabric cambia la infraestructura (la plataforma integra sola, guiada por metadatos). No se excluyen: suelen aparecer juntos en plataformas grandes.
- Las piezas técnicas de estos patrones viven en [ops-modern-data-stack](../../ops/ops-modern-data-stack/) (linaje, catálogo, métricas) y el protocolo de datos para agentes en [ai-mcp](../../ai/ai-mcp/).

## Estructura de carpetas

La misma idea a escala de carpetas: el layout del repo debería reflejar el **dominio de la app**, y tiene dos respuestas clásicas.

### Screaming Architecture (Feature-Based)

La estructura de carpetas debería reflejar el **dominio de la app** y "gritar" de qué se trata, no qué framework usa. En la práctica se agrupa por feature en vez de por capa técnica — el paso del camino está en [web-roadmap](../web-roadmap/).

```
src/
  features/
    auth/
      components/    # LoginButton, LoginForm
      hooks/         # useAuth, useUser
      services/      # loginApi, registerApi
      types/         # UserInterface
      index.ts       # Punto de entrada (Public API)
    shopping-cart/
      components/
      store/
      index.ts
  shared/            # Componentes globales (Botones, inputs genéricos)
```

### Capas en carpetas

Agrupar por capa técnica, la alternativa clásica: `components/`, `hooks/`, `services/`, `pages/`, `utils/` — sin confundir con el patrón de sistema **Layered / MVC** de arriba: esto agrupa *archivos*, aquello separa *capas del sistema*.

```
src/
  components/
  hooks/
  services/
  pages/
  utils/
```

**Cómo elegir:** Layered para proyectos simples donde el tipo de archivo manda; Screaming/Feature-Based cuando la app crece y varias features tocan las mismas capas, para que cada feature quede autocontenida y se pueda mover o eliminar como unidad.

Los principios detrás de estas decisiones — KISS, YAGNI y DRY — están en [dev-principles](../dev-principles/).

## Estilos arquitectónicos

Cómo se organiza el código dentro de cada servicio — una escala más fina que los patrones de sistema de arriba.

| Estilo                 | Idea base                                                       |
| ---------------------- | --------------------------------------------------------------- |
| **Clean Architecture** | Las reglas de negocio en el centro, dependencias hacia adentro. |
| **Hexagonal**          | Puerto-adaptador: el dominio no conoce a la infraestructura.    |
| **Onion**              | Capas concéntricas con el dominio en el núcleo.                 |
| **DDD**                | Modelar el dominio del negocio con su propio lenguaje.          |
| **MVC**                | Model / View / Controller — ver el paso 2 de [back-roadmap](../back-roadmap/). |

### Recursos

- ArchView — System Design Patterns Diagrams
- Software Architecture Diagram Examples
- Awesome Software and Architecture Design Patterns
- Digital Platform Architect — Architecture Styles & Patterns

## Las arquitecturas no son excluyentes

- Un **monolito bien modular** (código separado por módulos pero en un solo deploy) puede ser la mejor opción aun en equipos medianos.
- Es común que un sistema combine patrones: una API **Layered** de cara al público, con un flujo **Event-Driven** internamente y funciones **Serverless** para tareas puntuales.
- La regla práctica: empezar simple (monolito/layered), y mover piezas a otras arquitecturas cuando el problema real lo exige — no adoptar arquitectura por moda.

Cuando un sistema elige de verdad uno de estos patrones, merece la pena escribir el razonamiento: requerimientos, documentos, diagramas y ADR están en [dev-planning](../dev-planning/).