# Migration Documentation Voice & Style Guide

## Tone & Voice

### Professional Authority
Write as a trusted technical advisor with deep expertise in legacy modernization. Your voice should inspire confidence while acknowledging the complexity of migration work.

**Good**: "This migration strategy employs a strangler fig pattern to minimize risk while maintaining business continuity."

**Bad**: "We'll just slowly replace the old stuff with new stuff."

### Balanced Perspective
Acknowledge both opportunities and challenges. Never oversimplify or overpromise.

**Good**: "While this approach reduces deployment risk, it requires maintaining two systems during the transition period."

**Bad**: "This is the perfect solution with no downsides!"

### Action-Oriented
Focus on concrete steps and measurable outcomes.

**Good**: "Phase 1 delivers a working REST API for the user service, enabling mobile app development to begin."

**Bad**: "We'll work on modernizing things in the first phase."

## Language Guidelines

### Use These Phrases
- "Strategic modernization"
- "Risk-mitigated approach"
- "Incremental delivery"
- "Business continuity"
- "Technical debt reduction"
- "Measurable outcomes"
- "Phased implementation"
- "Rollback capability"

### Avoid These Phrases
- "Easy" or "simple" (migration is never simple)
- "Just" or "simply" (minimizes complexity)
- "Obviously" (assumes knowledge)
- "Quick fix" (implies shortcuts)
- "Legacy mess" (unprofessional)
- "Old/outdated" (use "current state" instead)

## Document Structure

### Executive Summary
- 2-3 paragraphs maximum
- Lead with business value
- Include high-level timeline
- State expected outcomes
- Mention risk mitigation

**Template**:
```
This migration plan outlines the strategic modernization of [system] from 
[current state] to [target state]. The approach prioritizes [key value], 
while maintaining [critical requirement].

The migration follows a [pattern] approach across [N] phases over [timeline]. 
This strategy enables [business benefit] while minimizing [risk].

Expected outcomes include [outcome 1], [outcome 2], and [outcome 3], with 
success measured through [key metrics].
```

### Technical Sections
- Use clear headings
- Include diagrams where helpful
- Provide concrete examples
- List specific technologies
- Quantify where possible

### Risk Analysis
- Be honest about challenges
- Provide mitigation strategies
- Include contingency plans
- Assign likelihood and impact ratings

## Formatting Standards

### Headings
```markdown
# Document Title
## Major Section
### Subsection
#### Detail Level
```

### Lists
Use bullet points for:
- Features
- Requirements
- Risks
- Recommendations

Use numbered lists for:
1. Sequential steps
2. Phases
3. Priorities
4. Procedures

### Tables
Use tables for:
- Risk matrices
- Resource allocation
- Timeline phases
- Technology comparisons
- Metrics tracking

Example:
```markdown
| Phase | Duration | Key Deliverable | Success Metric |
|-------|----------|-----------------|----------------|
| 1     | 4 weeks  | REST API Core   | 100% endpoint coverage |
```

### Code Examples
Always include:
- Language identifier
- Context explanation
- Before/after comparisons when relevant

```typescript
// Before: SOAP request
const soapRequest = `
  <soap:Envelope>
    <soap:Body>
      <GetUser>
        <userId>123</userId>
      </GetUser>
    </soap:Body>
  </soap:Envelope>
`;

// After: REST request
const response = await fetch('/api/users/123');
const user = await response.json();
```

## Specific Section Guidelines

### Current State Assessment
- Inventory all technologies
- Quantify technical debt
- Identify critical dependencies
- Note integration points
- Assess team capabilities

### Target Architecture
- Describe modern stack
- Explain technology choices
- Show component relationships
- Define integration patterns
- Specify infrastructure needs

### Migration Strategy
- Name the pattern (strangler, big bang, parallel)
- Justify the approach
- Break into phases
- Define success criteria
- Include rollback plans

### Timeline & Phases
- Realistic estimates
- Clear milestones
- Dependency mapping
- Buffer for unknowns
- Go/no-go decision points

### Resource Requirements
- Team composition
- Skill gaps
- Training needs
- Tool requirements
- Budget estimates

### Success Metrics
- Technical KPIs
- Business KPIs
- Quality metrics
- Acceptance criteria
- Measurement methods

## Quality Checklist

Before finalizing any migration document:

- [ ] Executive summary is clear and compelling
- [ ] All technical terms are defined
- [ ] Risks are honestly assessed
- [ ] Timeline is realistic
- [ ] Success metrics are measurable
- [ ] Diagrams are included where helpful
- [ ] Code examples are accurate
- [ ] Formatting is consistent
- [ ] No spelling or grammar errors
- [ ] Document has version number and date
- [ ] All sections are complete
- [ ] Tone is professional throughout

## Version Control

Every migration document should include:

```markdown
---
Version: 1.0.0
Date: 2024-12-02
Author: Legacy Resurrection Studio
Status: Draft | Review | Approved
---
```

## Examples

### Good Risk Description
```markdown
**Risk**: Database schema changes may cause downtime during migration
**Likelihood**: Medium
**Impact**: High
**Mitigation**: 
- Implement blue-green deployment strategy
- Use database migration tools with rollback capability
- Schedule migration during low-traffic window
- Maintain read replicas for fallback
**Contingency**: Immediate rollback procedure documented and tested
```

### Good Phase Description
```markdown
### Phase 2: Core Service Migration (6 weeks)

**Objectives**:
- Migrate user authentication service to REST
- Implement JWT-based authentication
- Deploy to staging environment
- Complete integration testing

**Deliverables**:
- REST authentication endpoints
- JWT token service
- Updated API documentation
- Integration test suite
- Deployment runbook

**Success Criteria**:
- 100% feature parity with SOAP service
- Response time < 200ms (p95)
- Zero authentication failures in testing
- Security audit passed
- Staging deployment successful

**Dependencies**:
- Phase 1 infrastructure complete
- Security team review approved
- Test data prepared
```
