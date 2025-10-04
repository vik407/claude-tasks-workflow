# Claude Tasks Workflow - Documentation

This folder contains all detailed documentation for the Claude Tasks Workflow system.

## Quick Navigation

### 📚 Getting Started

If you're new to the workflow or upgrading from a previous version:

- **[MIGRATION.md](MIGRATION.md)** - Step-by-step upgrade guides from v1.0 → v4.0
- **[SONNET_4.5_MIGRATION.md](SONNET_4.5_MIGRATION.md)** - Sonnet 4.5 optimization details and improvements

### 📖 Technical References

For understanding the system architecture and history:

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history with performance metrics
- **[ADVANCED.md](ADVANCED.md)** - Advanced patterns, multi-task coordination, and performance tuning
- **[BUILD_VALIDATION_FIX.md](BUILD_VALIDATION_FIX.md)** - Build validation migration from XML to markdown

### 🔧 Implementation Details

For contributors and those customizing the workflow:

- **[PHASE_3_SUMMARY.md](PHASE_3_SUMMARY.md)** - Command consolidation implementation report
- **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Complete deployment and rollback procedures
- **[DOCUMENTATION_REORGANIZATION.md](DOCUMENTATION_REORGANIZATION.md)** - Documentation restructure details

## Documentation Structure

```text
docs/
├── README.md                           # This file - documentation index
│
├── 📚 Getting Started
│   ├── MIGRATION.md                    # Upgrade guides (v1.0 → v4.0)
│   └── SONNET_4.5_MIGRATION.md         # Sonnet 4.5 optimizations
│
├── 📖 Technical References
│   ├── CHANGELOG.md                    # Version history
│   ├── ADVANCED.md                     # Advanced patterns
│   └── BUILD_VALIDATION_FIX.md         # Build system migration
│
└── 🔧 Implementation Details
    ├── PHASE_3_SUMMARY.md              # Command consolidation
    ├── IMPLEMENTATION_COMPLETE.md      # Deployment guide
    └── DOCUMENTATION_REORGANIZATION.md # Docs restructure
```

## Recommended Reading Order

### For New Users

1. Start with [main README.md](../README.md) for quick start
2. Review [SONNET_4.5_MIGRATION.md](SONNET_4.5_MIGRATION.md) to understand current optimizations
3. Explore [ADVANCED.md](ADVANCED.md) when ready for complex scenarios

### For Users Upgrading

1. Check [CHANGELOG.md](CHANGELOG.md) to see what's changed
2. Follow [MIGRATION.md](MIGRATION.md) for your specific version upgrade path
3. Review [SONNET_4.5_MIGRATION.md](SONNET_4.5_MIGRATION.md) for new features

### For Contributors

1. Review [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md) for architecture
2. Study [PHASE_3_SUMMARY.md](PHASE_3_SUMMARY.md) for recent improvements
3. Check [BUILD_VALIDATION_FIX.md](BUILD_VALIDATION_FIX.md) for validation standards

## Quick Links

- [Main README](../README.md) - Project overview and quick start
- [Source Files](../src/claude/) - Agent and command templates
- [GitHub Issues](https://github.com/your-org/claude-tasks-workflow/issues) - Bug reports and feature requests

## Version Information

- **Current Version**: 4.0.0
- **Last Updated**: October 2025
- **Compatibility**: Claude Sonnet 4.5, Claude Code Sub-Agents

---

_For the latest updates, see [CHANGELOG.md](CHANGELOG.md)_
