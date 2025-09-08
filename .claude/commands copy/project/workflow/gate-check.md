Enforce workflow gates for task: $ARGUMENTS

GATE ENFORCEMENT RULES:

1. **Analysis Gate** - No planning without complete analysis.md
2. **Planning Gate** - No implementation without approved plan.md
3. **Implementation Gate** - No deployment without validation.md
4. **Quality Gate** - All tests must pass before deployment

VALIDATION PROCESS:

- Check required files exist for current phase
- Verify completeness of documentation
- Validate phase prerequisites are met
- Block progression if gates not satisfied

GATE VIOLATIONS:
If violations found:

- Document what's missing
- Provide remediation steps
- Block further progress
- Require explicit approval to override

Report gate status and provide clear next steps for compliance.
