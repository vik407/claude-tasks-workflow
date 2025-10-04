# Claude Tasks Workflow

Transform Claude from a helpful assistant into a structured development workflow system.

## Why Use This Workflow?

### Without This Workflow

When using Claude directly for development tasks:

- No memory of your project's tech stack or patterns
- Start from scratch explaining context every time
- Inconsistent analysis depth and quality
- Manual tracking of task evolution and decisions
- Difficulty maintaining continuity across sessions

### With This Workflow

- **Persistent Project Context**: Your tech stack, patterns, and conventions cached and reused
- **Structured Task Lifecycle**: Clear phases from analysis through implementation
- **5 Specialized AI Agents**: Each optimized for specific workflow stages
- **Automatic Complexity Detection**: Simple tasks get streamlined, complex tasks get thorough planning
- **Delta Updates**: Change requirements without losing existing work
- **Knowledge Accumulation**: Build a repository of decisions and patterns over time

**Bottom line**: Get consistent, high-quality development assistance that learns your project and gets better over time.

## What This Workflow Provides

### For Developers

**Before**: "Claude, analyze this authentication bug"

- Gets generic debugging suggestions
- Doesn't know your auth library or patterns
- Can't reference previous similar fixes
- Analysis quality varies each time

**After**: `@task-analyzer AUTH-123`

- Analyzes using your project's specific auth patterns
- References similar bugs you've fixed before
- Classifies complexity automatically (quick fix vs. major refactor)
- Generates consistent, structured analysis every time

### For Teams

**Before**: Task changes mid-development

- Re-explain everything from scratch
- Lose previous analysis and decisions
- Waste tokens and time
- Risk inconsistent implementation

**After**: `@task-updater ABC-456 "add OAuth support per meeting"`

- Preserves existing analysis and architecture
- Updates only what changed
- Maintains decision history
- 60-80% faster than starting over

### For Projects

**Before**: Each task is independent

- No accumulated project wisdom
- Repeat same patterns manually
- Onboarding is slow and manual
- Inconsistent code quality

**After**: Continuous knowledge growth

- Patterns extracted from completed tasks
- Reusable architectural decisions
- New team members reference accumulated knowledge
- Consistent implementation across team

## Quick Start

### Installation

1. Copy the `.claude/` folder to your project root:

    ```bash
    git clone https://github.com/yourusername/claude-tasks-workflow
    cp -r claude-tasks-workflow/.claude /your/project/
    ```

2. Initialize your first task:

```bash
/project:task:init TICKET-123
```

This discovers your project's tech stack and creates cached context for future tasks.

### Basic Workflow Example

```bash
# 1. Initialize task (discovers/reuses project context)
/project:task:init ABC-1234

# 2. Analyze the problem (gets structured analysis)
@task-analyzer ABC-1234

# 3. Create implementation plan (aligned with your architecture)
@task-planner ABC-1234

# 4. Implement (choose guided or autonomous)
@implementation-guide ABC-1234 GUIDED

# 5. Extract learnings for future tasks
/project:knowledge:extract ABC-1234
```

### Common Commands Reference

```bash
# Task Lifecycle
/project:task:init TASK-ID              # Initialize new task
@task-analyzer TASK-ID                  # Analyze problem
@task-planner TASK-ID                   # Create plan
@implementation-guide TASK-ID MODE      # Implement (AUTO or GUIDED)

# Quick Tasks
/project:task:simple TASK-ID "description"  # Streamlined workflow for simple changes

# Task Updates
@task-updater TASK-ID "what changed"    # Update existing task without starting over

# Context Management
/project:context:refresh dependencies   # Refresh only dependency info
/project:context:refresh tech-stack    # Refresh only tech stack detection

# Knowledge Management
/project:knowledge:extract TASK-ID     # Extract patterns from completed task
/project:knowledge:summary Q3-2025     # Generate quarterly summary

# Meeting Briefings
/project:meeting:brief standup TASK-ID          # Daily standup prep
/project:meeting:brief tech-review TASK-ID      # Architecture review
/project:meeting:brief code-walkthrough TASK-ID # Code review session
```

## Core Features

### 5 Specialized Agents

Each agent is optimized for a specific workflow stage:

1. **task-analyzer**: Investigates root causes, gathers evidence from your codebase, classifies complexity (simple vs. complex), provides structured recommendations.

