Generate technical standup briefing for task: $ARGUMENTS

STANDUP BRIEFING PURPOSE:
Create a comprehensive technical summary that enables a developer to effectively present task status during standups, sprint reviews, or technical discussions. This document serves as a "presentation guide" with all technical context consolidated.

BRIEFING STRUCTURE:

1. **Executive Summary** - 30-second overview for time-constrained standups
2. **Technical Deep Dive** - Detailed analysis for extended discussions
3. **Code Walkthrough Guide** - Specific files and lines to show on screen
4. **Architecture Context** - How this fits into overall system design
5. **Decision Rationale** - Why specific solutions were chosen
6. **Implementation Roadmap** - Clear path forward with technical steps

CONTENT AGGREGATION:

- Synthesize analysis.md findings into presenter-friendly format
- Extract key decisions from plan.md with rationale
- Include implementation progress from validation.md or dev-implementation.md
- Highlight architectural patterns and tool-agnostic principles applied
- Map file changes to system components for audience understanding

PRESENTATION SECTIONS:

- **Problem Overview** (2 minutes) - What we're solving and why
- **Technical Investigation** (3 minutes) - Root cause and system impact
- **Solution Architecture** (5 minutes) - How we're solving it
- **Implementation Plan** (3 minutes) - Specific steps and timeline
- **Code Review** (5-10 minutes) - Actual files and changes with screen sharing
- **Q&A Preparation** - Anticipated questions with technical answers

DELIVERABLE:

- .claude/tasks/[TASK-ID]/standup-briefing.md - Complete presentation guide
- Technical talking points organized by time allocation
- File references with line numbers for screen sharing
- Architecture diagrams or pseudo-code where helpful
- Risk mitigation explanations ready for stakeholder questions

Create a developer-friendly presentation guide that transforms technical documentation into effective meeting communication.
