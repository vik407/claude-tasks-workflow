Return task to backlog with comprehensive documentation and future readiness: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Preserve all completed work** ensuring zero loss of analysis, research, and planning efforts
2. **Document backlog transition** with clear rationale and stakeholder communication
3. **Enable efficient task resumption** with complete context and readiness assessment
4. **Update project tracking systems** maintaining visibility and priority alignment

## Context and Motivation

This command is critical for project continuity because:

- **Investment Protection**: Preserves valuable analysis and planning work for future utilization
- **Priority Management**: Enables agile response to changing business priorities without losing progress
- **Team Efficiency**: Comprehensive documentation ensures seamless task resumption by any team member
- **Stakeholder Transparency**: Clear communication maintains trust and understanding of priority changes

## Execution Process

Execute these operations in parallel for comprehensive backlog transition:

### Work Preservation and Documentation

1. **Analyze completed work** across all task phases (analysis, planning, partial implementation)
2. **Preserve all research artifacts** including technical investigations and architectural decisions
3. **Document implementation readiness** with current state assessment
4. **Capture dependencies and blockers** identified during task progression

### Backlog Transition Analysis

1. **Document transition rationale** with business context and priority justification
2. **Assess resumption effort** based on preserved work and context
3. **Identify optimal resumption conditions** including team availability and dependencies
4. **Recommend future timeline** considering current analysis and changing priorities

### Stakeholder Communication

1. **Prepare stakeholder-friendly summary** explaining priority change and preserved value
2. **Update project tracking systems** (Jira, project dashboards) with current status
3. **Create technical handoff documentation** for future team member assignment
4. **Generate resumption readiness report** for project managers and technical leads

### Future Readiness Optimization

1. **Organize task workspace** for efficient future access and understanding
2. **Tag and categorize artifacts** for quick context rebuilding
3. **Document integration points** with current codebase state
4. **Prepare resumption checklist** with validation steps and context verification

## Expected Outputs

Generate comprehensive backlog documentation using this exact XML schema:

```xml
<command_output>
  <backlog_transition>
    <task_id>Task identifier being returned to backlog</task_id>
    <transition_date>ISO 8601 timestamp of backlog return</transition_date>
    <current_phase>Phase task was in when returned to backlog</current_phase>
    <completion_percentage>Percentage of overall task completed</completion_percentage>
  </backlog_transition>

  <transition_rationale>
    <business_justification>Business reason for returning task to backlog</business_justification>
    <priority_context>Current priority landscape and competing initiatives</priority_context>
    <resource_allocation>Team resource considerations affecting priority</resource_allocation>
    <timeline_pressures>Schedule constraints influencing decision</timeline_pressures>
  </transition_rationale>

  <work_preservation>
    <analysis_completed>
      <requirements_analysis>Completed requirements and scope analysis</requirements_analysis>
      <technical_research>Technical investigations and findings</technical_research>
      <architectural_decisions>Architecture and design decisions made</architectural_decisions>
    </analysis_completed>
    <planning_completed>
      <implementation_plan>Detailed implementation approach planned</implementation_plan>
      <timeline_estimates>Time and resource estimates developed</timeline_estimates>
      <risk_assessments>Identified risks and mitigation strategies</risk_assessments>
    </planning_completed>
    <partial_implementation>
      <code_changes>Any code modifications already completed</code_changes>
      <infrastructure_setup>Infrastructure or environment preparations</infrastructure_setup>
      <testing_preparation>Test cases and validation approaches prepared</testing_preparation>
    </partial_implementation>
  </work_preservation>

  <resumption_readiness>
    <estimated_effort>Effort required to complete task from current state</estimated_effort>
    <skill_requirements>Team skills needed for task completion</skill_requirements>
    <dependency_status>Current status of identified dependencies</dependency_status>
    <blocker_analysis>Known blockers and resolution status</blocker_analysis>
    <optimal_conditions>Ideal conditions for task resumption</optimal_conditions>
  </resumption_readiness>

  <future_timeline>
    <recommended_prioritization>Suggested priority level for future planning</recommended_prioritization>
    <ideal_resumption_window>Optimal time frame for task resumption</ideal_resumption_window>
    <milestone_alignment>Alignment with project milestones and releases</milestone_alignment>
    <resource_planning>Team allocation recommendations for resumption</resource_planning>
  </future_timeline>

  <stakeholder_communication>
    <executive_summary>High-level summary for executive stakeholders</executive_summary>
    <technical_summary>Detailed summary for technical team members</technical_summary>
    <business_impact>Impact assessment of delayed completion</business_impact>
    <alternative_solutions>Alternative approaches or workarounds considered</alternative_solutions>
  </stakeholder_communication>

  <documentation_artifacts>
    <backlog_summary_file>Path to generated backlog-summary.md file</backlog_summary_file>
    <preserved_analysis>Location of preserved analysis documentation</preserved_analysis>
    <technical_handoff>Technical handoff documentation location</technical_handoff>
    <resumption_checklist>Future resumption validation checklist</resumption_checklist>
  </documentation_artifacts>

  <project_system_updates>
    <jira_updates>Jira ticket status and comment updates</jira_updates>
    <dashboard_updates>Project dashboard status modifications</dashboard_updates>
    <team_notifications>Team communication and notification summaries</team_notifications>
  </project_system_updates>
</command_output>
```

## Deliverables Generated

1. **`.claude/tasks/[TASK-ID]/backlog-summary.md`** - Comprehensive backlog transition documentation
2. **Jira ticket updates** - Status change with detailed rationale and preserved value summary
3. **Technical handoff documentation** - Complete context for future team member assignment
4. **Stakeholder communication materials** - Ready-to-share summaries for different audience types
5. **Resumption readiness checklist** - Validation steps for efficient task restart

## Success Criteria

- Complete preservation of all analysis, research, and planning work
- Clear documentation of transition rationale and business context
- Future team member can resume task efficiently with full context
- Stakeholder communication maintains transparency and confidence
- Project tracking systems accurately reflect current status and preserved value
