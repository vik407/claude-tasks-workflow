Execute Phase 3 implementation for task: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Execute adaptive implementation approach** using either AUTO (autonomous) or GUIDED (instructional) mode based on complexity and team preferences
2. **Implement comprehensive solution** following approved planning documentation while maintaining continuous quality validation
3. **Deliver production-ready results** with complete testing, documentation, and validation meeting project standards

## Context and Motivation

This command is important because:

- **Workflow Integration**: Implementation phase transforms planning into working solutions, completing the three-phase workflow cycle
- **Quality Assurance**: Adaptive approach ensures optimal implementation method while maintaining 95%+ quality standards through continuous validation
- **Team Efficiency**: Mode selection enables efficient execution whether autonomous implementation or guided instruction approach is optimal

## Implementation Mode Detection

Parse arguments for implementation mode selection:

**AUTO Mode**: AI implements all changes automatically (e.g., "/project:task:implement ABC-8177 AUTO")
**GUIDED Mode**: AI provides step-by-step instructions for developer (e.g., "/project:task:implement ABC-8177 GUIDED")  
**Default**: If no mode specified, automatically default to GUIDED mode for safety and team learning

## Execution Process

Follow this exact sequence for implementation execution:

<execution_steps>
<step number="1">
<action>Validate prerequisites by confirming analysis.md and plan.md exist and are complete</action>
<validation>Verify both analysis and planning phases are complete with approved documentation</validation>
<output>Prerequisites validation confirmation with readiness for implementation</output>
</step>

<step number="2">
<action>Invoke implementation-guide sub-agent with mode selection and comprehensive project context integration</action>
<validation>Confirm implementation-guide accesses plan.md, analysis.md, and project-context.md for informed execution</validation>
<output>Implementation approach selection with appropriate mode configuration and context integration</output>
</step>

<step number="3">
<action>Execute implementation using selected mode while maintaining continuous quality validation and progress tracking</action>
<validation>Verify implementation follows approved plan exactly with quality gates and testing at each step</validation>
<output>Complete implementation with continuous validation and progress documentation</output>
</step>

<step number="4">
<action>Generate comprehensive validation report with test results, quality metrics, and implementation documentation</action>
<validation>Confirm all quality standards met, tests passed, and documentation updated according to project standards</validation>
<output>Complete validation.md with implementation results, quality metrics, and readiness confirmation</output>
</step>
</execution_steps>

## AUTO Mode Implementation

**Activation Criteria:**

- Low to medium complexity changes with well-defined requirements
- Strong existing test coverage for affected areas
- Minimal integration risk with existing functionality
- Team preference for autonomous execution

**AUTO Mode Process:**

<auto_mode_steps>
<step number="1">
<action>Execute all planned changes automatically following plan.md exactly with no deviations</action>
<validation>Confirm each change is implemented according to specifications with immediate testing validation</validation>
<output>Complete code implementation with continuous quality verification</output>
</step>

<step number="2">
<action>Run comprehensive test suite continuously during implementation with immediate issue resolution</action>
<validation>Verify all tests pass, code quality standards met, and performance requirements satisfied</validation>
<output>Continuous quality assurance with test results and performance metrics</output>
</step>

<step number="3">
<action>Update documentation automatically with implementation details, architectural decisions, and usage instructions</action>
<validation>Confirm documentation follows project standards and provides comprehensive implementation guidance</validation>
<output>Complete documentation updates aligned with project standards and team practices</output>
</step>
</auto_mode_steps>

**AUTO Mode Deliverables:**

- Complete implementation of all planned changes
- `.claude/tasks/[TASK-ID]/auto-implementation.md` with detailed change log and decision documentation
- Comprehensive test execution results with coverage and performance metrics
- Complete validation report confirming quality standards and production readiness

## GUIDED Mode Implementation

**Activation Criteria:**

- High complexity or high-risk changes requiring careful oversight
- Cross-cutting concerns affecting multiple system components
- Team learning opportunities for knowledge transfer
- Unclear requirements requiring iterative refinement

**GUIDED Mode Process:**

<guided_mode_steps>
<step number="1">
<action>Generate detailed step-by-step implementation instructions with specific file changes and quality requirements</action>
<validation>Verify instructions are complete, specific, and include all necessary context and validation criteria</validation>
<output>Comprehensive implementation guide with step-by-step developer instructions</output>
</step>

<step number="2">
<action>Provide quality gate checkpoints with mandatory validation requirements for each implementation step</action>
<validation>Confirm quality gates are specific, measurable, and aligned with project standards</validation>
<output>Quality validation framework with clear acceptance criteria for each step</output>
</step>

<step number="3">
<action>Create developer progress tracking system with sign-off requirements and validation confirmations</action>
<validation>Verify tracking system enables proper oversight and quality assurance throughout implementation</validation>
<output>Progress tracking and validation system for developer implementation oversight</output>
</step>
</guided_mode_steps>

**GUIDED Mode Deliverables:**

