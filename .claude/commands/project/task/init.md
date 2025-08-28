Initialize Jira task workflow for: $ARGUMENTS

WORKFLOW: Three-phase task development (Analysis → Planning → Implementation)

SETUP REQUIRED:

1. Create .claude/tasks/[TASK-ID]/ directory structure
2. Generate analysis.md from template
3. Set task status to "Analysis Phase"
4. Validate task ID format and Jira connection

RESTRICTIONS:

- NO code changes allowed during initialization
- MUST complete analysis phase before planning
- Document all assumptions and constraints

Begin Phase 1 analysis following .claude/workflows/analysis-template.md
Focus on root cause investigation, not just symptom fixes.
