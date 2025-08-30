Initialize contextually-aware task workflow for: $ARGUMENTS

WORKFLOW: Three-phase task development (Analysis → Planning → Implementation)

PROJECT CONTEXT INTEGRATION:

1. **Auto-detect project structure** - Analyze package.json, build tools, frameworks (exclude .claude/ folder from analysis)
2. **Identify existing patterns** - Review code conventions, testing approaches, architecture
3. **Map team processes** - Understand documentation standards, review practices
4. **Assess integration points** - Identify affected systems and dependencies

SETUP REQUIRED:

1. Create .claude/tasks/[TASK-ID]/ directory structure
2. **Include dev-notes/[TASK-ID].md** - Integrate developer context notes from Jira, discoveries, and related
    technical documentation
3. Generate analysis.md with project-specific context
4. Create project-context.md with discovered patterns and tools
5. Set task status to "Analysis Phase"
6. Validate task ID format and external system connections

CONTEXT INJECTION CHECKLIST:

- [ ] Technology stack identified and documented
- [ ] Code style and conventions mapped
- [ ] Testing frameworks and patterns identified
- [ ] Build and deployment processes understood
- [ ] Team communication patterns established
- [ ] Quality gates and validation tools configured

RESTRICTIONS:

- NO code changes allowed during initialization
- MUST complete analysis phase before planning
- Document all assumptions and constraints
- Include project-specific considerations in all documentation

Automatically invoke task-analyzer sub-agent for comprehensive analysis.
Focus on root cause investigation with project context integration.
