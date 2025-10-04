# Advanced Patterns & Optimization

Comprehensive guide to advanced workflow patterns, multi-task coordination, and performance tuning for Claude Tasks Workflow.

## Table of Contents

- [Advanced Workflow Patterns](#advanced-workflow-patterns)
- [Multi-Task Coordination](#multi-task-coordination)
- [Context Optimization](#context-optimization)
- [Knowledge Management Strategies](#knowledge-management-strategies)
- [Performance Tuning](#performance-tuning)
- [Custom Agent Development](#custom-agent-development)
- [Troubleshooting & Debugging](#troubleshooting--debugging)

---

## Advanced Workflow Patterns

### Pattern 1: Multi-Phase Task Evolution

Handle tasks that evolve through multiple requirement changes:

```bash
# Phase 1: Initial implementation
/project:task:init EVOLVE-001 "basic user authentication"
@task-analyzer EVOLVE-001
@task-planner EVOLVE-001
@implementation-guide EVOLVE-001 AUTO

# Phase 2: Meeting adds OAuth requirement
@task-updater EVOLVE-001 "stakeholder meeting: add OAuth2 and Google SSO"
# → Updates plan while preserving authentication analysis

# Phase 3: Security review adds 2FA
@task-updater EVOLVE-001 "security review: require 2FA for admin users"
# → Extends OAuth plan with 2FA, maintains continuity

# Phase 4: Performance optimization
@task-updater EVOLVE-001 "load testing: add Redis session caching"
# → Optimizes implementation, preserves all previous decisions
```

**Benefits**:

- Maintains decision history across all phases
- Preserves architectural rationale
- 80-90% token reduction vs. restarting each phase
- Clear evolution tracking for audits

### Pattern 2: Parallel Feature Development

Coordinate multiple related features with shared context:

```bash
# Initialize related features simultaneously
/project:task:init FEATURE-A "user profile management"
/project:task:init FEATURE-B "user settings API"
/project:task:init FEATURE-C "user preferences UI"

# Shared analysis phase (leverages cached context)
@task-analyzer FEATURE-A
@task-analyzer FEATURE-B
@task-analyzer FEATURE-C
# → All use same cached project context (60% faster)

# Coordinated planning
@task-planner "coordinate FEATURE-A, FEATURE-B, FEATURE-C with shared user data model"
# → Creates unified plan with shared patterns

# Parallel implementation with different modes
@implementation-guide FEATURE-A AUTO    # Backend (autonomous)
@implementation-guide FEATURE-B AUTO    # API (autonomous)
@implementation-guide FEATURE-C GUIDED  # UI (team learning)
```

**Benefits**:

- Shared context prevents redundant analysis
- Coordinated architecture across features
- Different implementation modes per complexity
- Reduced total planning time

### Pattern 3: Progressive Context Enrichment

Build richer context over time through accumulated knowledge:

```bash
# Week 1: First authentication task
/project:task:init AUTH-001 "implement JWT authentication"
@task-analyzer AUTH-001
# → Basic context: Node.js, Express detected

# Week 2: OAuth integration (context grows)
/project:task:init AUTH-002 "add OAuth2 provider support"
@task-analyzer AUTH-002
# → Enhanced context: JWT patterns from AUTH-001 referenced

# Week 3: Advanced auth (comprehensive context)
/project:task:init AUTH-003 "implement role-based access control"
@task-analyzer AUTH-003
# → Rich context: JWT + OAuth patterns, established RBAC approach

# Extract accumulated auth patterns
/project:knowledge:extract auth-patterns
# → Creates reusable authentication knowledge base
```

**Benefits**:

- Context accuracy improves 40-60% over time
- Faster subsequent task analysis
- Consistent patterns across team
- New team members access accumulated wisdom

### Pattern 4: Complexity-Adaptive Workflows

Automatically optimize workflow based on task complexity:

```bash
# Simple tasks get streamlined workflow
/project:task:simple FIX-001 "update copyright year in footer"
# → 5-minute workflow, minimal analysis

# Auto-detected simple task
/project:task:init FIX-002 "change button color from blue to green"
@task-analyzer FIX-002
# → Detects as SIMPLE, recommends streamlined path

# Complex tasks get full orchestration
/project:task:init ARCH-001 "migrate to microservices event sourcing"
@task-analyzer ARCH-001
# → Detects as COMPLEX, full analysis + planning + validation

# Borderline tasks get guidance
/project:task:init FEAT-001 "add CSV export to reports"
@task-analyzer FEAT-001
# → Provides complexity reasoning, recommends appropriate workflow
```

**Benefits**:

- 75% time savings on simple tasks
- Appropriate rigor for complex tasks
- Automatic workflow optimization
- Reduced cognitive overhead

---

## Multi-Task Coordination

### Coordinated Release Planning

Manage multiple tasks for a single release:

```bash
# Sprint planning: Initialize all sprint tasks
/project:task:init SPRINT-15-001 "refactor authentication module"
/project:task:init SPRINT-15-002 "add 2FA support"
/project:task:init SPRINT-15-003 "improve login UX"
/project:task:init SPRINT-15-004 "security audit fixes"

# Coordinated analysis with shared context
@task-analyzer SPRINT-15-001
@task-analyzer SPRINT-15-002
@task-analyzer SPRINT-15-003
@task-analyzer SPRINT-15-004
# → All leverage cached context, focus on task-specific issues

# Create unified sprint plan
@task-planner "coordinate sprint 15 tasks with dependencies:
  - SPRINT-15-001 (foundation)
  - SPRINT-15-002 (depends on 001)
  - SPRINT-15-003 (parallel with 002)
  - SPRINT-15-004 (integration testing after all)"

# Generate sprint briefing package
@meeting-facilitator sprint-planning SPRINT-15
# → Consolidated sprint overview, dependencies, timeline
```

### Dependency Management

Handle tasks with explicit dependencies:

```bash
# Task with prerequisites
/project:task:init DB-MIGRATION-002 "add user_preferences table"

# Analyze with dependency context
@task-analyzer DB-MIGRATION-002 "depends on: DB-MIGRATION-001 (user_profiles table)"
# → Checks prerequisite completion, validates schema compatibility

# Plan with dependency awareness
@task-planner DB-MIGRATION-002
# → Includes migration sequencing, rollback coordination

# Block implementation until dependencies met
@implementation-guide DB-MIGRATION-002 AUTO --require-dependencies
# → Validates prerequisites before execution
```

### Cross-Team Coordination

Coordinate tasks across multiple teams:

```bash
# Backend team task
/project:task:init API-V2-001 "design GraphQL API schema"
@task-analyzer API-V2-001
@task-planner API-V2-001

# Frontend team task (depends on backend)
/project:task:init UI-V2-001 "implement GraphQL client integration"
@task-analyzer UI-V2-001 "depends on: API-V2-001 schema definition"

# Coordinated planning across teams
@task-planner "coordinate API-V2-001 (backend) and UI-V2-001 (frontend)
  - Share GraphQL schema definitions
  - Coordinate type definitions
  - Plan integration testing approach"

# Generate cross-team briefing
@meeting-facilitator tech-review API-V2-001,UI-V2-001 --audience=multi-team
# → Creates unified briefing for both teams
```

---

## Context Optimization

### Selective Context Refresh

Optimize context updates by refreshing only what changed:

```bash
# After adding new dependencies
npm install new-library
/project:context:refresh dependencies
# → Updates only dependency analysis, preserves architecture/patterns

# After architectural changes
/project:context:refresh architecture
# → Updates architecture analysis, preserves dependencies/patterns

# After establishing new patterns
/project:context:refresh patterns
# → Updates pattern detection, preserves tech-stack/dependencies

# Full refresh when needed (rare)
/project:context:refresh --force
# → Complete re-analysis of entire project
```

### Context Cache Performance Monitoring

Track and optimize context cache effectiveness:

```bash
# View context cache statistics
/project:context:stats
# → Shows: cache hit rate, last refresh, size, coverage

# Example output:
# Cache Hit Rate: 92% (23 of 25 tasks)
# Last Refresh: 2025-10-01 (3 days ago)
# Cache Size: 2,847 tokens
# Coverage: Tech Stack (✓), Dependencies (✓), Patterns (✓), Architecture (✓)

# Optimize cache if hit rate < 80%
/project:context:refresh --optimize
# → Analyzes usage patterns, suggests selective refreshes
```

### Context Sharing Across Tasks

Maximize context reuse for related tasks:

```bash
# Group related tasks for optimal context sharing
/project:task:init AUTH-MODULE-001 "refactor JWT handling"
/project:task:init AUTH-MODULE-002 "add refresh token rotation"
/project:task:init AUTH-MODULE-003 "implement token blacklisting"

# All tasks share cached authentication context
# → 90% faster initialization vs. independent analysis
# → Consistent auth patterns across all tasks
# → 70-80% token reduction

# Verify context sharing
/project:context:usage AUTH-MODULE-*
# → Shows which tasks share cached context, savings achieved
```

### Context Versioning

Maintain context history for rollback and comparison:

```bash
# Snapshot current context before major changes
/project:context:snapshot "pre-microservices-migration"

# Make major architectural changes
# ... implement microservices ...

# Compare new vs. old context
/project:context:diff pre-microservices-migration
# → Shows what changed in tech stack, architecture, patterns

# Rollback context if needed
/project:context:restore pre-microservices-migration
# → Restores previous context snapshot
```

---

## Knowledge Management Strategies

### Pattern Extraction Workflows

Systematically build your project knowledge base:

```bash
# Extract patterns from individual completed task
/project:knowledge:extract COMPLETED-TASK-001
# → Adds patterns, decisions, learnings to knowledge base

# Extract patterns from sprint/milestone
/project:knowledge:extract sprint-15-completed
# → Consolidates patterns from all sprint tasks

# Extract patterns from time period
/project:knowledge:extract 2025-Q3
# → Quarterly pattern extraction for retrospectives

# Extract specific pattern types
/project:knowledge:extract --type=architectural ARCH-*
/project:knowledge:extract --type=risk-mitigation SECURITY-*
/project:knowledge:extract --type=team-process PROCESS-*
```

### Knowledge Base Organization

Structure accumulated wisdom for easy reference:

```bash
# View knowledge base structure
ls .claude/knowledge/

# Example structure:
# .claude/knowledge/
# ├── project-patterns.md          # Main pattern repository
# ├── architectural-decisions.md   # ADRs and design choices
# ├── risk-mitigations.md         # Proven solutions to challenges
# ├── team-learnings.md           # Process improvements
# └── quarterly-summaries/
#     ├── 2025-Q1.md
#     ├── 2025-Q2.md
#     └── 2025-Q3.md

# Generate comprehensive knowledge summary
/project:knowledge:summary current-quarter
# → Creates consolidated summary for knowledge sharing
```

### Knowledge-Driven Planning

Use accumulated knowledge in new tasks:

```bash
# Reference established patterns explicitly
@task-planner NEW-FEATURE-001 "use existing authentication patterns from project knowledge"
# → Planner references .claude/knowledge/project-patterns.md
# → Applies proven patterns instead of reinventing

# Find similar past tasks
/project:knowledge:search "authentication"
# → Returns: AUTH-001, AUTH-002, AUTH-003 with links and patterns

# Generate pattern-based implementation guide
@implementation-guide NEW-FEATURE-001 GUIDED --with-pattern-references
# → Includes references to similar past implementations
# → Shows pattern evolution over time
```

### Team Onboarding with Knowledge

Use accumulated knowledge for faster onboarding:

```bash
# Generate comprehensive onboarding briefing
@meeting-facilitator onboarding-briefing PROJECT-OVERVIEW
# → Uses accumulated knowledge to create onboarding materials
# → Includes: architecture, patterns, decisions, processes

# Create new team member task with extra context
@implementation-guide ONBOARDING-001 GUIDED --new-team-member
# → Includes additional learning materials
# → References knowledge base extensively
# → Slower pace, more explanation

# Extract onboarding-specific patterns
/project:knowledge:extract --type=onboarding completed-onboarding-tasks
# → Builds onboarding knowledge base
# → Improves onboarding process over time
```

---

## Performance Tuning

### Token Usage Optimization

Minimize token consumption through intelligent strategies:

```bash
# Monitor token usage per task
/project:task:stats ABC-123 --metrics=tokens
# → Shows: context (tokens), analysis (tokens), planning (tokens), total

# Example output:
# Token Usage Breakdown:
# - Context Discovery: 2,847 tokens (cached, reused 15 times)
# - Analysis: 1,234 tokens
# - Planning: 1,567 tokens
# - Implementation: 2,456 tokens
# - Total: 8,104 tokens
# - Savings from caching: 42,705 tokens (84% reduction)

# Optimize high token usage tasks
/project:task:optimize ABC-123
# → Suggests: simpler context, delta updates, pattern reuse
```

### Workflow Speed Optimization

Improve task completion speed:

```bash
# Benchmark current workflow performance
npm run benchmark:claude4

# Example output:
# Workflow Performance Metrics:
# - Simple Task (avg): 4.2 minutes (target: < 5 min) ✓
# - Complex Task (avg): 18.7 minutes (target: < 25 min) ✓
# - Context Discovery (avg): 38 seconds (target: < 60 sec) ✓
# - Delta Update (avg): 2.1 minutes (target: < 3 min) ✓

# Identify bottlenecks
/project:workflow:analyze-performance
# → Shows: slowest phases, optimization opportunities

# Enable parallel processing optimization
/project:workflow:config parallel-processing=enabled
# → Leverages Sonnet 4.5 native parallelization
```

### Cache Effectiveness Tuning

Optimize context cache for maximum benefit:

```bash
# Analyze cache effectiveness
/project:context:analyze-cache

# Example output:
# Cache Effectiveness Report:
# - Hit Rate: 87% (good, target: > 80%)
# - Staleness: 4 days (acceptable, target: < 7 days)
# - Size: 2,847 tokens (optimal, target: 2,000-5,000)
# - Coverage: 95% (excellent, target: > 90%)
#
# Recommendations:
# - Context is fresh and effective
# - Consider selective refresh in 3 days

# Tune cache parameters
/project:context:config cache-ttl=7d
/project:context:config cache-size-limit=5000
```

### Quality vs. Speed Tradeoffs

Balance quality and speed based on task type:

```bash
# Quick mode for simple, low-risk tasks
@implementation-guide SIMPLE-001 AUTO --quick-mode
# → Streamlined validation, faster execution
# → Use for: UI tweaks, config changes, simple fixes

# Thorough mode for complex, high-risk tasks
@implementation-guide COMPLEX-001 GUIDED --thorough-mode
# → Comprehensive validation, detailed analysis
# → Use for: architecture changes, security, data migrations

# Balanced mode (default)
@implementation-guide STANDARD-001 AUTO
# → Standard validation and quality gates
# → Use for: most feature development
```

---

## Custom Agent Development

### Creating Custom Specialized Agents

Build project-specific agents for unique workflows:

```bash
# Create custom agent structure
mkdir -p .claude/agents/custom
touch .claude/agents/custom/security-auditor.md

# Agent template structure:
# 1. Purpose and Scope
# 2. Input Requirements
# 3. Analysis Process (step-by-step)
# 4. Output Format (markdown schema)
# 5. Success Criteria
# 6. Integration with Existing Agents
```

**Example Custom Agent** (`.claude/agents/custom/security-auditor.md`):

```markdown
# Security Auditor Agent

## Purpose
Specialized security analysis for authentication and authorization tasks.

## When to Invoke
- Tasks involving auth/authz implementation
- Security-critical feature changes
- Compliance requirements (GDPR, SOC2, etc.)

## Input Requirements
- Task ID with existing analysis
- Security requirements (explicit or from project context)
- Compliance framework (if applicable)

## Analysis Process

### Step 1: Threat Modeling
1. Identify attack vectors specific to this task
2. Reference OWASP Top 10 and project threat model
3. Enumerate potential vulnerabilities

### Step 2: Control Analysis
1. Evaluate proposed controls against threats
2. Check alignment with existing security patterns
3. Validate compliance requirements

### Step 3: Risk Assessment
1. Classify risk level (HIGH/MEDIUM/LOW)
2. Identify mitigation strategies
3. Recommend security testing approach

## Output Format

### Security Analysis
**Risk Level**: [HIGH/MEDIUM/LOW]
**Primary Threats**: [List of identified threats]

### Threat Assessment
[For each major threat]
- **Threat**: Description
- **Likelihood**: [HIGH/MEDIUM/LOW]
- **Impact**: [HIGH/MEDIUM/LOW]
- **Mitigation**: Recommended controls

### Security Recommendations
[Prioritized list of security enhancements]

### Testing Requirements
[Specific security tests required]

## Success Criteria
- All HIGH risks have mitigation plans
- Compliance requirements validated
- Security testing approach defined
- Integration with CI/CD security gates
```

**Invoke Custom Agent**:

```bash
# Use custom security auditor
@security-auditor AUTH-005
# → Runs specialized security analysis
# → Outputs security-specific recommendations
```

### Extending Existing Agents

Add project-specific logic to standard agents:

```bash
# Create extension file
touch .claude/agents/extensions/task-analyzer-ext.md

# Extension structure:
# 1. Base Agent: task-analyzer
# 2. Additional Context: [project-specific]
# 3. Extended Analysis Steps
# 4. Custom Output Sections
```

**Example Extension** (`.claude/agents/extensions/task-analyzer-ext.md`):

```markdown
# Task Analyzer Extension - E-Commerce Specific

## Base Agent
task-analyzer

## Additional E-Commerce Context
- Payment gateway integration patterns
- Inventory management constraints
- Order processing workflows
- Customer data privacy requirements

## Extended Analysis Steps

After standard root cause analysis, perform:

### E-Commerce Impact Analysis
1. **Revenue Impact**: Potential effect on sales/conversions
2. **Customer Experience**: UX implications for buyers/sellers
3. **Inventory Accuracy**: Impact on stock management
4. **Payment Flow**: Effect on checkout/payment processing

### Compliance Check
1. **PCI DSS**: Payment data handling requirements
2. **GDPR**: Customer data privacy implications
3. **Tax Compliance**: Sales tax calculation accuracy

## Custom Output Section

### E-Commerce Analysis
**Revenue Impact**: [HIGH/MEDIUM/LOW/NONE]
**Customer Experience Impact**: [Description]
**Compliance Requirements**: [List]
**Integration Dependencies**: [Payment gateway, inventory, shipping, etc.]
```

### Agent Composition Patterns

Combine multiple agents for complex workflows:

```bash
# Sequential agent composition
@task-analyzer COMPLEX-TASK-001
@security-auditor COMPLEX-TASK-001  # Custom agent
@task-planner COMPLEX-TASK-001
# → Analysis → Security Review → Planning

# Parallel agent composition (independent analyses)
@task-analyzer FEATURE-001 &
@security-auditor FEATURE-001 &
@performance-auditor FEATURE-001 &  # Another custom agent
wait
@task-planner FEATURE-001
# → Multiple analyses in parallel → Unified planning

# Conditional agent composition
@task-analyzer TASK-001
# If COMPLEX and security-related:
@security-auditor TASK-001
# If COMPLEX and performance-critical:
@performance-auditor TASK-001
# Always:
@task-planner TASK-001
```

---

## Troubleshooting & Debugging

### Debugging Task Analysis Issues

When analysis quality is inconsistent:

```bash
# Verify context accuracy
cat .claude/tasks/TASK-ID/project-context.md
# → Check: tech stack correct? Patterns accurate? Recent?

# Force context refresh if stale
/project:context:refresh --force

# Re-run analysis with refreshed context
@task-analyzer TASK-ID --use-fresh-context

# Compare analysis quality
diff .claude/tasks/TASK-ID/analysis.md.backup .claude/tasks/TASK-ID/analysis.md
```

### Debugging Delta Update Issues

When delta updates don't preserve important information:

```bash
# Check update history
cat .claude/tasks/TASK-ID/update-history.md
# → Shows: all updates, what changed, when

# Verify backup exists
ls .claude/tasks/TASK-ID/*.backup
# → Should see: analysis.md.backup, plan.md.backup

# Compare current vs. backup
diff .claude/tasks/TASK-ID/plan.md.backup .claude/tasks/TASK-ID/plan.md
# → Verify: important sections preserved, only delta changed

# Rollback if needed
cp .claude/tasks/TASK-ID/plan.md.backup .claude/tasks/TASK-ID/plan.md
```

### Debugging Knowledge Extraction

When pattern extraction isn't finding patterns:

```bash
# Verify completed task has extractable content
cat .claude/tasks/COMPLETED-TASK/plan.md
# → Check: architectural decisions documented? Patterns described?

# Run extraction with verbose output
/project:knowledge:extract COMPLETED-TASK --verbose
# → Shows: what patterns found, why some skipped, where added

# Check knowledge base updated
cat .claude/knowledge/project-patterns.md
# → Verify: new patterns added with task reference

# Search for specific pattern
/project:knowledge:search "authentication pattern"
# → Returns: where pattern appears, which tasks used it
```

### Debugging Context Cache Issues

When cached context seems incorrect:

```bash
# Verify cache timestamp
ls -la .claude/project-context.md
# → Check: when was it last updated?

# Inspect cache content
cat .claude/project-context.md
# → Verify: frameworks correct? Dependencies current? Patterns accurate?

# Check cache usage
/project:context:stats
# → Shows: hit rate, staleness, size, coverage

# Force refresh if cache is stale
/project:context:refresh --force
# → Completely regenerates context cache

# Verify refresh fixed issue
@task-analyzer TEST-CONTEXT
cat .claude/tasks/TEST-CONTEXT/project-context.md
```

### Debugging Validation Failures

When validation hooks report errors:

```bash
# Check validation cache
cat .claude/tasks/TASK-ID/.validation-cache/plan-validation.json
# → Shows: validation results, errors, warnings

# Check debug artifacts
ls .claude/tasks/TASK-ID/.debug/
cat .claude/tasks/TASK-ID/.debug/plan-failure.json
# → Shows: what failed, why, how to fix

# Run validation manually
python .claude/hooks/validate_workflow_plan.py .claude/tasks/TASK-ID/plan.md
# → Direct validation output with details

# Fix issues and re-validate
# ... fix plan.md ...
python .claude/hooks/validate_workflow_plan.py .claude/tasks/TASK-ID/plan.md
# → Verify: validation now passes
```

### Performance Debugging

When workflow is slower than expected:

```bash
# Profile task execution
/project:task:profile SLOW-TASK-001
# → Shows: time per phase, bottlenecks, optimization suggestions

# Example output:
# Task Execution Profile (SLOW-TASK-001):
# - Context Discovery: 8.2 sec (expected: < 60 sec) ✓
# - Analysis: 127 sec (expected: < 120 sec) ⚠ SLOW
# - Planning: 89 sec (expected: < 90 sec) ✓
# - Total: 224 sec
#
# Bottleneck: Analysis phase taking 2x expected time
# Suggestions:
# - Check context cache (may be stale)
# - Verify project structure hasn't changed significantly
# - Consider splitting into multiple smaller tasks

# Check context cache effectiveness
/project:context:stats
# → Verify: high hit rate, fresh cache

# Optimize if needed
/project:context:refresh --optimize
```

### Common Issues & Solutions

| Issue | Symptom | Solution |
|-------|---------|----------|
| Stale context | Wrong tech stack detected | `/project:context:refresh --force` |
| Lost analysis | Delta update lost important info | Restore from `.backup` files |
| Slow initialization | Tasks take > 60 sec to init | Check context cache hit rate |
| Inconsistent quality | Analysis varies by task | Verify agents are latest version |
| Pattern not found | Knowledge search returns nothing | Extract patterns from completed tasks |
| Validation fails | Plan doesn't meet criteria | Check `.debug/` for specific errors |
| Missing briefing | Meeting command returns empty | Verify task has analysis + plan |

---

## Best Practices Summary

### Context Management

- ✅ Refresh context only when architecture/dependencies change
- ✅ Use selective refresh (`dependencies`, `architecture`, `patterns`)
- ✅ Monitor cache hit rate (target: > 80%)
- ✅ Snapshot context before major changes

### Knowledge Management

- ✅ Extract patterns from every completed task
- ✅ Generate quarterly knowledge summaries
- ✅ Reference accumulated patterns in new tasks
- ✅ Organize knowledge by type (architectural, risk, process)

### Task Workflow

- ✅ Use delta updates for evolving requirements
- ✅ Let complexity classification guide workflow choice
- ✅ Choose AUTO vs. GUIDED based on team needs
- ✅ Extract learnings immediately after completion

### Performance Optimization

- ✅ Leverage context caching for 90% faster init
- ✅ Use simple task workflow for quick changes
- ✅ Monitor token usage and optimize high consumers
- ✅ Enable parallel processing where beneficial

### Multi-Task Coordination

- ✅ Share context across related tasks
- ✅ Coordinate planning for dependent tasks
- ✅ Use appropriate briefings for different audiences
- ✅ Track dependencies explicitly

---

**Maintained by**: Claude Tasks Workflow Contributors
**Last Updated**: October 2025
**For Basic Usage**: See [README.md](README.md)
**For Migration**: See [MIGRATION.md](MIGRATION.md)
**For Version History**: See [CHANGELOG.md](CHANGELOG.md)
