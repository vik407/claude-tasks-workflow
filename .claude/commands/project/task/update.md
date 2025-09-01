Update existing task with new information: $ARGUMENTS

FORMAT: "ABC-8177 update='meeting revealed API rate limit: 100 req/min'"

UPDATE PROCESS:

1. Read existing .claude/tasks/[TASK-ID]/ documentation
2. Invoke @task-updater to analyze delta changes needed
3. Apply incremental updates preserving existing valuable work
4. Update affected documentation sections only
5. Track changes for future reference

SMART UPDATE LOGIC:

- **Requirements change** → Update analysis.md sections, preserve root cause
- **Technical discovery** → Update plan.md approach, keep analysis insights  
- **Meeting outcomes** → Update scope in plan.md, preserve technical investigation
- **Tool changes** → Update implementation approach, maintain architecture

OUTPUT:

- Updated documentation with change tracking
- Preserved existing analysis and insights
- Clear indication of what changed and why
- Recommendation if any sub-agents need re-invocation

Avoid full workflow re-runs while maintaining documentation quality.
