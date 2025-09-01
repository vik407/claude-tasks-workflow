Refresh project context selectively: $ARGUMENTS

SELECTIVE REFRESH PROCESS:

1. **Identify what changed** since last context generation
2. **Update only stale sections** of .claude/project-context.md
3. **Preserve stable context** (team patterns, established architecture)
4. **Propagate updates** to active tasks that reference old context

REFRESH TRIGGERS:

- **Dependencies**: package.json, requirements.txt, Gemfile changes
- **Architecture**: New services, database changes, API modifications  
- **Process**: Team conventions, testing approaches, CI/CD updates
- **Tools**: New development tools, build system changes

Maintain fresh context without losing accumulated project knowledge.
