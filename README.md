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
```
cd frontend
npm install
npm run dev
```
Then open the address printed in the terminal (http://localhost:5173).
Node.js 20 or newer is required.
The static mockup from Stages 1 and 2 is kept in `mockup/` and can still be opened directly in a browser.
## AI usage
| Tool | Used for |
|---|---|
| ChatGPT | Project idea, data model, HTML structure and CSS guidance for Stage 1 |
| ChatGPT | JavaScript data logic, immutable functions and console tests for Stage 2 |
| Claude Code | Vite project setup, porting the mockup to JSX and troubleshooting npm for Stage 3 |
| Claude Code | Splitting the card and the list into components with props for Stage 4 |
| Claude Code | Moving the list into state, toggle and delete handlers, and the light / dark switch for Stage 5 |
Details for each stage are available in the `ai-log/` folder.
## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API
- [ ] Stage 7+: form, backend, database and authentication
## Stage 2: data logic in JavaScript
The application data is moved into a JavaScript file, using an array of objects with unique IDs.
The logic is kept separate from the HTML and CSS: it does not touch the DOM, it does not handle events, and it only prints results to the browser console.
The functions use `map`, `filter`, `find`, and `reduce` to list titles, count active workflows, search by title, add validated items, toggle state, and delete items without mutating the original array.
## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from Stage 2
moved into the main component (`frontend/src/App.jsx`); the list is still printed raw as JSON.
The header shows the total number of workflows and how many are active, both computed from the array.
The styles from Stage 1 are reused in `frontend/src/App.css`, with the layout reduced to one column until the form returns in Stage 7.
## Stage 4: components
The list is rendered from the data, through two components in `frontend/src/components/`:
- `WorkflowList` receives the whole array and renders one card per item with `map` and `key={workflow.id}`; an empty array shows the message "No workflows available."
- `WorkflowCard` receives a single workflow through props and displays it; the `active` flag chooses the card classes and the status text, and the trigger labels, icons and descriptions are kept in a lookup table, separate from the values stored in the data.
Adding an object to the array in `App.jsx` produces one more card without any other change.
## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.
- `App` owns the list (`useState(INITIAL_WORKFLOWS)`) and is the only place that changes it: `handleToggle` builds a new array with `map` and a copy of the changed workflow, `handleDelete` builds a new array with `filter`, both through `setWorkflows((prev) => ...)`.
- `WorkflowList` passes `onToggle` and `onDelete` down unchanged; `WorkflowCard` has a controlled checkbox bound to `active` and a Delete button with an `aria-label` that names the workflow.
- The header counter is derived from the list on every render, not kept in a separate state.
- The theme is kept in state and written as `data-theme` on `<html>`; the CSS only redefines the color variables, so the system theme still applies until the user picks one.
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
## Stage 2 checklist
| ID | Requirement | Where | How to check |
|---|---|---|---|
| S2-R1 | JavaScript file linked and logs on page load | index.html | Open page and check Console |
| S2-R2 | Array contains at least three items with id, title, state and fixed trigger | workflows.js | Read file |
| S2-R3 | List, count, search, add, toggle and delete functions work | workflows.js | Check console output |
| S2-R4 | Add rejects empty name and invalid trigger | workflows.js | Read validation logs |
| S2-R5 | Original array remains unchanged after add | workflows.js | Check console output |
| S2-R6 | README Stage 2 section and AI log exist | README.md, ai-log/etapa-02.md | Read files |
| S2-R7 | Stage 2 commit published | GitHub | Check commit history |
## Stage 3 checklist
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/frontend/package.json#L6-L11) | npm install, npm run dev |
| S3-R2 | App name and counter computed from data | [frontend/src/App.jsx#L8-L23](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/frontend/src/App.jsx#L8-L23) | Edit data, save, watch the header |
| S3-R3 | Data from README, not from the example | [frontend/src/App.jsx#L1-L5](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/frontend/src/App.jsx#L1-L5) | Compare with the sample data in README |
| S3-R4 | Stage 1 styles reused | [frontend/src/App.css](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/frontend/src/App.css#L95-L105) | Look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/frontend/.gitignore#L10-L11) | npm run build |
| S3-R6 | README Stage 3 section and AI log | [README.md](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/README.md), [ai-log/etapa-03.md](https://github.com/stefan-ilinca/ProiectTW/blob/9b055ca998bcdf4a568b104d015ec1fcac73ee45/ai-log/etapa-03.md) | Read files |
| S3-R7 | Commit "Stage 3" pushed | [commit 9b055ca](https://github.com/stefan-ilinca/ProiectTW/commit/9b055ca998bcdf4a568b104d015ec1fcac73ee45) | Check commit history |
## Stage 4 checklist
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/stefan-ilinca/ProiectTW/tree/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components) | Open folder |
| S4-R2 | Card receives data through props | [WorkflowCard.jsx#L21-L36](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components/WorkflowCard.jsx#L21-L36) | Read |
| S4-R3 | map + key={id}, no console warnings | [WorkflowList.jsx#L9-L15](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components/WorkflowList.jsx#L9-L15) | F12, Console |
| S4-R4 | Message for empty list | [WorkflowList.jsx#L5-L7](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components/WorkflowList.jsx#L5-L7) | Set array to [] in App.jsx |
| S4-R5 | State changes the card look | [WorkflowCard.jsx#L25](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components/WorkflowCard.jsx#L25), [#L40-L47](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/frontend/src/components/WorkflowCard.jsx#L40-L47) | Toggle an active flag |
| S4-R6 | README Stage 4 section and AI log | [README.md](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/README.md), [ai-log/etapa-04.md](https://github.com/stefan-ilinca/ProiectTW/blob/59ca1085db6f8a0b3ab5867a4688400aa165c85f/ai-log/etapa-04.md) | Read files |
| S4-R7 | Commit "Stage 4" pushed | [commit 59ca108](https://github.com/stefan-ilinca/ProiectTW/commit/59ca1085db6f8a0b3ab5867a4688400aa165c85f) | Check commit history |
## Stage 5 checklist
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S5-R1 | List kept in useState, in App | [App.jsx#L19](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L19) | Read |
| S5-R2 | Toggling changes state and card look | [App.jsx#L23-L27](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L23-L27), [WorkflowCard.jsx#L27-L33](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/components/WorkflowCard.jsx#L27-L33) | Click a checkbox |
| S5-R3 | Delete removes the item | [App.jsx#L29-L31](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L29-L31), [WorkflowCard.jsx#L60-L66](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/components/WorkflowCard.jsx#L60-L66) | Click Delete |
| S5-R4 | Header counter derived, not in state | [App.jsx#L41](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L41) | Toggle, watch the header |
| S5-R5 | Immutable updates (no push, splice, assignment) | [App.jsx#L23-L31](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L23-L31) | Read |
| S5-R6 | Light / dark toggle: state + data-theme on html | [App.jsx#L34-L38](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.jsx#L34-L38), [App.css#L394-L432](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/frontend/src/App.css#L394-L432) | Click the button, both system themes |
| S5-R7 | No console warnings; README + AI log | [README.md](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/README.md), [ai-log/etapa-05.md](https://github.com/stefan-ilinca/ProiectTW/blob/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | Commit "Stage 5" pushed | [commit fb05a5b](https://github.com/stefan-ilinca/ProiectTW/commit/fb05a5b63d830c5ff36ecddd0bcd965750a8fd91) | Check commit history |
