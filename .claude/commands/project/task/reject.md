Reject task implementation plan for: $ARGUMENTS

PLAN REJECTION SCENARIOS:

- Business priority changed - task no longer relevant
- Technical approach deemed too risky
- Resource constraints - not feasible in current timeline  
- Requirements clarification needed
- Dependencies not yet available
- Better alternative solution identified

REJECTION PROCESS:

1. **Document Rejection Reason** - Clear rationale for plan rejection
2. **Stakeholder Communication** - Non-technical update for business users
3. **Developer Handoff** - Technical details for future developer
4. **Jira Status Update** - Move ticket to appropriate status
5. **Knowledge Preservation** - Retain analysis and plan for future reference

DELIVERABLES:

- .claude/tasks/[TASK-ID]/plan-rejection.md with detailed rationale
- .claude/tasks/[TASK-ID]/stakeholder-message.md for business communication
- .claude/tasks/[TASK-ID]/developer-handoff.md for technical team
- Jira ticket updated with appropriate status and comments

JIRA STATUS OPTIONS:

- **Backlog** - Return to backlog for future prioritization
- **Cancelled** - Task no longer needed
- **Blocked** - Dependencies must be resolved first
- **Needs Clarification** - Requirements need refinement

Create appropriate communications for both stakeholders and developers while preserving technical knowledge.
