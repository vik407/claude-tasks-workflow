Change task status with appropriate communications: $ARGUMENTS

Expected format: "UGP-8177 status=backlog reason=priority-changed"
                "UGP-8177 status=cancelled reason=requirements-obsolete"
                "UGP-8177 status=blocked reason=dependencies-unavailable"

STATUS CHANGE PROCESS:

1. **Validate Current State** - Confirm current phase and documentation
2. **Generate Communications** - Create stakeholder and developer messages  
3. **Update Documentation** - Preserve all completed work
4. **Update Jira** - Set appropriate status with context
5. **Archive or Preserve** - Handle documentation appropriately

SUPPORTED STATUS CHANGES:

- **backlog** - Return to backlog with analysis preserved
- **cancelled** - Permanently close with value extraction
- **blocked** - Mark blocked with dependency documentation
- **clarification** - Need requirements clarification

REQUIRED COMMUNICATIONS:

- Stakeholder message (non-technical)
- Developer handoff (technical details)
- Jira update with appropriate comments
- Internal documentation updates

Generate appropriate status change with complete communication package.