2. **task-planner**: Creates implementation plans aligned with your project's architecture, references existing patterns, includes validation gates and risk mitigation.

3. **implementation-guide**: Provides autonomous (AUTO) or step-by-step (GUIDED) implementation, continuously validates changes, adapts to your coding standards.

4. **task-updater**: Incrementally updates tasks when requirements change, preserves existing analysis and decisions, updates only affected sections.

5. **meeting-facilitator**: Generates audience-appropriate briefings (standup, tech review, code walkthrough), translates technical details for different stakeholders.

### Context Caching & Reuse

First task in a project:

- Discovers tech stack (frameworks, build tools, architecture)
- Analyzes patterns and conventions
- Caches everything in `.claude/project-context.md`
- Takes 5-10 minutes

Every subsequent task:

- Reuses cached context
- Starts immediately
- 90% faster initialization
- Selective refresh when needed

### Binary Complexity Classification

Every task is automatically classified:

**SIMPLE** (< 1 day): Single file changes, styling updates, configuration tweaks, straightforward components

- Uses streamlined workflow
- 75% faster than full analysis
- Still maintains quality

**COMPLEX** (1+ days): Multi-component features, API integrations, architecture changes, system integrations

- Full analysis and planning
- Risk assessment and mitigation
- Thorough validation gates

### Delta Updates

When requirements change mid-task:

**Traditional approach**: Start over, re-explain everything, waste tokens and time

**Delta update approach**:

```bash
@task-updater ABC-456 "meeting outcome: add rate limiting (100 req/min)"
```

- Preserves root cause analysis
- Updates implementation plan
- Maintains decision history
- 60-80% token reduction

### Meeting Briefings

Generate stakeholder-appropriate summaries:

```bash
# For daily standup (2-3 minutes)
/project:meeting:brief standup ABC-123

# For technical review (architecture focus)
/project:meeting:brief tech-review ABC-123

# For code walkthrough (implementation details)
/project:meeting:brief code-walkthrough ABC-123

# Generate all briefing types
/project:meeting:brief all ABC-123
```

## Example Workflows

### Simple Task Workflow

When you need to make a quick, straightforward change:

```bash
# Single command for simple tasks
/project:task:simple ABC-101 "change submit button text from 'Send' to 'Submit'"

# Or use the standard workflow if you want full documentation
/project:task:init ABC-101
@task-analyzer ABC-101  # Will detect as SIMPLE
@implementation-guide ABC-101 AUTO
```

**Result**: 5-minute workflow instead of 15-20 minutes, still maintains quality.

### Complex Task Workflow

When you need thorough analysis and planning:

```bash
# 1. Initialize with context discovery/reuse
/project:task:init ABC-201

# 2. Deep analysis (will detect as COMPLEX)
@task-analyzer ABC-201 "implement OAuth2 microservices authentication"

# 3. Comprehensive planning
@task-planner ABC-201
# → Creates plan aligned with your architecture
# → References existing auth patterns from knowledge base
# → Includes risk mitigation and validation gates

# 4. Guided implementation (team learning opportunity)
@implementation-guide ABC-201 GUIDED
# → Step-by-step guidance
# → Validation checkpoints
# → Learning-focused explanations

# 5. Extract patterns for future use
/project:knowledge:extract ABC-201
```

### Task Evolution (Delta Updates)

When requirements change during development:

```bash
# Initial task
/project:task:init ABC-301 "implement user login"
@task-analyzer ABC-301
@task-planner ABC-301

# Meeting reveals additional requirements
@task-updater ABC-301 "meeting outcome: also need OAuth2 and 2FA support"
# → Updates plan.md without losing existing analysis
# → Extends implementation without starting over
# → Maintains decision continuity

# Technical discovery during implementation
@task-updater ABC-301 "found existing auth library that reduces scope"
# → Adjusts implementation approach
# → Preserves architectural context
# → Updates timeline and risk assessment
```

## Repository Structure

