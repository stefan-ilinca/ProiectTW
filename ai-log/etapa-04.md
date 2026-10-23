# Stage 4: AI log
## Tools
- Claude Code
## Key requests
### 1. Splitting the card into components
- Asked:
  I asked to replace the JSON block from Stage 3 with two components, one for a single workflow and one for the list, following the Stage 4 guide and keeping the look of the Stage 1 mockup.
- Got:
  `WorkflowCard` receives `workflow` through props and renders the same markup as a card in the mockup (icon, title, description, trigger badge, status). `WorkflowList` receives `workflows`, returns the empty message early, and otherwise maps the array to cards with `key={workflow.id}`.
- Changed or rejected:
  The guide's example names (`TaskCard`, `TaskList`, `taskuri`) were replaced with the FlowForge names, and the status text became Active / Inactive instead of Activ / Gata.
### 2. Descriptions that are not in the data
- Asked:
  The mockup cards had a short description under the title, but the Stage 2 array has no description field, and I asked how to keep the card identical without changing the data model from README.
- Got:
  A `TRIGGER_LABELS` lookup table in `WorkflowCard` that maps each trigger value to its label, icon and a one-line description, so the data stays as in Stage 2 and only the display changes.
- Changed or rejected:
  Nothing rejected; this follows the guide's rule that labels shown on screen are separate from the values in the data.
### 3. Checking for console warnings without a browser
- Asked:
  I asked how to confirm that the list renders without the missing `key` warning.
- Got:
  The components were rendered with `react-dom/server` through Vite in development mode, with `console.error` captured: the real list produced no warnings, while a control list without `key` produced the expected "unique key prop" message. The temporary check file was deleted afterwards.
- Changed or rejected:
  The check was not added to the repository; it was only used to verify this stage.
## What I learned / what did not work
Props are read-only input for a component: `WorkflowCard` shows whatever it receives and never touches the array, which makes it reusable.
`key` goes on the element returned directly from `map`, and its value must be the id, not the index, so that deletions in Stage 5 do not confuse React.
An early `return` for the empty list keeps the component short and avoids nesting the whole markup inside a condition.
Replacing the array with `[]` in `App.jsx` shows the empty message and a counter of zero, with no other code change.
