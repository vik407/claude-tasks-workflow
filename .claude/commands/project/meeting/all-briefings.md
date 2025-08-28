Generate complete meeting briefing package for task: $ARGUMENTS

Format: "UGP-8177" or "UGP-8177 type=comprehensive" or "UGP-8177 meeting=standup"

COMPREHENSIVE BRIEFING PACKAGE:
Generate all meeting documentation types in a single command for complete task communication readiness.

MEETING TYPES GENERATED:

1. **Standup Brief** - Quick status for daily standups (2-5 minutes)
2. **Technical Review** - Deep dive for architecture discussions (30+ minutes)  
3. **Code Walkthrough** - Implementation details for development meetings (15-20 minutes)
4. **Executive Summary** - High-level overview for stakeholder updates (5 minutes)

DOCUMENT AGGREGATION:
Synthesize content from all available task documentation:

- analysis.md → Problem context and technical findings
- plan.md → Solution architecture and implementation strategy
- implementation files → Technical progress and code changes
- validation.md → Quality metrics and testing results
- status change docs → Current state and rationale

BRIEFING PACKAGE CONTENTS:

- **Master Summary** - Single-page overview of entire task lifecycle
- **Technical Talking Points** - Key messages organized by audience level
- **File Reference Guide** - Quick lookup for screen sharing sequences
- **Q&A Preparation** - Anticipated questions with technical answers
- **Time-Boxed Presentations** - 5min, 15min, and 30min versions

PRESENTATION READINESS CHECKLIST:

- [ ] All technical context consolidated and presenter-friendly
- [ ] Code changes mapped to business impact
- [ ] Screen sharing sequence prepared with file paths
- [ ] Architecture decisions explained with rationale
- [ ] Implementation progress clearly communicated
- [ ] Next steps and timeline defined
- [ ] Risk factors and mitigation strategies documented

DELIVERABLES:

- .claude/tasks/[TASK-ID]/meeting-briefings/
  ├── master-summary.md (single-page comprehensive overview)
  ├── standup-brief.md (daily standup version)
  ├── tech-review-brief.md (detailed technical presentation)
  ├── code-walkthrough-guide.md (implementation focus)
  └── executive-summary.md (stakeholder version)

USAGE SCENARIOS:

- **Daily Standup**: Use standup-brief.md for quick status update
- **Sprint Review**: Use tech-review-brief.md for comprehensive overview
- **Code Review**: Use code-walkthrough-guide.md for implementation details
- **Stakeholder Update**: Use executive-summary.md for business context
- **Architecture Review**: Use master-summary.md for complete context

Create complete meeting communication package enabling effective technical presentation at any level of detail.
