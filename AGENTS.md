# AI Agent Registry

This project defines 10 specialized agents in `.github/agents/*.agent.md`.  
Each agent has a strict scope boundary and tool assignment.

## Pipeline order

```
orchestrator → architect → planner → implementer → reviewer → tester → documentation → security → performance → devops
```

## Agent table

| Agent              | Role                                                                                                                                         | Tools                       | Read-only? |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------- |
| **@orchestrator**  | Pipeline coordinator — classifies change type, delegates to agents, gates on verdicts                                                        | read, search                | ✅         |
| **@architect**     | Architecture decisions — ADRs, domain modeling, component design, API contract alignment, data flow                                          | read, search, edit          | —          |
| **@planner**       | Feature decomposition — context engineering, risk taxonomy (5 types), task table                                                             | read, search                | ✅         |
| **@implementer**   | Code execution — implements plan one task at a time across monorepo layers, verification gate, git commit                                    | read, search, edit, execute | —          |
| **@reviewer**      | Code quality gate — plan fidelity, layer completeness, error handling, styling consistency, response format (BLOCKER / WARNING / SUGGESTION) | read, search                | ✅         |
| **@tester**        | Test generation — Vitest unit tests + React Testing Library component tests, debug diagnosis (7-step table)                                  | read, search, edit, execute | —          |
| **@documentation** | Documentation — README, JSDoc/TSDoc, changelog, release notes                                                                                | read, search, edit          | —          |
| **@security**      | Security audit — OWASP Top 10 (2021), XSS, CSRF, JWT handling, dependency vulnerabilities                                                    | read, search, execute       | ✅         |
| **@performance**   | Performance audit — bundle size, Lighthouse scores, image optimization, React re-renders, Next.js caching                                    | read, search, execute       | ✅         |
| **@devops**        | DevOps — Docker, CI/CD workflows, Nginx config, Docker Compose environments, deployment                                                      | read, search, execute       | —          |

## Key contracts

All project contracts (layer hierarchy, route structure, naming conventions, state management patterns, form patterns) are defined in `.github/copilot-instructions.md`. Always load from there — never duplicate.

## Shared context

Cross-cutting knowledge lives in `satryawiguna/satryawiguna-shared` on GitHub:

| File                               | Contents                                        |
| ---------------------------------- | ----------------------------------------------- |
| `business/glossary.md`             | Domain term definitions                         |
| `business/business-rules.md`       | Domain invariants (BA-1 through BCF-26)         |
| `architecture/bounded-contexts.md` | 6 bounded contexts with frontend module mapping |
| `architecture/api-contracts.md`    | Endpoint contracts                              |
| `product/vision.md`                | Product vision and principles                   |

## MCP servers (`.vscode/mcp.json`)

| Server              | Purpose                                     |
| ------------------- | ------------------------------------------- |
| GitHub              | Read shared repos, manage PRs and workflows |
| Filesystem          | File operations (project-scoped)            |
| Sequential Thinking | Structured reasoning                        |
| Figma               | Design asset access                         |
