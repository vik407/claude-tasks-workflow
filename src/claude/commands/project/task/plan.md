Create Phase 2 implementation plan for task: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Design comprehensive solution architecture** based on analysis findings while integrating with existing project patterns and constraints
2. **Create detailed implementation roadmap** with specific file changes, testing strategies, and quality validation procedures
3. **Establish risk mitigation framework** with rollback procedures, dependency management, and performance considerations

## Context and Motivation

This command is important because:

- **Workflow Integration**: Planning phase transforms analysis findings into actionable implementation guidance, bridging investigation and execution
- **Quality Assurance**: Detailed planning prevents implementation delays and reduces rework by 60-80% through comprehensive preparation
- **Team Efficiency**: Architecture-first approach with risk mitigation enables confident implementation and faster delivery

## Execution Process

Follow this exact sequence for comprehensive planning:

<execution_steps>
<step number="1">
<action>Invoke task-planner sub-agent with analysis findings and project context to design solution architecture aligned with existing patterns</action>
<validation>Verify task-planner integrates analysis.md findings with project-context.md patterns and constraints</validation>
<output>Solution architecture design that leverages existing project strengths while addressing identified issues</output>
</step>

<step number="2">
<action>Create detailed file change mapping with specific modifications, additions, and deletions required for implementation</action>
<validation>Confirm exact file paths, line numbers, function modifications, and new component requirements are documented</validation>
<output>Comprehensive file-by-file change documentation with implementation details</output>
</step>

<step number="3">
<action>Design testing strategy incorporating existing project testing frameworks and coverage expectations</action>
<validation>Verify testing approach includes unit tests, integration tests, performance validation, and quality gate requirements</validation>
<output>Complete testing strategy aligned with project standards and implementation phases</output>
</step>

<step number="4">
<action>Establish rollback plan with dependency management, data preservation, and system recovery procedures</action>
<validation>Confirm rollback procedures are tested, documented, and integrated with existing deployment processes</validation>
<output>Comprehensive risk mitigation plan with rollback procedures and recovery validation</output>
</step>
</execution_steps>

## Parallel Operations

Execute these operations simultaneously to optimize planning efficiency:

- **Solution architecture design** + **Technology integration assessment** for comprehensive technical planning
- **File change mapping** + **Testing strategy development** for implementation readiness
- **Risk assessment** + **Rollback planning** for comprehensive risk mitigation
- **Performance analysis** + **Scalability planning** for future-ready solutions

## Required Output Structure

<command_output>

<summary>Comprehensive implementation plan created for [TASK-ID] with solution architecture, detailed implementation steps, and risk mitigation strategies</summary>
<details>
<solution_architecture>High-level solution approach aligned with project architecture and addressing analysis findings</solution_architecture>
<implementation_roadmap>Detailed file changes, implementation order, and step-by-step execution plan</implementation_roadmap>
<testing_strategy>Comprehensive testing approach with unit, integration, and performance validation requirements</testing_strategy>
<risk_mitigation>Rollback procedures, dependency management, and recovery validation processes</risk_mitigation>
</details>
<next_steps>
<step>Review plan.md for technical accuracy and implementation feasibility</step>
<step>Validate that solution architecture aligns with project patterns and constraints</step>
<step>Proceed to implementation using /project:task:implement [TASK-ID] [AUTO|GUIDED] when plan is approved</step>
</next_steps>
<quality_validation>
<architectural_alignment>Solution integrates seamlessly with existing system patterns and conventions</architectural_alignment>
<implementation_feasibility>Plan is implementable by development team with current skill set and tools</implementation_feasibility>
<risk_coverage>Comprehensive risk assessment with concrete mitigation strategies and rollback procedures</risk_coverage>
</quality_validation>
</command_output>

## Success Criteria

This command succeeds when:

- ✅ **Solution architecture defined** - Tool-agnostic approach that integrates with existing project patterns and addresses analysis findings
- ✅ **File change mapping complete** - Exact files to modify/create with specific implementation details and line-level changes
- ✅ **Testing strategy established** - Comprehensive approach including unit, integration, and performance tests aligned with project standards
- ✅ **Rollback plan validated** - Safe undo procedures with data preservation and system recovery validation
- ✅ **Implementation order documented** - Step-by-step execution plan with dependencies and validation checkpoints

## Planning Requirements

### Solution Architecture Design

- **Tool-agnostic approach** - Solutions should survive framework changes and technology evolution
- **Integration alignment** - Leverage existing project patterns, conventions, and architectural decisions
- **Scalability consideration** - Design for future extensibility and performance requirements
- **Security integration** - Align with existing security patterns and compliance requirements

### Implementation Mapping

- **File-by-file documentation** - Specific files to modify, create, or delete with exact changes required
- **Dependency management** - Order of changes to minimize integration issues and enable incremental testing
- **Configuration updates** - Environment settings, build configurations, and deployment parameter changes
- **Database considerations** - Schema changes, migration scripts, and data preservation requirements

### Testing Strategy Integration

- **Existing framework utilization** - Leverage project's testing libraries, patterns, and coverage expectations
- **Test coverage planning** - Unit tests for new components, integration tests for system interactions
- **Performance validation** - Benchmark testing, load testing, and performance regression prevention
- **Quality gate integration** - Automated testing integration with CI/CD pipelines and deployment processes

## Architecture Principles

- **Composition over inheritance** - Prefer modular design patterns that enable flexibility and maintainability
- **Future extensibility** - Design solutions that can evolve with changing requirements and technology
- **Documentation integration** - Architectural decisions documented for future team members and system evolution
- **Performance awareness** - Consider performance implications at design time rather than optimization afterthoughts

## Prerequisites Validation

Cannot proceed with planning until:

- ✅ **Analysis phase complete** - analysis.md exists with comprehensive root cause investigation
- ✅ **Root cause documented** - Clear understanding of technical issues and system impact
- ✅ **System impact mapped** - All affected components and dependencies identified
- ✅ **Project context integrated** - Solution approach aligns with discovered project patterns and constraints

## Restrictions and Quality Gates

- **Analysis foundation required** - Cannot plan without approved analysis.md with root cause investigation
- **Project pattern compliance** - Solutions must integrate with existing architectural patterns and conventions
- **Risk-aware design** - All plans must include comprehensive risk assessment and mitigation strategies
- **Tool-agnostic principles** - Architecture should not be tightly coupled to specific tools or frameworks

## Phase Gate Requirements

Cannot implement until plan is validated and approved:

- ✅ **Architecture review complete** - Solution approach validated against project standards and constraints
- ✅ **Implementation feasibility confirmed** - Development team can execute plan with available resources and skills
- ✅ **Risk mitigation validated** - Rollback procedures tested and recovery processes verified
- ✅ **Quality standards met** - Plan meets project documentation and implementation standards

The comprehensive plan becomes the blueprint for successful implementation, ensuring technical excellence while enabling team productivity and minimizing project risk through detailed preparation and risk mitigation.
