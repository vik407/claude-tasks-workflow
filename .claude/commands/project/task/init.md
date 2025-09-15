Initialize contextually-aware task workflow for: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Establish comprehensive task workspace** with automated project context discovery and integration
2. **Create structured documentation foundation** enabling efficient workflow progression through analysis, planning, and implementation phases
3. **Integrate external context sources** including developer notes, Jira documentation, and technical discoveries for comprehensive task understanding

## Context and Motivation

This command is important because:

- **Workflow Integration**: Proper initialization sets the foundation for the entire three-phase workflow (Analysis → Planning → Implementation)
- **Quality Assurance**: Automated project context discovery ensures solutions align with existing architectural patterns and conventions
- **Team Efficiency**: Structured workspace creation with context injection reduces analysis time by 60-70% for subsequent tasks

## Execution Process

Follow this exact sequence for task initialization:

<execution_steps>
<step number="1">
<action>Create .claude/tasks/[TASK-ID]/ directory structure with all required subdirectories</action>
<validation>Verify directory exists and has proper permissions for read/write operations</validation>
<output>Complete task workspace ready for documentation generation</output>
</step>

<step number="2">
<action>Execute automated project structure analysis excluding .claude/ folder, examining package.json, build tools, frameworks, and architectural patterns</action>
<validation>Confirm technology stack, build tools, and key architectural patterns are identified and documented</validation>
<output>Comprehensive project-context.md with technology stack, patterns, and integration points</output>
</step>

<step number="3">
<action>Integrate external context from dev-notes/[TASK-ID].md including Jira content, developer discoveries, and related technical documentation</action>
<validation>Verify external context is properly parsed and integrated into task understanding</validation>
<output>Enhanced task context with external information integrated into workspace</output>
</step>

<step number="4">
<action>Automatically invoke task-analyzer sub-agent for comprehensive root cause analysis with project context integration</action>
<validation>Confirm task-analyzer produces structured analysis.md with root cause investigation, system impact assessment, and evidence collection</validation>
<output>Complete analysis.md with project-specific technical investigation and recommendations</output>
</step>
</execution_steps>

## Parallel Operations

Execute these operations simultaneously to optimize performance:

- **Project structure analysis** + **Technology stack identification** for comprehensive context discovery
- **External context integration** + **Task workspace creation** for efficient setup
- **Code convention mapping** + **Testing framework identification** for quality integration

## Required Output Structure

<command_output>

<summary>Task [TASK-ID] workspace initialized with comprehensive project context integration and automated analysis</summary>
<details>
<workspace_created>Complete .claude/tasks/[TASK-ID]/ directory structure</workspace_created>
<project_context_discovered>Technology stack, architectural patterns, code conventions, and testing frameworks identified</project_context_discovered>
<external_context_integrated>Developer notes, Jira content, and technical discoveries incorporated</external_context_integrated>
<analysis_completed>Comprehensive root cause analysis with project-specific context and recommendations</analysis_completed>
</details>
<next_steps>
<step>Review generated analysis.md for accuracy and completeness</step>
<step>Validate that all project context has been properly captured</step>
<step>Proceed to planning phase using /project:task:plan [TASK-ID] when analysis is approved</step>
</next_steps>
<quality_validation>
<context_completeness>Technology stack, patterns, and integration points documented</context_completeness>
<analysis_quality>Root cause investigation completed with evidence and system impact assessment</analysis_quality>
<documentation_standards>All generated files follow project documentation conventions</documentation_standards>
</quality_validation>
</command_output>

## Success Criteria

This command succeeds when:

- ✅ Complete task workspace created with proper directory structure and permissions
- ✅ Comprehensive project context discovered and documented including technology stack, patterns, and conventions
- ✅ External context from developer notes and Jira successfully integrated into task understanding
- ✅ Task-analyzer sub-agent produces high-quality analysis.md with root cause investigation and recommendations
- ✅ All documentation follows project standards and enables efficient progression to planning phase

## Context Injection Checklist

- [ ] Technology stack identified and documented (frameworks, languages, build tools)
- [ ] Code style and conventions mapped (linting rules, formatting standards, architectural patterns)
- [ ] Testing frameworks and patterns identified (unit test libraries, integration test approaches, coverage expectations)
- [ ] Build and deployment processes understood (CI/CD pipelines, environment configurations, deployment strategies)
- [ ] Team communication patterns established (documentation standards, review practices, collaboration tools)
- [ ] Quality gates and validation tools configured (automated testing, code quality checks, performance monitoring)

## Restrictions and Quality Gates

- **NO code changes allowed during initialization** - This phase is for context discovery and analysis only
- **MUST complete analysis phase before planning** - Cannot proceed to planning without approved analysis.md
- **Document all assumptions and constraints** - Include project-specific considerations in all documentation
- **Include project-specific considerations** - All documentation must reflect discovered architectural patterns and team practices
- **Validate external integrations** - Confirm connections to Jira, developer notes, and other context sources are functional

The initialized workspace and comprehensive analysis become the foundation for efficient planning and implementation phases, enabling 60-70% faster task completion through proper context integration.
