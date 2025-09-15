Execute comprehensive sprint planning analysis with task readiness assessment and risk evaluation: $ARGUMENTS

## Explicit Instructions

This command accomplishes the following specific objectives:

1. **Perform comprehensive task readiness analysis** validating completion of analysis and planning phases for all proposed sprint tasks
2. **Execute dependency mapping and risk assessment** identifying cross-task dependencies, resource conflicts, and implementation risks
3. **Generate accurate effort estimation** based on documented analysis depth and implementation complexity assessment
4. **Provide sprint commitment recommendations** with confidence levels and risk mitigation strategies

## Context and Motivation

This command is essential for sprint success because:

- **Commitment Accuracy**: Thorough task readiness assessment prevents sprint scope inflation and delivery failures
- **Risk Mitigation**: Early identification of dependencies and risks enables proactive mitigation and contingency planning
- **Resource Optimization**: Accurate effort estimation enables effective team capacity planning and workload distribution
- **Quality Assurance**: Validation of analysis completion ensures implementation quality and reduces technical debt

## Execution Process

Execute these operations concurrently for comprehensive sprint planning:

### Task Portfolio Analysis and Validation

1. **Parse and validate all task identifiers** from input arguments ensuring proper task identification and accessibility
2. **Assess analysis phase completion** for each task validating depth and quality of problem investigation
3. **Evaluate planning phase maturity** confirming implementation approach definition and architectural decisions
4. **Identify incomplete or high-risk tasks** requiring additional analysis or planning before sprint commitment

### Cross-Task Dependency Mapping

1. **Analyze technical dependencies** between tasks including shared components, integration points, and architectural changes
2. **Identify resource dependencies** including team member expertise, external system access, and stakeholder availability
3. **Map timeline dependencies** understanding task sequencing requirements and critical path implications
4. **Assess dependency risk factors** including external dependencies and uncontrollable variables

### Effort Estimation and Capacity Planning

1. **Extract documented effort estimates** from task planning documentation with confidence interval analysis
2. **Validate estimation accuracy** based on analysis depth and implementation complexity factors
3. **Aggregate team capacity requirements** considering individual expertise and availability
4. **Identify capacity conflicts** and resource allocation challenges for proposed sprint scope

### Risk Assessment and Mitigation Planning

1. **Analyze implementation risks** across all proposed tasks including technical complexity and integration challenges
2. **Assess team and resource risks** including skill gaps, availability conflicts, and external dependencies
3. **Evaluate timeline risks** including unrealistic estimates and dependency-driven delays
4. **Develop risk mitigation strategies** with contingency planning and scope adjustment recommendations

## Expected Outputs

Generate comprehensive sprint planning analysis using this exact XML schema:

<command_output>
<sprint_planning_metadata>
<planning_timestamp>ISO 8601 timestamp of sprint planning analysis</planning_timestamp>
<sprint_identifier>Sprint identifier or planning session reference</sprint_identifier>
<task_count>Total number of tasks analyzed for sprint inclusion</task_count>
<team_capacity>Available team capacity for sprint duration</team_capacity>
</sprint_planning_metadata>

<task_readiness_assessment>
<task_analysis>
<task_id>Task identifier</task_id>
<readiness_status>ready|conditional|not_ready</readiness_status>
<analysis_completeness>
<analysis_depth>Quality and depth of problem analysis</analysis_depth>
<stakeholder_clarity>Clarity of stakeholder requirements and acceptance criteria</stakeholder_clarity>
<technical_understanding>Technical understanding and architectural decisions</technical_understanding>
</analysis_completeness>
<planning_maturity>
<implementation_approach>Implementation approach definition and architectural decisions</implementation_approach>
<effort_estimation>Effort estimation accuracy and confidence level</effort_estimation>
<risk_identification>Risk identification and mitigation planning</risk_identification>
</planning_maturity>
<readiness_gaps>
<analysis_gaps>Analysis work required before sprint commitment</analysis_gaps>
<planning_requirements>Planning work needed for implementation readiness</planning_requirements>
<dependency_clarification>Dependencies requiring clarification or resolution</dependency_clarification>
</readiness_gaps>
</task_analysis>
</task_readiness_assessment>

