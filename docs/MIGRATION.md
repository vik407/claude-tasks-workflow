# Migration Guide

Complete migration instructions for upgrading between versions of Claude Tasks Workflow.

## Table of Contents

- [Version 3.0 to 4.0 (Sonnet 4.5 Streamlined)](#version-30-to-40-sonnet-45-streamlined)
- [Version 2.1 to 3.0 (Claude 4 Optimized)](#version-21-to-30-claude-4-optimized)
- [Version 2.0 to 2.1 (Enhanced Context & Knowledge)](#version-20-to-21-enhanced-context--knowledge)
- [Version 1.0 to 2.0 (Intelligent Context Integration)](#version-10-to-20-intelligent-context-integration)

---

## Version 3.0 to 4.0 (Sonnet 4.5 Streamlined)

**Migration Complexity**: Low
**Estimated Time**: 15-30 minutes
**Backward Compatibility**: 100% (all v3.0 features continue to work)

### What's Changing

Version 4.0 streamlines the workflow for Claude Sonnet 4.5's native capabilities:

- **Output Format**: XML schemas → Clean markdown
- **Complexity**: 3-tier classification → Binary (SIMPLE/COMPLEX)
- **Agent Structure**: Individual guidelines → Shared guidelines
- **Parallelization**: Manual coordination → Native Sonnet 4.5 optimization

### Migration Steps

#### 1. Backup Your Current Setup

```bash
# Create timestamped backup
mkdir -p .claude-backups
cp -r .claude .claude-backups/v3.0-$(date +%Y%m%d-%H%M%S)
```

#### 2. Update Agent Files

Download new Sonnet 4.5 optimized agents:

```bash
# Update all 5 agents with streamlined versions
curl -o .claude/agents/task-analyzer.md [URL]
curl -o .claude/agents/task-planner.md [URL]
curl -o .claude/agents/implementation-guide.md [URL]
curl -o .claude/agents/task-updater.md [URL]
curl -o .claude/agents/meeting-facilitator.md [URL]
```

#### 3. Add Shared Guidelines

Create the new shared guidelines structure:

```bash
# Create shared folder
mkdir -p .claude/shared

# Add shared agent guidelines
curl -o .claude/shared/agent-guidelines.md [URL]
```

#### 4. Verify Existing Tasks

Your existing task documentation remains fully compatible:

```bash
# Check that existing tasks are accessible
ls .claude/tasks/active/
ls .claude/tasks/archive/

# Verify task documentation format
cat .claude/tasks/active/ABC-123/analysis.md
```

#### 5. Test New Workflow

Run a test task to verify the migration:

```bash
# Initialize test task with new workflow
/project:task:init TEST-4.0-MIGRATION

# Verify context reuse still works
cat .claude/tasks/TEST-4.0-MIGRATION/project-context.md
```

### Breaking Changes

**None.** Version 4.0 is fully backward compatible.

### Output Format Changes

If you have custom scripts that parse agent outputs:

**Before (v3.0 - XML)**:

```xml
<analysis>
  <complexity level="MEDIUM">
    <reasoning>Requires multi-component changes</reasoning>
  </complexity>
</analysis>
```

**After (v4.0 - Markdown)**:

```markdown
### Complexity Classification
**Level**: COMPLEX
**Reasoning**: Requires multi-component changes (1+ days)
```

**Migration**: Update your parsing scripts to handle markdown format, or continue using v3.0 agents for projects that require XML output.

### Complexity Classification Changes

The 3-tier system is simplified to binary:

**Before (v3.0)**:

- SIMPLE (< 4 hours)
- MEDIUM (4 hours - 1 day)
- COMPLEX (1+ days)

**After (v4.0)**:

- SIMPLE (< 1 day)
- COMPLEX (1+ days)

**Impact**: Tasks previously classified as MEDIUM will now be SIMPLE or COMPLEX. Review your workflows if you have automation based on MEDIUM complexity.

### Rollback Instructions

If you need to rollback to v3.0:

```bash
# Restore from backup
cp -r .claude-backups/v3.0-YYYYMMDD-HHMMSS/.claude ./

# Verify rollback
ls .claude/agents/
cat .claude/agents/task-analyzer.md | head -20
```

---

## Version 2.1 to 3.0 (Claude 4 Optimized)

**Migration Complexity**: Medium
**Estimated Time**: 45-60 minutes
**Backward Compatibility**: 100% (v2.1 features continue to work)

### What's Changing

Version 3.0 adds Claude 4 optimization with explicit instructions and structured outputs:

- **Instruction Style**: Implicit patterns → Explicit step-by-step processes
- **Output Format**: Markdown → Structured XML schemas
- **Thinking**: Basic analysis → Transparent `<thinking>` blocks
- **Processing**: Sequential → Parallel tool coordination
- **Validation**: Manual checks → Automated quality gates

### Migration Steps

#### 1. Backup Existing Work

```bash
# Create backup with timestamp
mkdir -p .claude-backups
tar -czf .claude-backups/v2.1-$(date +%Y%m%d).tar.gz .claude/

# Verify backup
tar -tzf .claude-backups/v2.1-$(date +%Y%m%d).tar.gz | head
```

#### 2. Update Repository Structure

Add new folders for validation hooks:

```bash
# Create hooks directory
mkdir -p .claude/hooks

# Create validation cache directories in existing tasks
find .claude/tasks/active -type d -maxdepth 1 -mindepth 1 -exec mkdir -p {}/.validation-cache \;
```

#### 3. Install Validation Hooks

```bash
# Download validation hook
curl -o .claude/hooks/validate_workflow_plan.py [URL]

# Make executable
chmod +x .claude/hooks/validate_workflow_plan.py

# Test hook
python .claude/hooks/validate_workflow_plan.py --help
```

#### 4. Update Sub-Agents

Replace all agent files with Claude 4 optimized versions:

```bash
# Backup current agents
cp -r .claude/agents .claude/agents.v2.1-backup

# Download Claude 4 optimized agents
curl -o .claude/agents/task-analyzer.md [URL]
curl -o .claude/agents/task-planner.md [URL]
curl -o .claude/agents/implementation-guide.md [URL]
curl -o .claude/agents/task-updater.md [URL]
curl -o .claude/agents/meeting-facilitator.md [URL]
```

#### 5. Add NPM Scripts for Validation

Update your `package.json` (or create one):

```json
{
  "scripts": {
    "validate:claude4": "node scripts/validate-claude4.js",
    "validate:enhanced": "npm run validate && npm run validate:claude4",
    "build:claude4": "npm run validate:enhanced && npm run build",
    "benchmark:claude4": "node scripts/benchmark-claude4.js"
  }
}
```

#### 6. Update Commands

Update command files to use new XML schemas:

```bash
# Backup current commands
cp -r .claude/commands .claude/commands.v2.1-backup

# Download updated commands
curl -o .claude/commands/project/task/init.md [URL]
curl -o .claude/commands/project/task/plan.md [URL]
# ... (update other commands as needed)
```

#### 7. Test Migration

Run a complete workflow test:

```bash
# Create test task
/project:task:init TEST-3.0-MIGRATION

# Verify XML output format
@task-analyzer TEST-3.0-MIGRATION
cat .claude/tasks/TEST-3.0-MIGRATION/analysis.md

# Check validation cache
ls .claude/tasks/TEST-3.0-MIGRATION/.validation-cache/

# Test validation hook
python .claude/hooks/validate_workflow_plan.py .claude/tasks/TEST-3.0-MIGRATION/plan.md
```

### New Features Available

After migration, you can use:

```bash
# Automated validation on plan generation
/project:task:plan ABC-123
# → Automatically runs validation hook, caches results

# Claude 4 compliance validation
npm run validate:claude4

# Performance benchmarking
npm run benchmark:claude4
```

### Breaking Changes

**None for workflow usage.** Output format changes from markdown to XML, but this doesn't affect task execution.

If you have custom parsers:

- Update to parse XML output instead of plain markdown
- Reference the schemas in `.claude/agents/` for structure

### Rollback Instructions

```bash
# Restore from backup
tar -xzf .claude-backups/v2.1-YYYYMMDD.tar.gz

# Verify rollback
ls .claude/agents/
cat .claude/agents/task-analyzer.md | head -20
```

---

## Version 2.0 to 2.1 (Enhanced Context & Knowledge)

**Migration Complexity**: Low
**Estimated Time**: 30-45 minutes
**Backward Compatibility**: 100%

### What's Changing

Version 2.1 adds context caching, knowledge management, and delta updates:

- **Context**: Re-analyzed every task → Cached and reused
- **Updates**: Full re-run required → Delta updates preserve work
- **Knowledge**: No accumulation → Extracted patterns and decisions
- **Simple Tasks**: Full workflow → Streamlined detection and workflow

### Migration Steps

#### 1. Backup Current Setup

```bash
mkdir -p .claude-backups/v2.0
cp -r .claude .claude-backups/v2.0/
```

#### 2. Create New Folder Structure

```bash
# Create knowledge directory
mkdir -p .claude/knowledge

# Create context commands directory
mkdir -p .claude/commands/project/context

# Create knowledge commands directory
mkdir -p .claude/commands/project/knowledge

# Create task organization
mkdir -p .claude/tasks/{active,archive}
```

#### 3. Add New Sub-Agent

```bash
# Download task-updater agent
curl -o .claude/agents/task-updater.md [URL]
```

#### 4. Update Existing Sub-Agents

Add complexity classification and context caching logic:

```bash
# Update task-analyzer with complexity classification
curl -o .claude/agents/task-analyzer.md [URL]

# Update context analyzer with caching
curl -o .claude/context/project-analyzer.md [URL]
```

#### 5. Add New Commands

```bash
# Context management commands
curl -o .claude/commands/project/context/refresh.md [URL]

# Knowledge management commands
curl -o .claude/commands/project/knowledge/extract.md [URL]

# Simple task workflow
curl -o .claude/commands/project/task/simple.md [URL]

# Task update command
curl -o .claude/commands/project/task/update.md [URL]
```

#### 6. Organize Existing Tasks

Move existing tasks into the new structure:

```bash
# Move active tasks
mv .claude/tasks/* .claude/tasks/active/ 2>/dev/null || true

# Keep archive empty for now (will be populated as tasks complete)
```

#### 7. Initialize Context Cache

Generate project context for existing projects:

```bash
# Run context discovery (do this once)
/project:task:init CONTEXT-INIT-2.1

# Verify cached context
cat .claude/project-context.md
```

#### 8. Extract Historical Knowledge

If you have completed tasks, extract patterns:

```bash
# Extract patterns from previous work
/project:knowledge:extract historical-patterns

# Verify knowledge base
cat .claude/knowledge/project-patterns.md
```

### New Features Available

After migration, you can use:

```bash
# Delta updates
@task-updater ABC-123 "new requirement: add mobile support"

# Context refresh (selective)
/project:context:refresh dependencies

# Simple task workflow
/project:task:simple ABC-456 "change button color to blue"

# Knowledge extraction
/project:knowledge:extract completed-tasks
```

### Performance Benefits

After migration, you'll see:

- **90% faster** task initialization (context reuse)
- **75% faster** simple task workflows
- **60-80% token reduction** on task updates

### Rollback Instructions

```bash
# Restore from backup
rm -rf .claude
cp -r .claude-backups/v2.0/.claude ./

# Verify rollback
ls .claude/
```

---

## Version 1.0 to 2.0 (Intelligent Context Integration)

**Migration Complexity**: Medium
**Estimated Time**: 60-90 minutes
**Backward Compatibility**: 95% (manual context setup replaced by automatic)

### What's Changing

Version 2.0 introduces automatic context discovery and specialized agents:

- **Context Setup**: Manual → Automatic project analysis
- **Agents**: Generic templates → 5 specialized sub-agents
- **Commands**: Basic lifecycle → Context-aware enhanced commands
- **Structure**: Flat → Organized `.claude/` hierarchy

### Migration Steps

#### 1. Backup Everything

```bash
mkdir -p .claude-backups/v1.0-full
cp -r .claude .claude-backups/v1.0-full/
```

#### 2. Create New Directory Structure

```bash
# Create agent directory
mkdir -p .claude/agents

# Create enhanced commands directory
mkdir -p .claude/commands/project/{task,meeting,workflow,jira,ci,docs}

# Create context directory
mkdir -p .claude/context

# Create tasks directory
mkdir -p .claude/tasks
```

#### 3. Migrate Agent Templates

Replace generic templates with specialized agents:

```bash
# Download all 5 specialized agents
curl -o .claude/agents/task-analyzer.md [URL]
curl -o .claude/agents/task-planner.md [URL]
curl -o .claude/agents/implementation-guide.md [URL]
curl -o .claude/agents/meeting-facilitator.md [URL]

# Backup old templates
mkdir -p .claude-backups/v1.0-templates
mv .claude/*.md .claude-backups/v1.0-templates/ 2>/dev/null || true
```

#### 4. Add Context Analyzer

```bash
# Download project analyzer
curl -o .claude/context/project-analyzer.md [URL]
```

#### 5. Migrate Commands

```bash
# Download enhanced commands
curl -o .claude/commands/project/task/init.md [URL]
curl -o .claude/commands/project/task/plan.md [URL]
curl -o .claude/commands/project/task/status.md [URL]

# Backup old commands
mkdir -p .claude-backups/v1.0-commands
mv .claude/commands/* .claude-backups/v1.0-commands/ 2>/dev/null || true
```

#### 6. Migrate Existing Tasks

Update task structure to include project context:

```bash
# For each existing task
for task in .claude-backups/v1.0-full/.claude/tasks/*; do
  task_id=$(basename $task)

  # Copy task to new structure
  cp -r $task .claude/tasks/$task_id

  # Generate project context for task
  echo "Regenerate context for: $task_id"
done
```

#### 7. Initialize Automatic Context

```bash
# Run context discovery for your project
/project:task:init MIGRATION-TEST

# Verify context generation
cat .claude/tasks/MIGRATION-TEST/project-context.md
```

#### 8. Test New Workflow

```bash
# Test complete workflow
/project:task:init TEST-2.0
@task-analyzer TEST-2.0
@task-planner TEST-2.0
@implementation-guide TEST-2.0 GUIDED
```

### Manual Updates Required

#### Update Custom Commands

If you have custom commands, add context awareness:

**Before (v1.0)**:

```markdown
# Execute task analysis
# ... instructions ...
```

**After (v2.0)**:

```markdown
# Load project context
{{read .claude/tasks/TASK_ID/project-context.md}}

# Execute context-aware task analysis
# ... instructions ...
```

#### Update Workflows

Replace manual context setup with automatic:

**Before (v1.0)**:

```bash
# Manual context setup
echo "Project uses React, Node.js, PostgreSQL" > context.txt

# Run analysis
@analyze TASK-123 context.txt
```

**After (v2.0)**:

```bash
# Automatic context discovery
/project:task:init TASK-123

# Context-aware analysis
@task-analyzer TASK-123
```

### Breaking Changes

1. **Command Syntax**: `/task:init` → `/project:task:init` (namespace added)
2. **Agent Invocation**: Generic agents → Specialized agents
3. **Context Files**: Manual → Auto-generated `project-context.md`

### Migration Script

For bulk migration, use this script:

```bash
#!/bin/bash
# migrate-v1-to-v2.sh

echo "Migrating from v1.0 to v2.0..."

# Backup
mkdir -p .claude-backups/v1.0-$(date +%Y%m%d)
cp -r .claude .claude-backups/v1.0-$(date +%Y%m%d)/

# Create structure
mkdir -p .claude/{agents,commands/project,context,tasks}

# Download v2.0 files
echo "Downloading v2.0 files..."
# ... (curl commands from steps above)

# Migrate tasks
echo "Migrating existing tasks..."
for task in .claude-backups/v1.0-*/.claude/tasks/*; do
  cp -r $task .claude/tasks/
done

echo "Migration complete. Run /project:task:init TEST-MIGRATION to verify."
```

### Rollback Instructions

```bash
# Full rollback
rm -rf .claude
cp -r .claude-backups/v1.0-full/.claude ./

# Verify rollback
ls .claude/
cat .claude/README.md
```

---

## General Migration Tips

### Before Any Migration

1. **Backup everything**: Always create timestamped backups
2. **Test in isolation**: Create a test task to verify migration
3. **Document custom changes**: Note any project-specific customizations
4. **Review changelog**: Understand what's changing in the new version

### During Migration

1. **Follow steps sequentially**: Don't skip steps
2. **Verify each step**: Check that files are in the right place
3. **Test incrementally**: Verify features as you add them
4. **Keep backups accessible**: Don't delete until migration is confirmed

### After Migration

1. **Run full workflow test**: End-to-end task lifecycle
2. **Verify context caching**: Check that context reuse works
3. **Test all agents**: Invoke each specialized agent
4. **Update team documentation**: Share migration notes with team
5. **Monitor performance**: Track improvements from changelog

### Troubleshooting Migrations

#### Context Not Loading

```bash
# Verify context file exists
ls .claude/project-context.md

# Regenerate if missing
/project:context:refresh --force
```

#### Agent Invocation Fails

```bash
# Check agent file exists and is valid
cat .claude/agents/task-analyzer.md

# Verify command syntax
/project:task:init --help
```

#### Validation Errors

```bash
# Check validation hook is executable
ls -l .claude/hooks/validate_workflow_plan.py

# Run validation manually
python .claude/hooks/validate_workflow_plan.py path/to/plan.md
```

### Getting Help

If you encounter issues during migration:

1. **Check existing tasks**: Review `.claude-backups/` for reference
2. **Consult changelog**: Verify you're following the correct version path
3. **Create GitHub issue**: Report migration problems with details
4. **Rollback if needed**: Use backup to restore previous version

---

**Maintained by**: Claude Tasks Workflow Contributors
**Last Updated**: October 2025