```text
📦 claude-tasks-workflow/
│
├── 📄 README.md                 # This file - quick start guide
│
├── 📁 docs/                     # 📚 Detailed documentation
│   ├── CHANGELOG.md             # Version history and performance metrics
│   ├── MIGRATION.md             # Upgrade guides from previous versions
│   ├── ADVANCED.md              # Advanced patterns and multi-task coordination
│   ├── SONNET_4.5_MIGRATION.md  # Sonnet 4.5 optimization details
│   ├── PHASE_3_SUMMARY.md       # Command consolidation report
│   ├── IMPLEMENTATION_COMPLETE.md # Deployment guide
│   └── BUILD_VALIDATION_FIX.md  # Build validation migration notes
│
├── 📁 src/claude/               # 🔧 Source templates (edit these)
│   ├── agents/                  # 5 specialized AI assistants
│   │   ├── task-analyzer.md         # Root cause analysis specialist
│   │   ├── task-planner.md          # Architecture planning expert
│   │   ├── implementation-guide.md  # Adaptive implementation specialist
│   │   ├── task-updater.md          # Delta update specialist
│   │   └── meeting-facilitator.md   # Communication expert
│   │
│   ├── commands/                # Enhanced workflow commands
│   │   └── project/
│   │       ├── task/            # Task lifecycle (init, plan, update, simple, etc.)
│   │       ├── meeting/         # Meeting facilitation (brief with types)
│   │       ├── context/         # Context management (refresh)
│   │       ├── knowledge/       # Knowledge extraction
│   │       ├── workflow/        # Workflow coordination
│   │       └── ci/              # CI/CD integration
│   │
│   ├── shared/                  # Shared guidelines and patterns
│   │   └── agent-guidelines.md  # Common principles for all agents
│   │
│   ├── hooks/                   # Validation hooks
│   ├── context/                 # Project analysis patterns
│   ├── knowledge/               # Knowledge templates
│   └── scripts/                 # Utility scripts
│
├── 📁 build/                    # 🏗️ Build output (auto-generated)
│   ├── .claude/                 # Compiled workflow files
│   └── dist/                    # Distribution packages
│
└── 📁 .claude/                  # 💼 Active workspace (deployed from build)
    ├── agents/                  # Deployed AI assistants
    ├── commands/                # Deployed commands
    ├── tasks/                   # Your task documentation
    │   ├── active/              # Current tasks
    │   └── archive/             # Completed tasks (organized by date)
    └── knowledge/               # Accumulated project wisdom
```

### Key Directories

**docs/**: All detailed documentation, migration guides, and technical references

**src/claude/**: Source templates - edit these files to customize the workflow

**.claude/**: Deployed workflow - generated from src/claude/ via build process

**build/**: Intermediate build artifacts and distribution packages

## Documentation

All detailed documentation is organized in the [`docs/`](docs/) folder:

### Getting Started Guides

- **[MIGRATION.md](docs/MIGRATION.md)** - Upgrade guides from previous versions
- **[SONNET_4.5_MIGRATION.md](docs/SONNET_4.5_MIGRATION.md)** - Sonnet 4.5 specific optimizations

### Technical References

- **[CHANGELOG.md](docs/CHANGELOG.md)** - Version history and performance metrics
- **[ADVANCED.md](docs/ADVANCED.md)** - Advanced patterns and multi-task coordination
- **[BUILD_VALIDATION_FIX.md](docs/BUILD_VALIDATION_FIX.md)** - Build validation migration details

### Implementation Details

- **[PHASE_3_SUMMARY.md](docs/PHASE_3_SUMMARY.md)** - Command consolidation report
- **[IMPLEMENTATION_COMPLETE.md](docs/IMPLEMENTATION_COMPLETE.md)** - Complete deployment guide

## Contributing

We welcome contributions that improve the workflow system:

### Template Improvements

- Enhance agent prompts for better clarity
- Add validation checklists
- Improve output structure

### New Features

- Follow established agent patterns
- Include comprehensive documentation
- Test with actual Claude interactions
- Provide migration guides

### Performance Enhancements

- Optimize context caching strategies
- Improve complexity classification
- Reduce token usage through intelligent reuse

Submit issues and pull requests on GitHub.

## Support

For questions, issues, or contributions:

- **Issues**: Create GitHub issues for bugs or feature requests
- **Pull Requests**: Submit improvements to templates and workflows
- **Discussions**: Share workflow examples and best practices
- **Knowledge Sharing**: Contribute patterns to the knowledge base

## License

Apache 2 License - See LICENSE file for details

---

**Version**: 4.0 (Sonnet 4.5 Streamlined)
**Last Updated**: October 2025
**Compatibility**: Claude Sonnet 4.5, Claude Code Sub-Agents
