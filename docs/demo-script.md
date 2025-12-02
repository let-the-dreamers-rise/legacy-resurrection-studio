# 3-Minute Demo Script

**Total Time**: 3:00  
**Audience**: Hackathon judges  
**Goal**: Showcase enterprise value + Kiro integration + technical polish

---

## [0:00-0:30] Introduction & Problem Framing

**[Screen: Dashboard]**

> "Hi judges! I'm excited to show you **Legacy Resurrection Studio** – an enterprise toolkit for strategic legacy modernization.
>
> Here's the problem: Companies spend over **$300 billion annually** maintaining legacy systems. SOAP services from 2005, jQuery spaghetti code, Bootstrap 3 admin panels – they're everywhere, and modernizing them is risky and expensive.
>
> Legacy Resurrection Studio solves this with three specialized 'resurrection chambers' that analyze, transform, and modernize legacy code with **production-ready artifacts**."

**Key Points**:
- State the problem clearly (legacy modernization)
- Mention the dollar amount (makes it real)
- Introduce the three chambers concept

---

## [0:30-1:15] Legacy Reanimator Demo

**[Navigate to /reanimator]**

> "Let's start with the **Legacy Reanimator** – think of it as an autopsy for haunted codebases.
>
> I'll click 'Load Sample' to bring in some typical legacy code..."

**[Click "Load Sample"]**

> "Here we have a classic nightmare: jQuery DOM manipulation, Bootstrap 3, inline event handlers, AJAX callbacks – all the patterns that make developers cry.
>
> Let's analyze it..."

**[Click "Analyze Code"]**

**[Wait for results – 2-3 seconds]**

> "And here's what we get:
>
> - **Risk Score**: 42 out of 100 – medium risk, needs attention
> - **Detected Patterns**: jQuery usage, Bootstrap 3, AJAX patterns – each with severity levels and modernization paths
> - **Recommendations**: Strategic guidance like 'Migrate to React hooks' and 'Replace AJAX with fetch API'
> - **Chamber Routing**: The system automatically suggests using the **Ghost UI Converter** for this code
>
> And I can download a comprehensive **migration report** in markdown format with one click."

**[Click "Download Report" button]**

**Key Points**:
- Show the risk score prominently
- Highlight pattern detection with severity
- Emphasize automatic chamber routing
- Mention downloadable report

---

## [1:15-2:00] API Necromancer Demo

**[Navigate to /api-necromancer]**

> "Next up: **API Necromancer** – this raises SOAP relics into living RESTful APIs.
>
> Let me load a sample WSDL document..."

**[Click "Use Sample WSDL"]**

> "This is a typical enterprise SOAP service with operations like GetUser and CreateUser.
>
> Watch what happens when we convert it..."

**[Click "Convert to REST"]**

**[Wait for results – 2-3 seconds]**

> "Boom! We get:
>
> - **Extracted Operations**: Two REST endpoints – GET /users/{id} and POST /users – with proper HTTP methods
> - **OpenAPI 3.0 Specification**: A complete, standards-compliant spec with syntax highlighting and copy functionality
> - **Migration Plan**: A three-phase strangler fig strategy – Foundation, Migration, Deprecation
>
> And I can download the OpenAPI spec as JSON, ready to import into Swagger UI or generate client SDKs."

**[Click "Download JSON" button]**

**Key Points**:
- Show the transformation is instant
- Highlight OpenAPI 3.0 compliance
- Mention the migration strategy
- Demonstrate download functionality

---

## [2:00-2:45] Ghost UI Converter Demo

**[Navigate to /ghost-ui]**

> "Finally, **Ghost UI Converter** – this peels off old skins and grafts modern interfaces.
>
> Loading a legacy Bootstrap 3 form..."

**[Click "Use Sample Legacy UI"]**

> "Classic Bootstrap 3 with jQuery event handlers and AJAX calls.
>
> Let's modernize it..."

**[Click "Convert to React"]**

**[Wait for results – 2-3 seconds]**

> "And here's the magic:
>
> - **Generated React Component**: Full TypeScript component with proper hooks – useState for form state, useEffect for data fetching
> - **Tailwind CSS**: All Bootstrap classes converted to modern Tailwind utilities
> - **What Changed Section**: Clear explanation of the transformations – jQuery to React hooks, AJAX to fetch API, DOM manipulation to virtual DOM
> - **Migration Notes**: Specific guidance on manual adjustments needed
>
> I can download this as a .tsx file, drop it into my project, and it just works."

