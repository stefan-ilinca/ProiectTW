# FlowForge
FlowForge is a web application for creating and managing automated workflows.
Users can organize automations based on different triggers such as webhooks,
scheduled events and manual execution.
## Data model
| Field | Type | Notes |
|---|---|---|
| name | text | required, max 100 characters |
| enabled | boolean | active or inactive workflow |
| trigger | fixed values | Webhook, Schedule, Manual |
| category | relation | Marketing, Development, Operations |
| user | relation | owner of the workflow |
## Sample data
The following sample data will be used across all stages:
1. Lead Qualification — active — Webhook
2. Daily Sales Report — active — Schedule
3. Customer Data Sync — inactive — Manual
## How to run
Open `index.html` directly in a browser.
No build step and no server are required for Stage 1.
## AI usage
| Tool | Used for |
|---|---|
| ChatGPT | Project idea, data model, HTML structure and CSS guidance for Stage 1 |
Details for each stage are available in the `ai-log/` folder.
## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
- [ ] Stage 3: React application
- [ ] Stage 4: data-driven components
- [ ] Stage 5+: interaction, API, backend, database and authentication
## Stage 1 checklist
| ID | Requirement | Where | How to check |
|---|---|---|---|
| S1-R1 | README with description, fields, sample data and run instructions | README.md | Read README |
| S1-R2 | AI usage section | README.md | Read AI usage |
| S1-R3 | AI log for Stage 1 | ai-log/etapa-01.md | Open file |
| S1-R4 | Header, form and three workflow cards | index.html | Open page |
| S1-R5 | One visually finished workflow | css/style.css | Check Customer Data Sync |
| S1-R6 | Two columns desktop, one below 700px | css/style.css | Resize browser |
| S1-R7 | Visible focus and dark theme | css/style.css | Use Tab and dark mode |
| S1-R8 | Stage 1 commit published | GitHub | Check commit history |

La final, în coloana Where, profesorul vrea de fapt permalink-uri către liniile exacte din GitHub, deci după ce dai primul push, înlocuim README.md, index.html etc. cu permalink-urile reale. TW_Etapa1_Ghid_1f556a65fb2712807e91088208ff467e.pdf
