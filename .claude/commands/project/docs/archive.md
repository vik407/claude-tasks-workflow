Archive completed task: $ARGUMENTS

ARCHIVAL PROCESS:

1. **Final Documentation** - Ensure all task documentation is complete
2. **Pattern Extraction** - Move reusable patterns to .claude/examples/
3. **Knowledge Integration** - Update project context with learnings
4. **Task Closure** - Move task folder to archive with summary

ARCHIVAL CHECKLIST:

- [ ] All three phases (analysis, plan, validation) documented
- [ ] Implementation matches documented plan
- [ ] All tests passing and documented
- [ ] Reusable patterns extracted
- [ ] Technical debt items created if needed
- [ ] Post-implementation monitoring confirmed

ARCHIVE STRUCTURE:
.claude/
├── tasks/              # Active tasks
├── archive/           # Completed tasks
│   └── [YYYY-MM]/       # Monthly organization
│       └── [TASK-ID]/  # Archived task
└── examples/          # Extracted patterns

Create complete knowledge archive while cleaning active workspace.
