Update existing task with comprehensive integration of new information: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Seamlessly integrate new requirements** while preserving all existing task context and progress
2. **Perform comprehensive impact assessment** across technical, timeline, and resource dimensions
3. **Apply smart delta updates** to affected documentation sections without losing valuable insights
4. **Maintain workflow compliance** ensuring updates align with project standards and quality gates

## Context and Motivation

This command is essential because:

- **Context Preservation**: Maintains project-specific discoveries and technical decisions made during task progression
- **Change Management**: Ensures requirement changes are integrated without losing workflow momentum or quality
- **Efficiency**: Smart delta updates prevent unnecessary rework while maintaining documentation accuracy
- **Team Coordination**: Systematic update process maintains transparency and stakeholder alignment

## Execution Process

Execute these operations sequentially for precise task updating:

### Context Analysis and Preservation

1. **Read existing task documentation** from `.claude/tasks/[TASK-ID]/` directory
2. **Analyze current task state** including phase completion and quality gate status
3. **Identify valuable insights** that must be preserved through the update process
4. **Document current progress** to prevent loss during update integration

### Delta Change Analysis

1. **Invoke @task-updater sub-agent** to analyze specific changes needed
2. **Categorize update type** (requirements change, technical discovery, meeting outcomes, tool changes)
3. **Assess impact scope** on existing analysis, planning, and implementation work
4. **Identify documentation sections** requiring updates versus those to preserve

### Smart Update Application

1. **Apply incremental updates** using intelligent change logic:
   - **Requirements change** → Update analysis.md sections, preserve root cause analysis
   - **Technical discovery** → Update plan.md approach, maintain analysis insights
   - **Meeting outcomes** → Update scope in plan.md, preserve technical investigation
   - **Tool changes** → Update implementation approach, maintain architecture decisions

### Quality and Compliance Validation

1. **Validate updated documentation** against project workflow standards
2. **Ensure quality gate alignment** with updated requirements and scope
3. **Track all changes** for future reference and audit trail
4. **Recommend sub-agent re-invocation** if significant scope changes detected

## Expected Outputs

Generate comprehensive update report using this exact XML schema:

```xml
<command_output>
  <update_metadata>
    <task_id>Task identifier being updated</task_id>
    <update_type>requirements_change|technical_discovery|meeting_outcomes|tool_changes|scope_modification</update_type>
    <update_timestamp>ISO 8601 timestamp of update</update_timestamp>
    <original_phase>Current task phase before update</original_phase>
  </update_metadata>

  <delta_analysis>
    <changes_identified>
      <change category="requirements|technical|scope|tools" impact="high|medium|low">
        <description>Specific change description</description>
        <affected_sections>List of documentation sections impacted</affected_sections>
        <preservation_requirements>Insights/work that must be maintained</preservation_requirements>
      </change>
    </changes_identified>
    <impact_assessment>
      <timeline_impact>Timeline implications of changes</timeline_impact>
      <resource_impact>Resource allocation changes needed</resource_impact>
      <quality_gate_impact>Effect on existing quality requirements</quality_gate_impact>
    </impact_assessment>
  </delta_analysis>

  <documentation_updates>
    <analysis_updates>
      <sections_modified>List of analysis.md sections updated</sections_modified>
      <preserved_insights>Critical analysis insights maintained</preserved_insights>
      <new_content>New analysis content added</new_content>
    </analysis_updates>
    <planning_updates>
      <approach_modifications>Changes to technical approach in plan.md</approach_modifications>
      <preserved_architecture>Architectural decisions maintained</preserved_architecture>
      <scope_adjustments>Scope modifications reflected</scope_adjustments>
    </planning_updates>
    <implementation_updates>
      <tool_changes>Updated tools and technologies</tool_changes>
      <approach_refinements>Implementation approach adjustments</approach_refinements>
      <quality_updates>Quality assurance modifications</quality_updates>
    </implementation_updates>
  </documentation_updates>

  <change_tracking>
    <change_log>
      <entry timestamp="ISO 8601">
        <change_type>Type of modification made</change_type>
        <sections_affected>Documentation sections modified</sections_affected>
        <rationale>Reason for the change</rationale>
      </entry>
    </change_log>
    <version_history>Documentation version tracking information</version_history>
  </change_tracking>

  <workflow_compliance>
    <quality_gates_status>Status of quality gates after update</quality_gates_status>
    <workflow_alignment>Confirmation of continued workflow compliance</workflow_alignment>
    <sub_agent_recommendations>
      <recommended_invocations>Sub-agents that should be re-invoked due to changes</recommended_invocations>
      <skip_recommendations>Sub-agents that do not need re-invocation</skip_recommendations>
    </sub_agent_recommendations>
  </workflow_compliance>

  <stakeholder_summary>
    <change_overview>High-level summary of what changed and why</change_overview>
    <business_impact>Impact on business objectives and deliverables</business_impact>
    <next_steps>Immediate actions required post-update</next_steps>
  </stakeholder_summary>
</command_output>
```

## Success Criteria

- Complete integration of new information with zero loss of existing valuable work
- Accurate delta analysis with precise impact assessment
- Updated documentation maintaining project workflow compliance
- Clear change tracking for audit and future reference
- Stakeholder-ready summary with actionable next steps
