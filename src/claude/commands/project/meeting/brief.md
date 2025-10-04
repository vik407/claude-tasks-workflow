Generate meeting briefing for task: $ARGUMENTS

## Instructions

Create presentation materials for the specified meeting type.

**Meeting Types**:

- `standup`: 2-5 minute daily standup brief
- `tech-review`: 30+ minute technical deep dive
- `code-walkthrough`: 15-20 minute implementation demo
- `all`: Complete briefing package with all formats

## Execution

1. Parse meeting type from arguments (default: standup if not specified)
2. Invoke @meeting-facilitator with meeting type and task ID
3. Generate appropriate briefing materials in markdown format

## Meeting Format Guidelines

### Daily Standup (2-5 minutes)

- Current progress and completion percentage
- Key achievements and technical milestones
- Active blockers and resolution timeline
- Immediate next steps

### Technical Review (30+ minutes)

- Business context and problem impact
- Technical analysis and solution architecture
- Code demonstration with screen sharing
- Quality assessment and future implications

### Code Walkthrough (15-20 minutes)

- Implementation context and technical approach
- File-by-file walkthrough with explanation
- Integration validation and testing
- Impact assessment

### All Briefings Package

- Complete briefing materials for all meeting types
- Comprehensive Q&A preparation
- Visual aids and presentation scripts

## Expected Output

meeting-facilitator generates appropriate briefing materials with:

- Executive summary and technical narrative
- Screen sharing guides and file presentation sequence
- Q&A preparation with anticipated questions
- Stakeholder-specific reporting

## Success Criteria

- Briefing materials tailored to specified meeting type
- Clear technical narrative from problem through solution
- Interactive presentation materials for confident delivery
- Comprehensive coverage of implementation and impact
