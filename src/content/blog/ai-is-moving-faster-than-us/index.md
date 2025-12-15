---
title: "AI Is Moving Faster Than Us: Safety Is How We Keep Control"
description: "Why AI failures come from system design, Shadow AI, and missing governance, and how to build safe AI systems without slowing innovation."
date: "Dec 14 2025"
draft: false
tags:
  - AI
  - Safety
---

At DevFest Semarang 2025, I gave a talk titled **"AI & Safety"**. It was not meant to impress people with model capabilities or flashy demos. It was meant to slow the room down.

Because while AI keeps accelerating, most organizations are still deploying it with assumptions borrowed from traditional software. That gap is already causing real damage.

### Humans Evolved Slowly. Technology Didn't.

Human cognition evolved over thousands of years. Technology, especially AI, does not wait for us to catch up.

In the last five years alone, AI capabilities have accelerated faster than our ability to fully understand, govern, and control them. That mismatch matters.

When people talk about AI failures, they often assume the models were not "smart enough". In reality, most failures have nothing to do with intelligence.

AI fails because:
- Humans misuse it  
- Systems are deployed without security boundaries  
- Data flows are poorly understood  
- Governance is added too late or not at all  

AI risk is rarely a model problem, it is a **system design problem**.

### AI Doesn’t Break. We Break It.

AI systems do not operate in isolation, they live inside real products, real workflows, and real organizations.

When something goes wrong, it is usually because:
- We give AI too much authority  
- We allow language to trigger actions  
- We do not define accountability  
- We treat AI like a neutral tool instead of a socio-technical system  

Data leaks do not happen because LLMs are evil, they happen because humans route sensitive data through systems they do not fully control.

## The Most Dangerous AI Threat Is Shadow AI

When people hear "AI security", they usually imagine hackers, that is not the main problem. **The biggest AI risk today comes from inside organizations**.

Developers pasting production logs into ChatGPT to debug faster, marketers uploading customer data into AI tools to write copy, teams wiring LLMs directly into internal systems because "it's just a prototype".

None of this feels dangerous in the moment, that is why it spreads so fast. This is **Shadow AI**, AI usage that exists outside formal governance, visibility, and control.

According to the **IBM Cost of a Data Breach Report**:
- 13% of global data breaches now involve an AI system  
- 97% of those breaches occurred because the AI system had no proper controls  
- Shadow AI alone adds around 200K USD in additional breach costs per incident  

You can read the full report here:
[Cost of a Data Breach Report 2025](https://www.ibm.com/id-id/reports/data-breach)

AI has quietly become a **high-value attack surface**, and most companies do not even know where it is being used.

### AI Is Becoming a Financial Risk, Not Just a Technical One

Breaches involving AI are not just more common. They are more expensive.

AI-related breaches:
- Increase average incident cost  
- Expose more personal data and intellectual property  
- Scale attacks faster  

At the same time, attackers are also using AI:
- Phishing emails that used to take hours now take minutes  
- Social engineering scales instantly  
- Attacks become more personalized and convincing  

AI makes both defenders and attackers faster. Speed without control is not progress.

### Securing AI Means Securing the Whole System

AI security is best approached through three core risk domains, supported by infrastructure and governance.

#### Data Risk: The Largest Attack Surface

Data is the foundation of every AI system and the easiest thing to abuse.

Common risks include:
- Data poisoning  
- Unauthorized exfiltration  
- Accidental leakage  

What actually helps is not fancy tooling, but discipline:
- Clear data classification  
- Strict access control  
- Continuous monitoring  

#### Model Risk: New Problems Traditional Software Never Had

Models introduce risks that traditional systems were never designed for.

These include:
- Supply chain vulnerabilities
- Over-permissive APIs
- Privilege escalation through inference paths

Mitigation starts with fundamentals:
- Model scanning
- Hardening
- Role-based access control

#### Usage Risk: Where Most Failures Actually Happen

Most AI incidents do not come from broken models, they come from how AI is used. Prompt injection, denial of service, and data theft all exploit one thing.

We trust language too much, this is why runtime monitoring and ML Detection and Response matter, you do not just secure inputs. You watch behavior.

### Prompt Injection Is Number One for a Reason

OWASP ranks **Prompt Injection** as the top AI vulnerability. Not because it is sophisticated, but because it is simple. If a system blindly follows instructions because they sound valid, language itself becomes an exploit.

That is why policy must exist before the model runs:
- Validate intent
- Decide whether to allow, warn, or reject
- Only then involve the LLM

Language should never bypass policy enforcement.

### LLMs Are Not Regular APIs

One of the most dangerous assumptions teams make is treating LLMs like traditional APIs.

Traditional APIs are deterministic. Same input, same output. But, LLMs are probabilistic. Same input, different output, every time.

They can be influenced, manipulated, and coerced. If an LLM is allowed to make decisions or trigger actions directly, control is already gone.

### CALM: One Practical Approach to Keeping LLMs in Check

This is where CALM (Conversational AI with Language Models), an architecture proposed by RASA, becomes relevant.

CALM is an enterprise-oriented design approach that separates responsibilities clearly. Large language models are used purely as language interpreters, while decisions and actions remain inside deterministic, developer-controlled logic.

In a CALM-style system:
- Business logic remains deterministic  
- Decisions are made by controlled systems  
- LLMs handle language understanding and retrieval  
- LLMs never execute critical actions  

CALM is not a silver bullet, but it is a concrete example of how teams can apply clear boundaries between language models and system control.

The approach is explained in detail in RASA’s whitepaper:
[Rasa Whitepaper Enterprise Grade Security](https://6711345.fs1.hubspotusercontent-na1.net/hubfs/6711345/2025%20Case%20Studies/Rasa-Whitepaper-Enterprise-Grade-Security.pdf)

### Final Thought

AI will continue to evolve faster than us, that part is inevitable. What is not inevitable is losing control.

Safety is not about slowing AI down, safety is how we keep control while moving forward.
