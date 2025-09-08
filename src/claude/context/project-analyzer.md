# Project Context Analyzer

This document provides standardized project analysis patterns that can be referenced by sub-agents and commands to
ensure consistent context injection across the workflow.

## CONTEXT CACHING

Before full project analysis, check for cached context:

**Cache Locations:**

- .claude/project-context.md (main project cache)
- .claude/tasks/\*/project-context.md (per-task cache references)

**Cache Validation:**

1. Check if .claude/project-context.md exists and is recent (< 7 days)
2. Verify tech stack hasn't changed (check package.json, requirements.txt, etc.)
3. If cache valid: Reference existing context, focus on task-specific analysis
4. If cache stale: Update only changed sections, preserve stable context

**Selective Refresh Triggers:**

- package.json/requirements.txt changes → Update dependencies section
- New framework adoption → Update architecture section
- Team process changes → Update patterns section
- Infrastructure changes → Update deployment section

Use cached context when available, perform delta updates when needed.

## Technology Stack Detection

### Package Managers & Dependencies

```bash
# Node.js Projects
if [ -f "package.json" ]; then
    echo "Node.js project detected"
    jq '.dependencies, .devDependencies' package.json
    # Detect frameworks: React, Vue, Angular, Express, etc.
fi

# Python Projects
if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ] || [ -f "Pipfile" ]; then
    echo "Python project detected"
    # Detect frameworks: Django, Flask, FastAPI, etc.
fi

# Rust Projects
if [ -f "Cargo.toml" ]; then
    echo "Rust project detected"
fi

# Java Projects
if [ -f "pom.xml" ] || [ -f "build.gradle" ]; then
    echo "Java project detected"
fi
```

### Framework Detection Patterns

**Frontend Frameworks:**

- React: Look for `react` in dependencies, `.jsx/.tsx` files, `src/components/`
- Vue: Look for `vue` in dependencies, `.vue` files, `src/views/`
- Angular: Look for `@angular` packages, `angular.json`, `.component.ts`
- Svelte: Look for `svelte` in dependencies, `.svelte` files

**Backend Frameworks:**

- Express.js: Look for `express` dependency, `app.js`, `server.js`
- Django: Look for `django` in requirements, `manage.py`, `settings.py`
- Flask: Look for `flask` dependency, `app.py`, `wsgi.py`
- Rails: Look for `Gemfile`, `config/routes.rb`, `app/` directory

**Testing Frameworks:**

- Jest: `jest.config.js`, `__tests__/` directories
- Pytest: `pytest.ini`, `test_*.py` files
- Cypress: `cypress.json`, `cypress/` directory
- RSpec: `.rspec`, `spec/` directory

## Code Style Analysis

### Automatic Detection

- **ESLint**: `.eslintrc.*` files present
- **Prettier**: `.prettierrc` or `prettier` in package.json
- **TypeScript**: `tsconfig.json` present
- **Python**: `pyproject.toml` with tool configurations
- **EditorConfig**: `.editorconfig` file

### Pattern Recognition

```bash
# Indentation style detection
find . -name "*.js" -o -name "*.py" -o -name "*.ts" | head -10 | xargs grep -P "^(\s+)" | head -20
# Analyze most common indentation pattern

# Quote style detection
find . -name "*.js" -o -name "*.ts" | xargs grep -o "['\"]" | sort | uniq -c
# Determine single vs double quote preference
```

## Architecture Pattern Detection

### Directory Structure Analysis

- **MVC Pattern**: `models/`, `views/`, `controllers/`
- **Component-Based**: `components/`, `containers/`, `pages/`
- **Domain-Driven**: Feature-based directory organization
- **Microservices**: Multiple service directories, Docker compose

### Database Integration

- **SQL**: Look for `.sql` files, database migration directories
- **ORM**: Sequelize, TypeORM, Django ORM, ActiveRecord patterns
- **NoSQL**: MongoDB connection strings, Mongoose schemas

## Build and Deployment Context

### Build Tools Detection

- **Webpack**: `webpack.config.js`, `webpack/`
- **Vite**: `vite.config.js`, `@vitejs` dependencies
- **Rollup**: `rollup.config.js`
- **Parcel**: `parcel` in dependencies
- **Next.js**: `next.config.js`, `.next/`

### CI/CD Integration

- **GitHub Actions**: `.github/workflows/`
- **GitLab CI**: `.gitlab-ci.yml`
- **Jenkins**: `Jenkinsfile`
- **CircleCI**: `.circleci/config.yml`

### Containerization

- **Docker**: `Dockerfile`, `docker-compose.yml`
- **Kubernetes**: `k8s/` directory, `.yaml` manifests

## Quality Assurance Patterns

### Test Coverage Tools

- **Jest**: Coverage configuration in `jest.config.js`
- **Istanbul/nyc**: `.nycrc` configuration
- **Coverage.py**: `.coveragerc` for Python projects
- **SimpleCov**: For Ruby projects

### Static Analysis

- **SonarQube**: `sonar-project.properties`
- **CodeClimate**: `.codeclimate.yml`
- **ESLint**: Static analysis for JavaScript/TypeScript
- **Pylint/Black**: Python code quality tools

## Team Process Integration

### Version Control Patterns

```bash
# Branch naming conventions
git branch -r | grep -E "(feature/|fix/|hotfix/)" | head -10
# Analyze branch naming patterns

# Commit message patterns
git log --oneline -20 | grep -E "(feat|fix|docs|style|refactor|test|chore)"
# Detect conventional commits usage
```

### Code Review Requirements

- **Branch Protection**: GitHub/GitLab branch protection rules
- **Required Reviewers**: CODEOWNERS file analysis
- **PR Templates**: `.github/pull_request_template.md`

### Documentation Standards

- **README Structure**: Analyze existing README patterns
- **API Documentation**: Swagger/OpenAPI specs, JSDoc comments
- **Architecture Docs**: `docs/` directory, ADRs (Architecture Decision Records)

## Performance Monitoring

### Observability Stack

- **APM Tools**: New Relic, DataDog, Application Insights integrations
- **Logging**: Winston, Loguru, structured logging patterns
- **Metrics**: Prometheus, Grafana configurations
- **Tracing**: Jaeger, Zipkin, OpenTelemetry setup

### Performance Testing

- **Load Testing**: k6, Artillery, JMeter configurations
- **Bundle Analysis**: webpack-bundle-analyzer, Lighthouse CI
- **Database Performance**: Query analysis tools, migration patterns

## Security Context

### Security Tools Integration

- **SAST**: Snyk, SonarQube security rules
- **Dependency Scanning**: npm audit, safety (Python), Bundler audit
- **Container Scanning**: Trivy, Clair configurations
- **Secrets Management**: Environment variable patterns, vault integrations

### Compliance Requirements

- **GDPR**: Privacy policy patterns, data handling procedures
- **SOC2**: Audit trail requirements, logging standards
- **Industry Standards**: HIPAA, PCI DSS compliance patterns

This context analysis should be performed automatically by sub-agents when beginning any task to ensure project-aware
decision making and implementation.