**[Click "Download" button]**

**Key Points**:
- Show the generated TypeScript code
- Highlight the "What Changed" section
- Mention it's production-ready
- Demonstrate download

---

## [2:45-3:00] Closing & Kiro Integration

**[Navigate back to Dashboard or stay on results]**

> "So in under 3 minutes, we've:
>
> - Analyzed legacy code with risk scoring
> - Converted SOAP to REST with OpenAPI specs
> - Transformed jQuery UI to React + Tailwind
>
> All with **production-ready artifacts** you can use immediately.
>
> Now, here's the Kiro magic: This entire project was built in **2 days** using Kiro's specs, hooks, and steering docs. The specs define what each chamber does, steering docs maintain the necromancer theme and professional voice, and hooks automate testing and documentation.
>
> **Legacy Resurrection Studio** isn't just a hackathon demo – it's an enterprise-ready toolkit that shows how Kiro AI can accelerate real-world development while maintaining quality.
>
> Thank you!"

**Key Points**:
- Recap what was shown
- Emphasize production-ready artifacts
- Highlight Kiro's role (specs, hooks, steering)
- Position as enterprise-ready, not just a demo

---

## Backup Talking Points

If you have extra time or questions:

### Technical Architecture
- "Built on Next.js 14 with TypeScript strict mode"
- "Custom component library for consistency"
- "Syntax highlighting with react-syntax-highlighter"
- "All chambers are independent but share common infrastructure"

### Kiro Integration Details
- "Specs define feature requirements – like analysis-spec.yaml for pattern detection"
- "Steering docs maintain voice – migration-voice.md ensures professional tone"
- "Hooks automate tasks – doc-sync keeps architecture docs current"
- "Vibe coding workflow: define requirements, generate implementation, iterate"

### Enterprise Value
- "Strangler fig pattern is industry best practice"
- "OpenAPI 3.0 enables SDK generation and API gateways"
- "Migration reports provide stakeholder communication"
- "Accessibility-first approach (WCAG AA compliant)"

### Future Enhancements
- "Database schema migration chamber"
- "Auto-generated test suites"
- "CI/CD workflow export"
- "Team collaboration features"

---

## Demo Tips

### Before Demo
1. **Clear browser cache** to ensure fresh load
2. **Test all sample buttons** work correctly
3. **Have backup screenshots** in case of network issues
4. **Practice timing** – aim for 2:45 to leave buffer

### During Demo
1. **Speak clearly and confidently**
2. **Don't rush** – let results load naturally
3. **Highlight key features** as they appear
4. **Use the mouse** to point at important elements
5. **Smile** – enthusiasm is contagious

### If Something Breaks
1. **Stay calm** – judges understand hackathon demos
2. **Have screenshots ready** as backup
3. **Explain what should happen** while showing screenshots
4. **Pivot to Kiro story** if needed

---

## Q&A Preparation

### Likely Questions

**Q: "How does this compare to existing tools?"**

A: "Most legacy analysis tools just identify problems. We generate production-ready artifacts – OpenAPI specs, React components, migration reports. It's the difference between a diagnosis and a prescription."

**Q: "What about complex SOAP services with custom types?"**

A: "Great question! The WSDL parser handles complex types and nested structures. For edge cases, the generated OpenAPI spec provides a solid foundation that developers can refine."

**Q: "How did Kiro help specifically?"**

A: "Kiro was a true engineering partner. Specs defined requirements, steering docs maintained consistency, and hooks automated testing. What would take 2-3 weeks solo took 2 days with Kiro - a 10-15x productivity multiplier - and the code quality is higher."

**Q: "Is this production-ready?"**

A: "The generated artifacts are production-ready. The tool itself is a working prototype that demonstrates the concept. With additional error handling and edge case coverage, it could be deployed internally at a company."

**Q: "What's the business model?"**

A: "This is a hackathon project, but the business model could be:
- SaaS for development teams
- Enterprise licensing for large companies
- Professional services for custom migrations
- Open source core with premium features"

---

**Good luck! You've got this! 🎃**
