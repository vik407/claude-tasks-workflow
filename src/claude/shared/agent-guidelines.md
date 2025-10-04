# Shared Agent Guidelines

This document contains foundational principles and patterns referenced by all workflow agents. These guidelines ensure consistency across all phases while reducing redundancy in individual agent files.

## Core Principles

### Evidence-Based Work

All agents gather concrete evidence before drawing conclusions:

- Read actual files to understand current state
- Examine configurations and codebase directly
- Base all conclusions on specific evidence (file paths, line numbers, system behavior)
- Avoid speculation - prioritize factual, evidence-based findings

### Output Format Standards

All agents use clear markdown structure instead of XML:

- Use markdown headings (###, ####) for organization
- Structure data with bullet points and sub-headings
- Include priority/severity/status indicators inline (e.g., "Priority: High")
- Maintain consistent formatting across all outputs

### Quality Standards

Every agent output must include:

- **Specific Evidence**: File paths, line numbers, concrete system references
- **Actionable Insights**: Recommendations the team can immediately implement
- **Architectural Awareness**: Solutions that align with existing system patterns
- **Risk-Aware Guidance**: Clear understanding of complexity and potential side effects
- **Grounded Analysis**: Factual findings over speculative conclusions

## Tool Usage Patterns

### File Operations

- **Read files** to understand current state before making changes
- **Examine actual codebase** rather than making assumptions about structure
- **Verify context** by reading package.json, config files, and architectural patterns

### Parallel Tool Execution

Sonnet 4.5 automatically coordinates parallel tool calls efficiently:

- Execute independent operations in single messages when possible
- No need to document parallel processing capabilities in each agent
- Trust the model to optimize tool call sequencing

### Context Discovery

- Check for cached context in `.claude/project-context.md` before full analysis
- Perform delta updates on cached context when technology stack changes
- Reference existing patterns from `.claude/knowledge/project-patterns.md`

## Complexity Classification

### Binary Classification System

Use SIMPLE vs COMPLEX for all task classifications:

**SIMPLE** (< 1 day):

- Single file changes, configuration updates, content modifications
- Simple UI adjustments, straightforward multi-file components
- Clear patterns exist in codebase for reference

**COMPLEX** (1+ days):

- Architecture changes, system integrations, performance optimizations
- Security implementations, new features requiring cross-component integration
- No existing pattern in codebase, requires architectural review

### Classification Impact

- **SIMPLE**: Streamlined workflow, direct implementation guidance
- **COMPLEX**: Comprehensive analysis, detailed planning, phased implementation with validation

## Integration with Workflow

### Phase Dependencies

1. **Analysis Phase** (task-analyzer): Root cause investigation and system impact assessment
2. **Planning Phase** (task-planner): Solution architecture and implementation blueprint
3. **Implementation Phase** (implementation-guide): Code changes with continuous validation
4. **Communication Phase** (meeting-facilitator): Stakeholder updates and coordination

### Phase Gates

- Analysis must complete before planning begins
- Planning must be validated before implementation starts
- Implementation includes continuous quality validation
- Communication can occur at any phase boundary

### Delta Updates

When requirements change mid-workflow:

- Use task-updater to preserve existing work
- Selectively re-execute only affected components
- Maintain workflow continuity through intelligent preservation

## Validation and Quality Assurance

### Hook-Based Validation

The workflow uses validation hooks that execute automatically:

- Hooks trigger on Write/Edit tool calls
- Results are cached for efficient access
- Commands check validation caches instead of re-validating
- Non-blocking design - hooks always return success

### Quality Gates

Each agent includes embedded quality validation:

- Evidence completeness checks
- Actionability verification
- Architectural consistency confirmation
- Risk assessment and mitigation planning

## Agent-Specific Adaptations

While these guidelines apply to all agents, each agent adapts them to their specific role:

- **task-analyzer**: Focuses on evidence gathering and root cause identification
- **task-planner**: Emphasizes architecture alignment and risk mitigation
- **implementation-guide**: Prioritizes mode selection (AUTO/GUIDED) and continuous testing
- **task-updater**: Specializes in preservation vs re-execution decisions
- **meeting-facilitator**: Adapts content depth to audience expertise level

## Technology Stack Awareness

All agents should adapt their approach based on discovered technology:

### Detection Patterns

- Package managers: package.json, requirements.txt, Cargo.toml, pom.xml
- Frameworks: React, Vue, Angular, Django, Flask, Express, Rails
- Testing: Jest, Pytest, Cypress, RSpec configurations
- Build tools: Webpack, Vite, Rollup, Parcel, Next.js

### Integration Requirements

- Use existing project patterns and conventions
- Leverage discovered testing frameworks
- Align with current build and deployment processes
- Follow project's code style and formatting standards

## Best Practices

### Documentation

- Keep documentation concise and actionable
- Focus on "why" rather than just "what"
- Include specific examples with file references
- Maintain consistency with project conventions

### Communication

- Use audience-appropriate technical depth
- Provide clear next steps with ownership
- Include measurable success criteria
- Support claims with specific evidence

### Efficiency

- Leverage cached context when available
- Perform delta updates instead of full re-runs
- Reuse existing project patterns
- Minimize token usage through smart tool use

---

_These guidelines are living standards that evolve with the workflow. All agents reference this document for foundational principles while maintaining their specialized expertise._
