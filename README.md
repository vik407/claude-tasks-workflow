
# claude-tasks-workflow

This repository contains a set of structured task and meeting prompt templates used by a "Claude"-style assistant integration. The templates live under the `.claude/commands/` tree and generate or guide files under `.claude/tasks/` for specific task IDs. The templates describe project workflows (analysis, planning, implementation), meeting briefs, CI checks, documentation updates, Jira updates, and handoffs.

Use this README as a concise reference for the available commands, the task lifecycle, file layout, and how to use or extend the templates.

## Quick checklist (requirements mapping)

- Document the repository and describe all claude command templates: Done (this README)

- Explain how to use the commands and the expected files they create: Done

- Provide examples and common workflows: Done

## Repository layout (important paths)

- `.claude/commands/` — markdown prompt templates grouped by category (project/task/meeting/workflow/docs/ci/jira etc.)

- `.claude/tasks/` — generated per-task folders (created when commands run)

Examples present in this repo (non-exhaustive):

- `.claude/commands/project/task/init.md` — initialize a new task (create task folder + analysis.md)

- `.claude/commands/project/task/analyze.md` — analysis-phase guidance (root cause, evidence)

- `.claude/commands/project/task/plan.md` — planning-phase guidance (architecture, file mapping, tests)

- `.claude/commands/project/task/implement.md` — implementation-phase guidance

- `.claude/commands/project/task/validate.md` — validation/QA guidance

- `.claude/commands/project/task/status.md` — produce a status update for a task

- `.claude/commands/project/meeting/standup-brief.md` — create a technical standup brief

- `.claude/commands/project/workflow/handoff.md` — handoff checklist and handoff.md template

- `.claude/commands/project/jira/update.md` — guidance for updating Jira tickets

- `.claude/commands/project/ci/validate.md` — CI/CD validation checklist

- `.claude/commands/project/docs/update.md` — update project docs & decision logs

- `.claude/commands/project/sprint/planning.md` — sprint planning readiness analysis

There are similarly named templates for backlog, cancel, reject, status-change, tech review, code walkthrough, stakeholder notifications, and docs maintenance.

## Purpose of the templates

Each markdown file under `.claude/commands/` is a template that instructs an assistant how to execute a specific project-related task. They are authored as structured prompts that include:

- Expected arguments (commonly a TASK-ID or short description)

- Preconditions and phase gates (e.g., "analysis must be complete")

- Step-by-step deliverables and required files

- Checklists and output file names (e.g., `analysis.md`, `plan.md`, `handoff.md`)

These templates are intended to standardize task workflows and reduce context loss between handoffs.

## Typical task lifecycle (recommended)

1. Initialize task

   - Use `project/task/init.md`. This creates `.claude/tasks/[TASK-ID]/` and an `analysis.md` skeleton and sets the status to Analysis Phase.

2. Analysis

   - Run `project/task/analyze.md` to produce `analysis.md` that documents root cause, system impact, and risk.

3. Planning

   - Run `project/task/plan.md` to create `plan.md` with architecture, file-change mapping, test strategy, and rollback plan.

4. Implementation

   - Follow `project/task/implement.md` to carry out changes with a clear per-file plan and tests.

5. Validation

   - Use `project/task/validate.md` and `project/ci/validate.md` to ensure tests/CI pass and documentation is updated.

6. Handoff / Close

   - Use `project/workflow/handoff.md` to create `handoff.md` and transfer knowledge to next owner.

These phases may be run via your assistant integration (e.g., invoking the template and passing a task id) or by manually using the templates as authoring guides.

## How to use the templates (manual / assistant-driven)

1. Choose the command template you need from `.claude/commands/`.

2. Provide the TASK-ID or short argument (templates expect `$ARGUMENTS` or similar placeholder in their body).

3. If your integration supports automatically executing templates, point the assistant to the template and pass the argument. The assistant will respond with generated content and a recommended output file path (e.g., `.claude/tasks/<TASK-ID>/analysis.md`).

4. If running manually: copy the generated content into the correct path under `.claude/tasks/[TASK-ID]/` and commit the files.

Minimal manual example (create an analysis file):

1. Create a task directory:

   - `.claude/tasks/TASK-123/analysis.md`

2. Use `project/task/analyze.md` as the authoring checklist and populate `analysis.md` with:

   - Root cause, evidence, affected components, and risk level.

3. Continue to `plan.md` and so on.

## Example assistant invocation pattern

These templates are written to be used by an assistant; a typical conversational invocation might look like:

- "Run the task analyze command for TASK-123 and produce `analysis.md`."

- "Create a standup brief for TASK-123."

The assistant should fill the template (based on the `.md` file) and return the completed text which you then save under the task folder.

## File naming & deliverable conventions

- `.claude/tasks/[TASK-ID]/analysis.md` — analysis phase

- `.claude/tasks/[TASK-ID]/plan.md` — implementation plan and file-by-file changes

- `.claude/tasks/[TASK-ID]/standup-briefing.md` — short presentation/standup guide

- `.claude/tasks/[TASK-ID]/handoff.md` — handoff details

- Additional files: `implementation.md`, `validation.md`, `status.md`, etc., as the templates prescribe.

## Extending or adding new commands

1. Add a new `.md` file under `.claude/commands/<category>/`.

2. Follow the existing template style: include the command title, argument placeholders, prerequisites, step-by-step deliverables, file names to produce, and a short checklist.

3. If your assistant integration has a command registry, register the new template if required.

## Best practices

- Always include a TASK-ID and keep the same ID folder throughout the lifecycle.

- Never change code during the Analysis phase — use `analysis.md` for investigation only.

- Keep deliverables small and focused (one plan per task).

- Use the `plan.md` file to list exact file changes and tests required.

## Contributing

- Add, improve, or clarify templates in `.claude/commands/`.

- Keep templates generic and tool-agnostic so they can be used with different assistants.

## Notes and assumptions

- These templates are prompt-based guidance; actual execution depends on your assistant/integration and any automation you add. This repo does not include an execution engine — it holds the templates and generated task files.

- If you want CLI automation, consider adding a small script that:

  1. Accepts a template path and TASK-ID

  2. Runs the template through a preferred assistant API

  3. Writes the assistant output to `.claude/tasks/[TASK-ID]/<deliverable>.md`

## Contact / Owner

- Repository: `vik407/claude-tasks-workflow`


If you'd like, I can also:

- generate a simple CLI wrapper script to run a template and save outputs, or

- produce a STATUS badge and task template generator to automate folder creation.
