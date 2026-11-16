# Stage 7: AI log
## Tools
- Claude Code
## Key requests
### 1. Create form with validation
- Asked:
  I asked to follow the Stage 7 guide and add a create form for workflows, using the form from the Stage 1 mockup (workflow name and trigger).
- Got:
  `WorkflowForm`, a controlled form with `title` and `trigger` in state, `noValidate`, and a `validate` function that rejects an empty name, a name over 100 characters and a trigger that is not one of the three fixed values. The error shows under the fields and the name input gets `aria-invalid`. The submit button is disabled and reads "Saving..." while the request runs; the fields are cleared only after `await onAdd(...)` succeeds.
- Changed or rejected:
  The guide's `TaskForm` with a priority select became `WorkflowForm` with a trigger select, reusing the mockup's `item-form` styles and texts ("Create workflow"). The trigger check was added as the theme-specific validation, next to the length limit.
### 2. Saving every change on the server
- Asked:
  I asked to move add, toggle and delete to the API.
- Got:
  A shared `request` helper in `api.js` and `createWorkflow`, `updateWorkflow` and `deleteWorkflow` on top of it. `handleAdd` has no `try`, so the error returns to the form; `handleToggle` sends `PATCH { active }` and puts the server's object in the list; `handleDelete` removes the item only after the DELETE succeeds. The list is now shown with `!loading` only, so a failed toggle shows the error above a list that stays visible.
- Changed or rejected:
  The guide sends `gata: false` for new items; here new workflows are sent with `active: false`, so they start inactive until switched on.
### 3. Markers for the automated check
- Asked:
  I asked which `data-testid` attributes and which `tw.json` values the checker needs for FlowForge.
- Got:
  `tw.json` with `resource: "workflows"`, `title: "title"`, `done: "active"` and `sample: { "trigger": "schedule" }`, so the second field is `form-trigger`. The card has `item` with `data-id`, `item-title`, `item-toggle` and `item-delete`; the empty message has `empty`; the page messages have `loading` and `error`.
- Changed or rejected:
  Nothing rejected.
### 4. Testing in a browser
- Asked:
  I asked to check the steps from the guide: empty submit, add, toggle, delete, refresh and a stopped API.
- Got:
  A temporary script drove Chrome against a copy of `db.json`: the empty submit sent no request, the new workflow came back from the server with id 6 and stayed after refresh, toggling and deleting stayed after refresh, and with the API stopped the typed name was kept and the error appeared.
- Changed or rejected:
  The first run went to my own `npm run api` on port 3001 instead of the copy, so it changed my real `db.json`; the change was undone and the test was repeated on separate ports. The script and its browser library were not added to the repository.
## What I learned / what did not work
A field with `value` but no `onChange` cannot be typed into, and without `e.preventDefault()` the submit reloads the page.
The id of a new workflow comes from the server, so the list must be updated with the response, not with what was sent.
Clearing the form inside `finally` would also erase the text after a failed save.
If `handleAdd` caught the error itself, the form would never know the save failed.
