Generate context-aware comprehensive status report for task: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Generate dynamic task status assessment** with real-time phase analysis and completion metrics
2. **Validate workflow compliance** against project standards and quality gates
3. **Identify and prioritize blockers** with actionable resolution strategies
4. **Provide stakeholder-ready reporting** tailored to audience needs and technical context

## Context and Motivation

This command is critical because:

- **Workflow Transparency**: Real-time status visibility prevents bottlenecks and enables proactive intervention
- **Quality Assurance**: Continuous validation ensures adherence to project standards and architectural patterns
- **Team Coordination**: Stakeholder-specific reporting facilitates effective communication and decision-making
- **Risk Mitigation**: Early identification of blockers and compliance issues prevents project delays

## Execution Process

Execute these operations concurrently for comprehensive status assessment:

### Primary Status Analysis

1. **Analyze current task phase** and calculate accurate completion percentage
2. **Validate documentation compliance** against project workflow requirements
3. **Assess technical integration status** with codebase and development environment
4. **Identify active blockers** across technical, process, and dependency categories

### Quality and Compliance Validation

1. **Verify phase gate completion** using project-specific quality standards
2. **Validate CI/CD integration** and automated quality tool compliance
3. **Check team process alignment** and communication pattern adherence
4. **Evaluate technical debt impact** and architectural consistency

### Stakeholder Communication Preparation

1. **Generate audience-specific reports** for technical, product, and management teams
2. **Prepare remediation guidance** with actionable resolution steps
3. **Calculate timeline adjustments** based on discovered complexity and blockers
4. **Invoke meeting-facilitator sub-agent** for stakeholder communication coordination

## Expected Outputs

Generate structured status report using this exact XML schema:

```xml
<command_output>
  <task_status>
    <current_phase>Analysis|Planning|Implementation|Validation</current_phase>
    <completion_percentage>0-100</completion_percentage>
    <phase_compliance>compliant|needs_attention|critical_issues</phase_compliance>
  </task_status>

  <blockers>
    <technical_blockers>
      <blocker priority="high|medium|low" category="code|infrastructure|dependencies">
        <description>Specific issue description</description>
        <impact>Business/technical impact assessment</impact>
        <resolution_strategy>Actionable resolution steps</resolution_strategy>
      </blocker>
    </technical_blockers>
    <process_blockers>
      <blocker priority="high|medium|low" category="workflow|communication|resources">
        <description>Process issue description</description>
        <resolution_strategy>Process improvement steps</resolution_strategy>
      </blocker>
    </process_blockers>
  </blockers>

  <project_integration>
    <codebase_alignment>excellent|good|needs_improvement|critical</codebase_alignment>
    <quality_tools_status>passing|warnings|failing</quality_tools_status>
    <documentation_compliance>complete|partial|insufficient</documentation_compliance>
  </project_integration>

  <stakeholder_reports>
    <technical_team>
      <code_quality_metrics>Detailed technical metrics</code_quality_metrics>
      <test_coverage>Coverage percentage and gaps</test_coverage>
      <performance_impact>Performance analysis</performance_impact>
    </technical_team>
    <product_team>
      <feature_progress>User-facing progress summary</feature_progress>
      <business_value>Value delivery assessment</business_value>
      <user_impact>Impact on user experience</user_impact>
    </product_team>
    <management_team>
      <resource_utilization>Team capacity and allocation</resource_utilization>
      <timeline_status>Schedule adherence and projections</timeline_status>
      <risk_factors>Identified risks and mitigation</risk_factors>
    </management_team>
  </stakeholder_reports>

  <next_steps>
    <immediate_actions>High-priority actions for next 24-48 hours</immediate_actions>
    <timeline_adjustments>Recommended schedule modifications</timeline_adjustments>
    <resource_needs>Additional resources or support required</resource_needs>
  </next_steps>

  <remediation_guidance>
    <compliance_issues>Workflow violations and correction steps</compliance_issues>
    <process_improvements>Recommended process enhancements</process_improvements>
    <sub_agent_recommendations>Suggested sub-agent invocations</sub_agent_recommendations>
  </remediation_guidance>
</command_output>
```

## Success Criteria

- Accurate phase assessment with measurable completion metrics
- Complete blocker identification with prioritized resolution strategies
- Stakeholder-ready reports tailored to audience technical literacy
- Actionable next steps with realistic timeline projections
- Full compliance validation against project workflow standards
