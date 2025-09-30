#!/usr/bin/env python3
"""
Hook: Validates plan.md generation after Write tool creates it
Trigger: Post-Write tool call for *.md files in .claude/tasks/*/
Returns: {"success": true, "message": "...", "validations": {...}}
Caches: .claude/tasks/{TASK_ID}/.validation-cache/plan-validation.json
Debug: .claude/tasks/{TASK_ID}/.debug/plan-failure.json (on failure)

This hook implements post-write validation for plan.md files to ensure
workflow plan generation succeeds with required content structure.
"""

import sys
import json
import os
import re
from pathlib import Path
from datetime import datetime


def extract_task_id(file_path):
    """Extract TASK-ID from file path like .claude/tasks/CWF-004/plan.md"""
    match = re.search(r'\.claude/tasks/([^/]+)/', file_path)
    return match.group(1) if match else None


def check_section(file_path, section_header):
    """Check if file contains specified section header"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            return section_header in content
    except Exception:
        return False


def generate_debug_artifact(task_id, validations, file_path):
    """Generate debug artifact on validation failure"""
    debug_dir = f".claude/tasks/{task_id}/.debug"
    os.makedirs(debug_dir, exist_ok=True)

    debug_info = {
        "timestamp": datetime.now().isoformat(),
        "file_path": file_path,
        "validations": validations,
        "error": "Plan generation validation failed",
        "recovery_steps": [
            "Check if task-planner sub-agent completed successfully",
            "Review sub-agent logs for errors or incomplete execution",
            "Verify plan.md template was used correctly",
            "Re-run /project:task:plan [TASK-ID] to regenerate plan"
        ]
    }

    with open(f"{debug_dir}/plan-failure.json", "w") as f:
        json.dump(debug_info, f, indent=2)


def validate_plan_generation(tool_input):
    """Validates plan.md after Write tool creates it."""
    try:
        data = json.loads(tool_input)
        file_path = data.get('file_path', '')

        # Only validate plan.md in task workspaces
        if not file_path.endswith('plan.md') or '.claude/tasks/' not in file_path:
            return {"success": True, "message": "Not a plan.md file, skipping validation"}

        # Extract TASK-ID from path
        task_id = extract_task_id(file_path)
        if not task_id:
            return {"success": True, "message": "Could not extract TASK-ID, skipping validation"}

        # Validate plan.md
        file_exists = os.path.exists(file_path)
        file_non_empty = os.path.getsize(file_path) > 0 if file_exists else False

        validations = {
            "file_exists": file_exists,
            "file_non_empty": file_non_empty,
            "file_size_bytes": os.path.getsize(file_path) if file_exists else 0,
            "has_solution_architecture": check_section(file_path, "## Solution Architecture"),
            "has_implementation_roadmap": check_section(file_path, "## Implementation Roadmap"),
            "has_testing_strategy": check_section(file_path, "## Testing Strategy"),
            "has_risk_mitigation": check_section(file_path, "## Risk Mitigation"),
            "timestamp": datetime.now().isoformat(),
            "task_id": task_id
        }

        # Cache validation results
        cache_dir = f".claude/tasks/{task_id}/.validation-cache"
        os.makedirs(cache_dir, exist_ok=True)

        cache_file = f"{cache_dir}/plan-validation.json"
        with open(cache_file, "w") as f:
            json.dump(validations, f, indent=2)

        # Generate debug artifact on critical failure
        if not file_exists or not file_non_empty:
            generate_debug_artifact(task_id, validations, file_path)
            return {
                "success": True,
                "message": f"⚠️ Plan validation failed for {task_id} - debug artifact generated",
                "cache_file": cache_file
            }

        # Log warnings for missing sections (non-blocking)
        warnings = []
        if not validations["has_solution_architecture"]:
            warnings.append("Missing '## Solution Architecture' section")
        if not validations["has_implementation_roadmap"]:
            warnings.append("Missing '## Implementation Roadmap' section")

        message = f"✅ Plan validation cached for {task_id}"
        if warnings:
            message += f" (warnings: {', '.join(warnings)})"

        return {
            "success": True,
            "message": message,
            "cache_file": cache_file,
            "warnings": warnings if warnings else None
        }

    except Exception as e:
        return {
            "success": True,
            "message": f"⚠️ Validation hook error: {str(e)} (non-blocking)"
        }


def main():
    """Main entry point for hook execution"""
    if len(sys.argv) > 1:
        # Hook invoked with tool input as argument
        tool_input = sys.argv[1]
    else:
        # Hook invoked with stdin
        tool_input = sys.stdin.read()

    result = validate_plan_generation(tool_input)
    print(json.dumps(result))

    # Always return success (non-blocking hook)
    sys.exit(0)


if __name__ == "__main__":
    main()