- `.claude/tasks/[TASK-ID]/implementation-guide.md` with detailed step-by-step developer instructions
- `.claude/tasks/[TASK-ID]/dev-implementation.md` for tracking developer progress and sign-offs
- Quality gate validation framework with acceptance criteria for each implementation step
- Combined AI guidance and developer execution validation in final validation report

## Parallel Operations

Execute these operations simultaneously to optimize implementation efficiency:

- **Code implementation** + **Test execution** for immediate validation capability
- **Quality validation** + **Performance monitoring** for comprehensive assurance
- **Documentation updates** + **Progress tracking** for complete implementation oversight
- **Integration testing** + **Rollback validation** for comprehensive risk management

## Required Output Structure

<command_output>

<summary>Implementation completed for [TASK-ID] using [AUTO|GUIDED] mode with comprehensive quality validation and production readiness confirmation</summary>
<details>
<implementation_approach>[AUTO|GUIDED] mode selected with rationale and execution approach</implementation_approach>
<changes_implemented>Complete list of code changes, file modifications, and system updates with validation status</changes_implemented>
<quality_validation>Test results, performance metrics, security validation, and code quality assessment</quality_validation>
<documentation_updates>All documentation updated according to project standards with implementation details</documentation_updates>
</details>
<next_steps>
<step>Review implementation results for quality and completeness</step>
<step>Validate that all success criteria have been met</step>
<step>Deploy to appropriate environment following project deployment procedures</step>
</next_steps>
<quality_validation>
<implementation_completeness>All planned changes implemented according to approved plan.md</implementation_completeness>
<quality_standards_met>Code quality, testing, performance, and security standards satisfied</quality_standards_met>
<production_readiness>Implementation ready for deployment with comprehensive validation completed</production_readiness>
</quality_validation>
</command_output>

## Success Criteria

This command succeeds when:

- ✅ **Implementation mode appropriately selected** - AUTO or GUIDED mode chosen based on complexity, risk, and team context
- ✅ **All planned changes implemented** - Complete implementation following approved plan.md specifications
- ✅ **Quality standards maintained** - Code quality, testing, performance, and security requirements satisfied
- ✅ **Documentation updated** - All relevant documentation updated according to project standards
- ✅ **Production readiness confirmed** - Implementation validated and ready for deployment

## Mandatory Quality Gates (Both Modes)

### Code Quality Requirements

- **Architecture Compliance** - Implementation follows tool-agnostic principles and project patterns
- **Test Coverage** - All new code has appropriate unit, integration, and performance tests
- **Documentation Standards** - Code is self-documenting with clear intent and usage instructions
- **Performance Requirements** - No degradation in system performance with optimization where possible
- **Security Validation** - No new vulnerabilities introduced with security best practices followed
- **Error Handling** - Graceful failure modes implemented with appropriate logging and monitoring
- **Accessibility Standards** - UI changes maintain accessibility compliance and usability standards

### Implementation Validation

- **Plan Adherence** - Implementation follows approved plan.md exactly with no unauthorized deviations
- **Integration Verification** - All integration points tested and validated with existing system components
- **Rollback Verification** - Rollback procedures tested and confirmed functional for safe deployment
- **Performance Validation** - Performance benchmarks met with no regression in system responsiveness

## Prerequisites Validation

Cannot execute implementation until:

- ✅ **Analysis complete** - `.claude/tasks/[TASK-ID]/analysis.md` exists with comprehensive investigation
- ✅ **Plan approved** - `.claude/tasks/[TASK-ID]/plan.md` exists with detailed implementation strategy
- ✅ **File changes mapped** - Exact file modifications documented with implementation details
- ✅ **Risk assessment complete** - Risk mitigation strategies documented and rollback procedures validated

## Restrictions and Quality Gates

- **Plan adherence mandatory** - Making changes not documented in plan.md is forbidden
- **Quality gate compliance** - Skipping quality gate validations is not permitted
- **Test validation required** - Proceeding without test validation is forbidden
- **Scope adherence mandatory** - Implementing features outside task scope is not allowed
- **Security compliance required** - Bypassing security or performance checks is forbidden

## Output Files by Mode

### AUTO Mode Files

- `.claude/tasks/[TASK-ID]/auto-implementation.md` - Complete AI implementation log with decision rationale
- `.claude/tasks/[TASK-ID]/validation.md` - Automated test results, quality metrics, and production readiness confirmation

### GUIDED Mode Files

- `.claude/tasks/[TASK-ID]/implementation-guide.md` - Step-by-step developer instructions with quality requirements
- `.claude/tasks/[TASK-ID]/dev-implementation.md` - Developer progress tracking with sign-offs and validation confirmations
- `.claude/tasks/[TASK-ID]/validation.md` - Combined AI guidance and developer execution results with quality validation

The implementation execution delivers production-ready solutions while maintaining comprehensive quality standards and enabling optimal team productivity through adaptive mode selection and continuous validation.
