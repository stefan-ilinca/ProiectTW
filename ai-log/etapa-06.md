# Stage 6: AI log
## Tools
- Claude Code
## Key requests
### 1. Moving the data to json-server
- Asked:
  I asked to follow the Stage 6 guide: move the workflows out of `App.jsx` into `frontend/db.json`, add two more so there are at least five, and start a mock API with json-server.
- Got:
  `db.json` with a `workflows` key (route `/workflows`) holding the three sample workflows and two new ones, Weekly Invoice Reminder (schedule, active) and Support Ticket Escalation (webhook, inactive), so every trigger and both states appear. An `api` script runs `json-server --watch db.json --port 3001`.
- Changed or rejected:
  The guide's `tasks` / `fetchTasks` became `workflows` / `fetchWorkflows`. json-server is pinned to exactly `0.17.4` in `package.json` instead of `^0.17.4`, so a reinstall cannot pick another version.
### 2. Loading with useEffect
- Asked:
  I asked how to load the list once on mount and keep all requests in one file.
- Got:
  `src/api.js` with `API_URL` from `import.meta.env.VITE_API_URL ?? "http://localhost:3001"` and `fetchWorkflows`, which checks `res.ok`; `.env.example` documents the variable. In `App`, the list starts as `[]`, and a `useEffect` with `[]` calls an inner async `load` with `try` / `catch` / `finally` and an `ignore` flag set in the cleanup.
- Changed or rejected:
  Nothing rejected. The `INITIAL_WORKFLOWS` array was removed from `App.jsx`.
### 3. Loading and error messages
- Asked:
  I asked for the three states to fit the existing panel and both themes.
- Got:
  "Loading workflows..." styled like the empty-list message, and an error box with `role="alert"` that names the error and suggests `npm run api`. The new `--error-bg` and `--error-border` variables use the FlowForge accent tones and are redefined in both dark theme blocks.
- Changed or rejected:
  The guide's pink colors were replaced with values matching the FlowForge palette.
## What I learned / what did not work
`fetch` rejects only when the server cannot be reached; a 404 or 500 still resolves, so `res.ok` has to be checked by hand.
The function given to `useEffect` cannot be `async` itself, so the request goes in an inner function.
In development React mounts the component twice, so the Network tab shows two requests to `/workflows`; the `ignore` flag keeps the first one from setting state.
Toggling and deleting still change only the local state, so the changes come back on refresh.