<dependency_analysis>
<technical_dependencies>
<dependency_type>shared_component|integration_point|architectural_change</dependency_type>
<dependent_tasks>Tasks affected by this dependency</dependent_tasks>
<dependency_description>Description of technical dependency and its implications</dependency_description>
<resolution_requirements>Requirements for dependency resolution</resolution_requirements>
<risk_factors>Risk factors associated with dependency</risk_factors>
</technical_dependencies>
<resource_dependencies>
<dependency_type>expertise|access|stakeholder|external_team</dependency_type>
<affected_tasks>Tasks requiring this resource dependency</affected_tasks>
<availability_assessment>Assessment of resource availability during sprint</availability_assessment>
<mitigation_strategies>Strategies for managing resource dependency risks</mitigation_strategies>
</resource_dependencies>
<timeline_dependencies>
<dependency_sequence>Required task execution sequence</dependency_sequence>
<critical_path>Critical path analysis and timeline implications</critical_path>
<scheduling_constraints>Scheduling constraints and timeline requirements</scheduling_constraints>
<flexibility_assessment>Assessment of timeline flexibility and adjustment options</flexibility_assessment>
</timeline_dependencies>
</dependency_analysis>

<effort_estimation_analysis>
<individual_task_estimates>
<task_id>Task identifier</task_id>
<estimated_effort>Effort estimate from task planning documentation</estimated_effort>
<confidence_level>Confidence level in estimate accuracy</confidence_level>
<complexity_factors>Factors contributing to implementation complexity</complexity_factors>
<estimation_basis>Basis for effort estimation (analysis depth, similar work, etc.)</estimation_basis>
</individual_task_estimates>
<aggregate_analysis>
<total_estimated_effort>Sum of all individual task estimates</total_estimated_effort>
<team_capacity_utilization>Percentage of team capacity utilized by proposed tasks</team_capacity_utilization>
<capacity_buffer>Recommended capacity buffer for risk mitigation</capacity_buffer>
<overcommitment_risk>Risk assessment of team overcommitment</overcommitment_risk>
</aggregate_analysis>
<capacity_optimization>
<skill_distribution>Distribution of required skills across team members</skill_distribution>
<workload_balance>Workload balance across team members</workload_balance>
<bottleneck_identification>Identification of potential team or skill bottlenecks</bottleneck_identification>
<optimization_recommendations>Recommendations for capacity optimization</optimization_recommendations>
</capacity_optimization>
</effort_estimation_analysis>

<risk_assessment>
<implementation_risks>
<technical_complexity_risks>
<risk_description>Technical complexity risk factors</risk_description>
<probability>Probability of risk materialization</probability>
<impact>Impact on sprint timeline and deliverables</impact>
<mitigation_strategy>Risk mitigation and contingency strategies</mitigation_strategy>
</technical_complexity_risks>
<integration_risks>
<risk_description>System integration and compatibility risks</risk_description>
<affected_tasks>Tasks most affected by integration risks</affected_tasks>
<mitigation_approach>Integration testing and validation approaches</mitigation_approach>
</integration_risks>
<dependency_risks>
<risk_description>External dependency and resource availability risks</risk_description>
<contingency_planning>Contingency plans for dependency unavailability</contingency_planning>
<escalation_procedures>Escalation procedures for dependency resolution</escalation_procedures>
</dependency_risks>
</implementation_risks>
<team_resource_risks>
<skill_gap_risks>
<risk_description>Team skill gaps and expertise availability</risk_description>
<affected_work>Work areas most affected by skill gaps</affected_work>
<mitigation_strategies>Training, mentoring, or external support strategies</mitigation_strategies>
</skill_gap_risks>
<availability_risks>
<risk_description>Team member availability and capacity risks</risk_description>
<impact_assessment>Impact on sprint deliverables and timeline</impact_assessment>
<contingency_plans>Contingency plans for availability issues</contingency_plans>
</availability_risks>
</team_resource_risks>
<timeline_risks>
<estimation_accuracy_risks>
<risk_description>Risk of effort estimation inaccuracy</risk_description>
<probability_factors>Factors affecting estimation accuracy</probability_factors>
<buffer_recommendations>Recommended time buffers and contingency</buffer_recommendations>
</estimation_accuracy_risks>
<scope_creep_risks>
<risk_description>Risk of scope expansion during sprint</risk_description>
<prevention_strategies>Strategies for scope control and change management</prevention_strategies>
</scope_creep_risks>
</timeline_risks>
</risk_assessment>

