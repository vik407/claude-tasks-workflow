#!/usr/bin/env python3
"""
Markdown formatter hook for Claude Code.
Formats markdown files using standard conventions.
Can be called from subprojects using $CLAUDE_PROJECT_DIR variable.
"""
import sys
import re
import json
from pathlib import Path


def format_markdown(content: str) -> str:
    """Apply standard markdown formatting rules."""
    lines = content.split('\n')
    formatted_lines = []

    for i, line in enumerate(lines):
        # Ensure proper spacing around headers
        if line.startswith('#'):
            if i > 0 and formatted_lines and formatted_lines[-1].strip():
                formatted_lines.append('')
            formatted_lines.append(line)
            if i < len(lines) - 1 and lines[i + 1].strip() and not lines[i + 1].startswith('#'):
                formatted_lines.append('')
        else:
            formatted_lines.append(line)

    # Remove multiple consecutive blank lines
    result = []
    prev_blank = False
    for line in formatted_lines:
        is_blank = not line.strip()
        if not (is_blank and prev_blank):
            result.append(line)
        prev_blank = is_blank

    return '\n'.join(result)


def main():
    """Process Edit tool calls and format markdown files."""
    if len(sys.argv) < 2:
        print(json.dumps({"success": True}))
        return 0

    tool_input = sys.argv[1]

    try:
        data = json.loads(tool_input)
        file_path = data.get('file_path', '')

        # Only process markdown files
        if not file_path.endswith('.md'):
            print(json.dumps({"success": True}))
            return 0

        # Read, format, and write back
        path = Path(file_path)
        if path.exists():
            content = path.read_text()
            formatted = format_markdown(content)
            path.write_text(formatted)
            print(json.dumps({
                "success": True,
                "message": f"Formatted {file_path}"
            }))
        else:
            print(json.dumps({"success": True}))

        return 0

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e)
        }))
        return 1


if __name__ == '__main__':
    sys.exit(main())