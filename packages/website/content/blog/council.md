---
title: Cuando dudes, /council
date: 2026-08-16
description: Te cuento una estrategia para poder debatir tu propio plan.
tags:
  - tech
  - ia
published: true
---

おはよう！

Hola gente, ¿cómo andan? Hace una banda no escribía y, hoy, domingo, día del niñe, mientras me tomo un [soju de durazno](https://www.winewarehouse.com.my/product/good-day-peach-soju/), me pintó escribir. Te súper recomiendo el soju, licor de arroz.
## A todos nos pasa, dudamos
Hace poco pude volver a sentarme a pensar y escribir código, un placer. Me puse a trabajar en armar un [MCP](https://platform.claude.com/docs/en/agents-and-tools/remote-mcp-servers) de Bilog para crear la capa de capabilities de nuestra inteligencia artificial. Esto nos va a permitir dos grandes cosas:
1. Poder separar el desarrollo de capacidades ([skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), [connectors](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector), plugins) de iAngela como inteligencia artificial del desarrollo de las [tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) propias de nuestra IA, como por ejemplo: agendar un turno.
2. En una segunda fase, permitir que servicios terceros a nosotros puedan consumir esas tools, en criollo: poder conectar otras AI a nuestro MCP.

Pero el desarrollo de esto es un cambio de arquitectura importante y por eso me puse a armar un plan con mi *bff* – esto googlealo, dale –, Claude. Para esto usé el modelo Fable 5 con [/effort](https://platform.claude.com/docs/en/build-with-claude/effort) en *xhigh*, para más placer. Fable 5 es el modelo safe de Mythos de Anthropic, ¿te acordás, ese modelo que teóricamente podía **hackear toda la Matrix y hacer Terminator en dos días**? Ese. Y si no tenés la menor idea de qué te estoy hablando, podés ir y leer [Project Glasswing](https://www.anthropic.com/glasswing) de Anthropic.

Perdón, me volé. Te decía que usé ese modelo porque es el *modelo frontier* de mayor razonamiento de Anthropic, esto significa que para tareas complejas – como puede ser un cambio de arquitectura en software –, performa sobresaliente. Te digo que, si bien Opus 5 tiene muchísima capacidad, en lo que noto la diferencia es en los *assumptions* que hace el modelo y, en general, no son equívocos. Esto me hace pensar que, a mayor capacidad de razonamiento del modelo, menos es la alucinación. Obviamente esto tiene que estar acompañado de un buen manejo del context.
## El uso del council, lo importante de este post
Bueno, me fui un poco, pero la idea era contarte un poco en lo que estuve laburando estos días. Lo jugoso de todo esto: el uso del council para debatir el plan de implementación del MCP.

Si no tenés la menor idea de lo que te estoy hablando, podés revisar [este repo](https://github.com/karpathy/llm-council) que lo explica a detalle. Si bien yo no usé ese repo, ni hice este tipo de implementación, me armé un skill */council* que, en términos prácticos, hace lo mismo.

### ¿Qué es /council?
Imaginate que tenés un plan de marketing, o un plan de contenido de redes sociales; ni idea, lo que a vos te sirva. Y tenés dudas del plan que generaste con un LLM – en mi caso, siempre opto por Claude –, ese es el momento justo para usar /council.

Lo que hace: crea 4 agentes nuevos con diferentes tipos de rol.
1. El *counter*, que está configurado para encontrar todas las fallas de tu plan.
2. El *pragmatic*, un agente que solamente le interesa que las cosas sean lo más pragmático posible.
3. El *risk-officer*, básicamente el que tiene miedo de todo y busca los riesgos de todo lo que se plantea.
4. El de tu elección, en general uso un agent que esté técnicamente diseñado para lo que necesito hacer. Imaginate que es un expert en Marketing, usando el ejemplo del plan de marketing.

Entonces, 4 agentes con las capacidades del modelo que estás usando, por ejemplo Fable 5, van a debatir tu plan en busca de todos estos puntos que te listé anteriormente. Si el uso de un agent solo te parece bueno, imaginate 4 debatiendo a la vez y el Claude main planner – al que le pediste que corra el skill – están revisando el plan. Bastante útil, ¿no?

![Síntesis del council debatiendo el plan del MCP de iAngela](/blog/images/council-sintesis-plan-mcp.png)

## Conclusión
Hoy ya no hay dudas que la IA escribe mejor código que nosotros, pero la duda que se me presenta está en: *¿cuántas cosas más van a hacer mejor que nosotros?*

Ojalá que no muchas, porque qué nos queda a la humanidad, ¿no?

Vuelvan a lo analógico, pajeros. Comprate un disco.

またね、👋

