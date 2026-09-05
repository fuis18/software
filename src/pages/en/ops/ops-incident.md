---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Incident
subtitle: Incident and alert management
---

Incidents are part of ops work. The difference between chaos and a process lies in prior preparation: defining measurable reliability objectives, alerting the right person, and learning from every outage.

## SLO / SLI / SLA

The vocabulary of "how reliable do we promise to be?"

| Concept | Term                 | What is it?                                                                                 | Asks                                      | Example                                                                          |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| SLI      | Service Level Indicator | The real-time measure of service performance.                              | How is the service performing right now?  | The current service latency is 45 ms at the 99th percentile of requests.         |
| SLO      | Service Level Objective | The internal performance target the technical team aims to maintain.                     | What performance level do we want to reach?     | 99% of requests must respond in under 100 ms each month.            |
| SLA      | Service Level Agreement | The legal or commercial agreement signed with the customer (with penalties for breach). | What happens if the service doesn't meet the promise? | If availability drops below 99%, 10% of the invoice is refunded." |

The three terms are the same data looked at from three different angles, and there's a dependency relationship between them: the **SLI** is the raw measurement; the **SLO** is the threshold the team sets on that measurement; the **SLA** is the commercial promise signed _on top of_ the SLO, almost always with a safety margin — the SLA should never be stricter than the internal SLO, because if the SLO fails before the SLA, the team loses the reaction margin needed to correct before there are contractual consequences.

- The **SLO** is the reference: the alert should sound _before_ the SLO is at risk, not after it's already been lost.
- Reliability isn't "ensured": an objective is defined, measured, and the **error budget** that implies is accepted — if the SLO is 99.9% availability, the remaining 0.1% is error budget the system is allowed to spend (on failures, risky deployments, maintenance) without that being, in itself, a failure.
- **Why this matters beyond ops:** a well-defined SLO gives the team an objective language for deciding when to stop new features and focus on stability (when the error budget runs out) and when there's room to move fast and take risks (when there's budget to spare).

## Alerting

The layer that turns an out-of-range metric into a notification to a human who can act.

### PagerDuty

**Profile:** the reference platform in on-call and escalation — manages on-duty calendars, escalation policies, and integration with the monitoring tools that trigger alerts.

- **Strengths:** highly configurable escalation policies (if the on-call person doesn't respond in X minutes, escalates to the next), mature integrations with almost any alert source (Prometheus, Datadog, etc.), good support for postmortems and incident analysis integrated into the same flow.
- **Use cases:** organizations with formal on-call rotations and strict escalation needs, large teams with multiple services and different alert policies per team.
- **Weaknesses:** per-user cost can be heavy for large teams; configuring complex escalation policies has a real learning curve.

### Opsgenie

**Profile:** similar profile to PagerDuty — alerting and on-call, with strong integration into the Atlassian ecosystem (Jira, Confluence).

- **Strengths:** natural integration if the rest of the stack already lives in Atlassian, good support for rotating on-duty calendars and multi-channel notification rules (push, SMS, call).
- **Use cases:** teams already using Jira/Confluence for the rest of their flow wanting alerts to connect naturally to those tickets.
- **Weaknesses:** outside the Atlassian ecosystem, it offers less differentiated value compared to PagerDuty.

| Platform    | Profile             | Use                                |
| ------------- | ------------------ | ---------------------------------- |
| **PagerDuty** | On-call and escalation | Page the on-call person    |
| **Opsgenie**  | Alerting and on-call | On-duty schedule and notifications |

### Good alerting

- **Alert ≠ noise** — if an alert doesn't require action, it's not an alert: it's noise that ends up ignored (and ignored alerts are worse than having none, because they train the team to distrust all of them). Every alert should be able to answer "what do I need to do right now if this fires?" — if the answer is "nothing, just look," it probably should be a dashboard, not an alert.
- **Correct routes** — each type of alert reaches the person who can act: critical to on-call (interrupts, no matter the time), warning to the team channel (reviewed during business hours, doesn't wake anyone). Sending everything to the same channel with the same urgency is the fastest way to generate alert fatigue.
- **Escalation** — the alert doesn't negotiate: if no one responds, it escalates to more people until someone takes it. This protects against the case where the on-call person is literally unable to respond (no signal, asleep, phone on silent) — the system can't depend on a single person always being available.
- **The error budget guides the alert** — rules are defined to protect the SLO, not to compensate for its absence: an alert without an SLO behind it is just an arbitrary threshold chosen by eye, with no objective way to know if it's well calibrated. See [ops-observability](../ops-observability/).

## On-Call

Who's available and how their effectiveness is guaranteed — the on-call without the other two pieces (runbooks, accessible documentation) is just a person with anxiety and no tools.

- **On-call rotation** — one person responsible per shift, with clear schedule and handoff. The clarity of the handoff matters as much as the shift: if it's not clear when someone's responsibility ends, two people may assume the other is covering, and no one responds.
- **Runbooks** — the ready manual for what to do with each known incident: you don't think under pressure, you consult. A good runbook assumes the reader has a racing pulse at 3am and has no room to interpret ambiguity — concrete steps, not general system theory.
- **Accessible documentation** — dashboards, runbooks, and contacts one click from the alert. Every second the on-call person spends looking for where the correct dashboard is is time the incident remains active; the alert itself should carry the links, not force you to go find them.

## Post-mortems

Learning after the incident — what turns chaos into process.

- **No blame** — the blame seeker destroys the information the incident left behind: if honestly telling what you did during the incident could be used against you, next time the story told is more defensive and less accurate, and the team loses exactly the information it needed to prevent recurrence.
- **Timeline** — what happened in what order, with enough detail to understand why: not just "at 14:32 the service went down," but the complete sequence of signals, decisions, and actions that led to that point and to resolution.
- **Actions** — findings that become concrete tasks with owner and date: a post-mortem that ends in a list of "we should improve X" with no owner or date is, in practice, a post-mortem that didn't generate any real change.
- **Expand the system, not just the symptom** — fixing the trigger isn't enough: the question is what process failed to let it happen. Fixing the specific bug prevents _that_ incident; understanding why the system allowed a single bug to reach production without detection prevents the next entire category of incidents.

> A well-managed incident leaves the system stronger: the recorded story, the updated runbook, and the actions in progress. It's the same continuous improvement idea that sustains [ops-reliability](../ops-reliability/).
