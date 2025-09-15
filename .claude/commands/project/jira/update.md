Update Jira ticket with comprehensive workflow integration and intelligent stakeholder communication: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Execute intelligent Jira integration** with project-specific configuration detection and workflow mapping
2. **Generate stakeholder-tailored communications** with audience-appropriate technical detail and business context
3. **Preserve complete workflow traceability** linking technical implementation to business requirements and project tracking
4. **Automate status synchronization** maintaining accuracy between development workflow and project management systems

## Context and Motivation

This command is essential for project transparency because:

- **Stakeholder Alignment**: Ensures all project participants have appropriate visibility into task progress and technical details
- **Workflow Integration**: Seamlessly bridges technical development activities with business project management requirements
- **Communication Efficiency**: Eliminates manual status updates while providing richer context than basic status changes
- **Audit Trail**: Maintains comprehensive record of development decisions and progress for future reference

## Execution Process

Execute these operations concurrently for comprehensive Jira integration:

### Project Configuration Analysis

1. **Detect Jira configuration** including status workflows, custom fields, and notification settings
2. **Identify stakeholder groups** based on ticket assignments, watchers, and component ownership
3. **Map workflow status** to appropriate Jira transitions and field updates
4. **Analyze integration requirements** including automation rules and webhook configurations

### Context-Rich Comment Generation

1. **Generate audience-specific summaries** tailored to business, technical, QA, and management stakeholders
2. **Include technical context** with relevant code references, architectural decisions, and integration points
3. **Provide business impact assessment** linking technical changes to user value and business objectives
4. **Document quality metrics** including test coverage, performance impact, and security considerations

### Intelligent Stakeholder Communication

1. **Auto-identify notification recipients** based on role, component ownership, and ticket relationships
2. **Customize message content** appropriate for each stakeholder's technical literacy and involvement level
3. **Include relevant attachments** such as technical summaries, test reports, and architecture diagrams
4. **Schedule follow-up actions** for stakeholder review, approval, or additional input requirements

## Expected Outputs

Generate comprehensive Jira update using this exact XML schema:

<command_output>
<jira_update_metadata>
<task_id>Task identifier being updated in Jira</task_id>
<jira_ticket_key>Jira ticket key (e.g., ABC-1234)</jira_ticket_key>
<update_timestamp>ISO 8601 timestamp of Jira update</update_timestamp>
<current_workflow_status>Current task workflow status</current_workflow_status>
<target_jira_status>Target Jira status after update</target_jira_status>
</jira_update_metadata>

<project_configuration>
<jira_integration_settings>
<workflow_mapping>Mapping between task workflow and Jira statuses</workflow_mapping>
<custom_fields>Project-specific Jira custom fields and their values</custom_fields>
<notification_rules>Automated notification and escalation rules</notification_rules>
</jira_integration_settings>
<stakeholder_identification>
<business_stakeholders>Business users and product owners</business_stakeholders>
<technical_team>Development and architecture team members</technical_team>
<qa_team>Testing and quality assurance personnel</qa_team>
<project_management>Project managers and delivery leads</project_management>
</stakeholder_identification>
</project_configuration>

<audience_specific_communications>
<business_summary>
<progress_overview>Non-technical progress summary for business stakeholders</progress_overview>
<user_impact>Impact on end users and business value delivered</user_impact>
<acceptance_criteria_status>Status of acceptance criteria validation</acceptance_criteria_status>
<business_risk_assessment>Business risk factors and impact analysis</business_risk_assessment>
</business_summary>
<technical_summary>
<implementation_approach>Technical approach and architectural decisions made</implementation_approach>
<code_quality_metrics>Test coverage, code quality, and performance metrics</code_quality_metrics>
<integration_analysis>System integration points and dependency impact</integration_analysis>
<technical_debt_assessment>Technical debt considerations and future implications</technical_debt_assessment>
</technical_summary>
<qa_testing_summary>
<testing_requirements>Testing scope and validation requirements</testing_requirements>
<environment_configuration>Test environment setup and configuration needs</environment_configuration>
<regression_considerations>Regression testing impact and recommendations</regression_considerations>
<automation_status>Test automation coverage and quality</automation_status>
</qa_testing_summary>
<management_summary>
<timeline_adherence>Schedule performance and delivery timeline status</timeline_adherence>
<resource_utilization>Team capacity utilization and coordination needs</resource_utilization>
<scope_impact>Scope changes and their effect on project delivery</scope_impact>
<risk_mitigation>Risk factors identified and mitigation strategies</risk_mitigation>
</management_summary>
</audience_specific_communications>

