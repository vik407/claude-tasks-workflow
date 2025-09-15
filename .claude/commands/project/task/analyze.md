Complete Phase 1 analysis for task: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Execute comprehensive root cause investigation** using project-specific context to identify the technical source of issues or requirements
2. **Assess complete system impact** by mapping all affected components, dependencies, and integration points
3. **Generate evidence-based technical analysis** with specific code references, system behaviors, and actionable recommendations

## Context and Motivation

This command is important because:

- **Workflow Integration**: Analysis phase provides the technical foundation for accurate planning and efficient implementation
- **Quality Assurance**: Evidence-based investigation prevents incorrect assumptions and reduces rework by 60-80%
- **Team Efficiency**: Systematic analysis with project context integration enables faster decision-making and reduces ambiguity

## Execution Process

Follow this exact sequence for comprehensive analysis:

<execution_steps>
<step number="1">
<action>Invoke task-analyzer sub-agent with project context integration to perform systematic root cause investigation</action>
<validation>Verify task-analyzer accesses project-context.md and integrates technology stack, patterns, and constraints</validation>
<output>Technical investigation with project-specific context consideration</output>
</step>

<step number="2">
<action>Execute evidence collection through code examination, log analysis, and system behavior tracing using project-appropriate tools</action>
<validation>Confirm specific file paths, line numbers, configuration files, and system components are identified with evidence</validation>
<output>Comprehensive evidence documentation with concrete technical references</output>
</step>

<step number="3">
<action>Perform system impact assessment by mapping affected components, dependencies, integration points, and potential ripple effects</action>
<validation>Verify all impacted systems, external services, database schemas, and user workflows are identified and documented</validation>
<output>Complete system impact map with dependency analysis and integration considerations</output>
</step>

<step number="4">
<action>Generate risk assessment with business impact analysis, technical complexity evaluation, and timeline implications</action>
<validation>Confirm risk levels are properly classified (Critical/High/Medium/Low) with specific business and technical justifications</validation>
<output>Comprehensive risk analysis with mitigation strategies and priority recommendations</output>
</step>
</execution_steps>

## Parallel Operations

Execute these operations simultaneously to optimize analysis efficiency:

- **Code examination** + **Log analysis** for comprehensive evidence collection
- **System mapping** + **Dependency analysis** for complete impact assessment
- **Risk evaluation** + **Business impact assessment** for strategic understanding
- **Technical investigation** + **Integration point analysis** for architectural considerations

## Required Output Structure

<command_output>

<summary>Comprehensive technical analysis completed for [TASK-ID] with root cause identification, system impact assessment, and evidence-based recommendations</summary>
<details>
<root_cause_identified>Primary technical issue identified with specific evidence from code, logs, or system behavior</root_cause_identified>
<system_impact_mapped>All affected components, dependencies, and integration points documented with impact severity</system_impact_mapped>
<evidence_collected>Concrete technical evidence including file paths, line numbers, configuration details, and system behaviors</evidence_collected>
<risk_assessed>Business and technical risk levels classified with specific justifications and mitigation strategies</risk_assessed>
</details>
<next_steps>
<step>Review analysis.md for technical accuracy and completeness</step>
<step>Validate that all system impacts and dependencies have been identified</step>
<step>Proceed to planning phase using /project:task:plan [TASK-ID] when analysis is approved</step>
</next_steps>
<quality_validation>
<evidence_completeness>All conclusions backed by specific technical evidence with file references</evidence_completeness>
<impact_thoroughness>Complete system impact analysis including dependencies and integration points</impact_thoroughness>
<actionability>Recommendations are specific, implementable, and aligned with project architecture</actionability>
</quality_validation>
</command_output>

## Success Criteria

This command succeeds when:

- ✅ **Root cause confirmed with evidence** - Primary technical issue identified with specific code, configuration, or system evidence
- ✅ **All affected components identified** - Complete mapping of impacted systems, dependencies, and integration points
- ✅ **Business impact documented** - Clear articulation of user impact, business process effects, and strategic implications
- ✅ **Technical investigation complete** - Comprehensive evidence collection with specific file references and system behavior analysis
- ✅ **Risk assessment finalized** - Proper risk classification with mitigation strategies and priority recommendations

## Analysis Requirements

### Root Cause Investigation

- **Why is this happening?** - Identify the underlying technical cause with specific evidence
- **System behavior analysis** - Document how the issue manifests in system operations
- **Configuration examination** - Review relevant configuration files, environment settings, and deployment parameters
- **Code pattern analysis** - Examine code patterns, architectural decisions, and implementation approaches

### System Impact Assessment

- **Component mapping** - Identify all affected system components with dependency relationships
- **Integration point analysis** - Map external service dependencies, API integrations, and data flow connections
- **User experience impact** - Document specific user journeys, workflows, and business processes affected
- **Performance implications** - Assess impact on system performance, scalability, and resource utilization

### Evidence Collection Standards

- **Specific file references** - Include exact file paths, line numbers, and relevant code snippets
- **System behavior documentation** - Capture logs, error messages, and observable system behaviors
- **Environmental factors** - Document configuration differences, deployment variations, and infrastructure considerations
- **Reproducibility information** - Include steps to reproduce issues and verify system behaviors

## Phase Gate Requirements

Cannot proceed to planning until:

- ✅ **Root cause confirmed with evidence** - Technical investigation complete with concrete evidence
- ✅ **All affected components identified** - Comprehensive system impact analysis completed
- ✅ **Business impact documented** - Clear understanding of user and business implications
- ✅ **Technical investigation complete** - Evidence collection meets project quality standards

## Restrictions and Quality Gates

- **NO CODE CHANGES during analysis phase** - This phase is for investigation and understanding only
- **Evidence-based conclusions only** - All analysis must be supported by specific technical evidence
- **Comprehensive system consideration** - Must consider all architectural layers and integration points
- **Project context integration** - Analysis must align with discovered project patterns and constraints

The completed analysis becomes the foundation for accurate planning and efficient implementation, ensuring technical decisions are based on solid evidence and comprehensive system understanding.