<sprint_recommendations>
<commitment_recommendations>
<recommended_tasks>Tasks recommended for sprint commitment</recommended_tasks>
<conditional_tasks>Tasks requiring additional work before commitment</conditional_tasks>
<deferred_tasks>Tasks recommended for deferral to future sprints</deferred_tasks>
<commitment_rationale>Rationale for task inclusion and exclusion decisions</commitment_rationale>
</commitment_recommendations>
<scope_optimization>
<priority_ordering>Recommended task priority ordering for sprint execution</priority_ordering>
<parallel_execution>Tasks that can be executed in parallel</parallel_execution>
<sequential_requirements>Tasks requiring sequential execution</sequential_requirements>
<milestone_planning>Key milestones and validation points during sprint</milestone_planning>
</scope_optimization>
<risk_mitigation_plan>
<proactive_measures>Proactive measures for identified risk mitigation</proactive_measures>
<contingency_planning>Contingency plans for high-probability risks</contingency_planning>
<monitoring_requirements>Monitoring requirements for early risk detection</monitoring_requirements>
<escalation_protocols>Escalation procedures for risk materialization</escalation_protocols>
</risk_mitigation_plan>
</sprint_recommendations>

<confidence_assessment>
<overall_sprint_confidence>
<delivery_confidence>Confidence level in sprint delivery success</delivery_confidence>
<quality_confidence>Confidence in maintaining quality standards</quality_confidence>
<timeline_confidence>Confidence in meeting sprint timeline</timeline_confidence>
</overall_sprint_confidence>
<confidence_factors>
<positive_factors>Factors contributing to high confidence</positive_factors>
<risk_factors>Factors reducing confidence levels</risk_factors>
<mitigation_impact>Impact of risk mitigation on confidence levels</mitigation_impact>
</confidence_factors>
<recommendation_strength>
<commitment_strength>Strength of sprint commitment recommendation</commitment_strength>
<scope_flexibility>Flexibility for scope adjustments during sprint</scope_flexibility>
<success_probability>Estimated probability of sprint success</success_probability>
</recommendation_strength>
</confidence_assessment>
</command_output>

## Task Readiness Classification

### Ready for Sprint Commitment

**Analysis Requirements:**

- Complete problem investigation with root cause identification
- Clear stakeholder requirements and acceptance criteria
- System impact assessment and architectural implications
- Risk identification with mitigation strategies

**Planning Requirements:**

- Detailed implementation approach with architectural decisions
- Accurate effort estimation with confidence intervals
- Technology selection and integration strategy
- Testing approach and quality validation plan

### Conditional Sprint Inclusion

**Acceptable Gaps:**

- Minor implementation details requiring clarification
- Non-critical dependency resolution in progress
- Performance optimization details to be determined
- Secondary stakeholder approval pending

**Risk Mitigation Required:**

- Clear gap closure timeline before sprint start
- Contingency plans for gap resolution delays
- Alternative approaches if gaps cannot be closed
- Stakeholder agreement on conditional inclusion

### Not Ready for Sprint Commitment

**Critical Gaps:**

- Incomplete problem analysis or unclear requirements
- Major architectural decisions pending
- Significant dependencies unresolved
- Effort estimation highly uncertain or missing

**Preparation Required:**

- Complete analysis phase with stakeholder validation
- Architectural decision-making and planning completion
- Dependency resolution or clear mitigation strategies
- Accurate effort estimation with reasonable confidence

## Sprint Planning Best Practices

### Capacity Planning Guidelines

- **Reserve 20% capacity** for unplanned work and risk mitigation
- **Balance skill requirements** across team members and expertise areas
- **Consider velocity trends** from previous sprints for estimation validation
- **Plan for learning time** when new technologies or approaches are involved

### Risk Mitigation Strategies

- **Identify critical path** early and monitor dependencies closely
- **Plan parallel work streams** to reduce timeline risks
- **Establish checkpoint reviews** for early risk detection and course correction
- **Prepare scope adjustment options** for responding to risk materialization

### Quality Assurance Integration

- **Validate testing approaches** for all committed tasks
- **Ensure code review capacity** is available for all development work
- **Plan integration testing** for tasks with system dependencies
- **Schedule stakeholder validation** for user-facing changes

## Success Criteria

- Comprehensive task readiness assessment with clear commitment recommendations
- Complete dependency mapping with risk assessment and mitigation strategies
- Accurate effort estimation enabling realistic sprint planning and team commitment
- High confidence sprint recommendations balancing ambition with delivery reliability
