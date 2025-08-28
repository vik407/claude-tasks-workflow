Execute Phase 3 implementation for task: $ARGUMENTS

IMPLEMENTATION MODE DETECTION:
Parse arguments for implementation mode:

- **AUTO**: AI implements all changes automatically (e.g., "/project:task:implement UGP-8177 AUTO")
- **GUIDED**: AI provides step-by-step instructions for developer (e.g., "/project:task:implement UGP-8177 GUIDED")  
- **Default**: If no mode specified, default to GUIDED mode

PREREQUISITES CHECK:

- ✅ Analysis complete (.claude/tasks/[TASK-ID]/analysis.md exists)
- ✅ Plan approved (.claude/tasks/[TASK-ID]/plan.md exists)  
- ✅ File changes mapped and risk assessed

## AUTO MODE Implementation

**When AUTO mode specified:**

1. **Execute all changes** - AI implements complete solution automatically
2. **Follow plan exactly** - No deviations from documented plan.md
3. **Test continuously** - Validate each change before proceeding to next
4. **Document progress** - Update validation.md with implementation details
5. **Quality assurance** - Run full test suite and validate all requirements

**AUTO MODE DELIVERABLES:**

- All planned code changes implemented
- .claude/tasks/[TASK-ID]/auto-implementation.md with change log
- Complete test execution and results
- Validation report with quality metrics

## GUIDED MODE Implementation  

**When GUIDED mode specified or default:**

1. **Provide instructions** - Step-by-step implementation guidance for developer
2. **Code quality requirements** - MANDATORY quality gates for developer changes
3. **Validation checkpoints** - Developer must confirm each step completion
4. **Human oversight** - Developer reviews and approves each change

**GUIDED MODE PROCESS:**
For each planned change:

- Provide exact code modification instructions
- Specify quality requirements for the change
- Request developer confirmation before proceeding
- Validate developer implementation meets standards

**GUIDED MODE DELIVERABLES:**

- .claude/tasks/[TASK-ID]/implementation-guide.md with step-by-step instructions
- .claude/tasks/[TASK-ID]/dev-implementation.md tracking developer progress
- Quality gate validation at each step
- Developer sign-off documentation

## MANDATORY QUALITY GATES (Both Modes)

### Code Quality Requirements:

- [ ] **Architecture Compliance** - Follows tool-agnostic principles
- [ ] **Test Coverage** - All new code has appropriate tests
- [ ] **Documentation** - Code is self-documenting with clear intent
- [ ] **Performance** - No degradation in system performance
- [ ] **Security** - No new vulnerabilities introduced
- [ ] **Error Handling** - Graceful failure modes implemented
- [ ] **Accessibility** - UI changes maintain accessibility standards

### Developer Validation (GUIDED Mode Only):

After developer implements each step:

- [ ] **Code Review** - Developer confirms implementation matches instructions
- [ ] **Testing** - Developer runs and validates all affected tests
- [ ] **Integration** - Developer verifies integration with existing system
- [ ] **Documentation** - Developer updates any affected documentation

## FORBIDDEN ACTIONS (Both Modes):

- Making changes not documented in plan.md
- Skipping quality gate validations
- Proceeding without test validation
- Implementing features outside task scope
- Bypassing security or performance checks

## OUTPUT FILES BY MODE:

### AUTO Mode Files:

- `.claude/tasks/[TASK-ID]/auto-implementation.md` - AI implementation log
- `.claude/tasks/[TASK-ID]/validation.md` - Automated test results and quality metrics

### GUIDED Mode Files:  

- `.claude/tasks/[TASK-ID]/implementation-guide.md` - Step-by-step developer instructions
- `.claude/tasks/[TASK-ID]/dev-implementation.md` - Developer progress tracking and sign-offs
- `.claude/tasks/[TASK-ID]/validation.md` - Combined AI guidance + developer execution results

Execute implementation using specified mode while maintaining all quality standards.