<technical_context_integration>
<code_references>
<modified_files>List of files modified with line number references</modified_files>
<architectural_changes>System architecture modifications and rationale</architectural_changes>
<api_contract_changes>API modifications and backward compatibility status</api_contract_changes>
</code_references>
<performance_metrics>
<benchmark_results>Performance benchmark comparisons before and after</benchmark_results>
<resource_utilization>CPU, memory, and database performance impact</resource_utilization>
<scalability_considerations>Scalability implications and recommendations</scalability_considerations>
</performance_metrics>
<quality_validation>
<test_coverage_analysis>Code coverage metrics and gap analysis</test_coverage_analysis>
<security_scan_results>Security vulnerability scans and remediation status</security_scan_results>
<compliance_validation>Regulatory and standard compliance verification</compliance_validation>
</quality_validation>
</technical_context_integration>

<workflow_synchronization>
<status_transition>
<previous_status>Previous Jira ticket status</previous_status>
<new_status>Updated Jira ticket status after workflow progression</new_status>
<transition_rationale>Business and technical justification for status change</transition_rationale>
</status_transition>
<field_updates>
<priority_adjustments>Priority level modifications based on complexity analysis</priority_adjustments>
<component_assignments>Component ownership and responsibility updates</component_assignments>
<timeline_estimates>Updated time estimates based on actual complexity</timeline_estimates>
</field_updates>
<automation_triggers>
<notification_dispatched>Automated notifications sent to stakeholder groups</notification_dispatched>
<workflow_rules_executed>Project automation rules triggered by status change</workflow_rules_executed>
<integration_webhooks>External system integrations notified of changes</integration_webhooks>
</automation_triggers>
</workflow_synchronization>

<attachment_generation>
<technical_documentation>
<implementation_summary>Detailed technical implementation summary document</implementation_summary>
<architecture_diagrams>System architecture changes visualization</architecture_diagrams>
<test_reports>Automated test execution results and coverage reports</test_reports>
</technical_documentation>
<business_documentation>
<feature_specification>Updated feature specification with implementation details</feature_specification>
<user_acceptance_criteria>Acceptance criteria validation results</user_acceptance_criteria>
<business_impact_analysis>Business value and impact assessment documentation</business_impact_analysis>
</business_documentation>
</attachment_generation>
</command_output>

## Stakeholder Communication Templates

### Business Stakeholder Update

- **Progress Summary**: Non-technical overview of task completion and business value
- **User Impact**: How changes affect end-user experience and business operations
- **Acceptance Criteria**: Status of business requirement validation
- **Timeline**: Updated delivery expectations and any schedule adjustments

### Technical Team Communication

- **Implementation Details**: Architectural decisions and technical approach taken
- **Code Quality**: Test coverage, performance metrics, and maintainability assessment
- **Integration Points**: System dependencies and API contract implications
- **Technical Debt**: Code quality considerations and future maintenance implications

### QA and Testing Update

- **Testing Scope**: Required validation activities and acceptance criteria
- **Environment Requirements**: Test environment configuration and data needs
- **Regression Impact**: Potential impact on existing functionality
- **Automation**: Test automation coverage and quality validation

### Project Management Summary

- **Schedule Performance**: Timeline adherence and delivery confidence
- **Resource Impact**: Team capacity utilization and coordination requirements
- **Scope Management**: Changes to original scope and delivery expectations
- **Risk Assessment**: Identified risks and recommended mitigation strategies

## Intelligent Status Mapping

**Analysis Phase Completion**:

- Jira Status: "In Analysis" → "Technical Review" → "Ready for Planning"
- Required Fields: Analysis completion percentage, technical complexity assessment
- Stakeholder Notifications: Technical leads, product owners, assigned developers

**Planning Phase Completion**:

- Jira Status: "In Planning" → "Ready for Development" → "Sprint Ready"
- Required Fields: Implementation approach, effort estimates, dependency identification
- Stakeholder Notifications: Development team, QA leads, project managers

**Implementation Progress**:

- Jira Status: "In Development" → "Code Review" → "Ready for Testing"
- Required Fields: Code completion percentage, test coverage, integration status
- Stakeholder Notifications: Code reviewers, QA team, stakeholders requiring demos

**Validation and Deployment**:

- Jira Status: "In Testing" → "Ready for Deployment" → "Done"
- Required Fields: Test results, performance validation, deployment readiness
- Stakeholder Notifications: Business stakeholders, operations team, end users

## Success Criteria

- Accurate Jira status synchronization with comprehensive workflow context
- Stakeholder-appropriate communication with relevant technical and business details
- Complete traceability between development activities and project management tracking
- Automated notification and escalation based on project-specific rules and stakeholder roles
