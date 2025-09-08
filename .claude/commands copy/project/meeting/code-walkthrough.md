Generate code walkthrough guide for task: $ARGUMENTS

CODE WALKTHROUGH PURPOSE:
Create a step-by-step guide for presenting code changes during development meetings, enabling effective screen sharing and technical discussion of implementation details.

WALKTHROUGH STRUCTURE:

1. **Pre-Walkthrough Setup**
   - Files to have open before meeting starts
   - IDE configuration for optimal presentation
   - Git branches and commit references
   - Any tools or environments needed

2. **Walkthrough Sequence**
   - Logical order for presenting code changes
   - Transition points between files and concepts
   - Key lines to highlight and explain
   - Before/after comparisons to demonstrate

3. **Technical Narrative**
   - Story arc connecting all code changes
   - Explanation of why each change was necessary
   - How changes fit into broader architecture
   - Future implications and extensibility

4. **Interactive Elements**
   - Points where audience questions are expected
   - Code that can be modified live for demonstration
   - Testing scenarios to run during presentation
   - Configuration changes to show impact

SCREEN SHARING GUIDE:
**File Presentation Order:**

1. [Primary file] - Lines X-Y (main logic change)
2. [Supporting file] - Lines A-B (integration point)
3. [Test file] - New test cases and coverage
4. [Configuration] - Environment or build changes

**For Each File Section:**

- **Context**: Why we're looking at this file
- **Problem**: What was wrong or missing
- **Solution**: Specific changes made
- **Impact**: How this affects the system
- **Testing**: How we validate this works

DEVELOPER SCRIPT:
"Let me walk you through the technical solution we implemented for [TASK-ID]..."

**Opening Context** (1 min):

- "The core issue was [problem] affecting [system component]"
- "Our analysis showed [root cause] in [specific location]"

**Code Deep Dive** (10-15 min):

- "First, let's look at [file] where the main logic change happened..."
- "Notice how we [explain specific change] to address [specific problem]..."
- "This integrates with [other component] through [integration point]..."

**Testing Demonstration** (5 min):

- "We can validate this works by [running specific test]..."
- "Here's how the system behaves before and after our change..."

**Architecture Impact** (5 min):

- "This solution follows our tool-agnostic principle by [explanation]..."
- "It positions us well for future [extensibility consideration]..."

DELIVERABLE:

- .claude/tasks/[TASK-ID]/code-walkthrough-guide.md
- File-by-file presentation sequence
- Technical explanation script for each change
- Interactive demonstration points
- Timing guide for different meeting lengths (5min, 15min, 30min)

Transform technical implementation into engaging, educational code presentation.
