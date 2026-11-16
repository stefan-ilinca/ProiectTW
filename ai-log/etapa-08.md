# Stage 8: AI log
## Tools
- Claude Code
## Key requests
### 1. Pages and routes
- Asked:
  I asked to follow the Stage 8 guide: split the app into pages with React Router, keep FlowForge names in English, and use the resource name from `tw.json` for the detail route.
- Got:
  `BrowserRouter` in `main.jsx`, a route map in `App.jsx` with `/`, `/workflows/:id`, `/about` and `*` inside a `Layout` route, and the Stage 7 `App` moved unchanged into `pages/WorkflowsPage.jsx`. `Layout` has the header with two `NavLink`s ("Workflows" with `end`, "About"), the footer and `<Outlet />`.
- Changed or rejected:
  The guide's Romanian names (`TaskuriPage`, `/despre`) became `WorkflowsPage`, `WorkflowDetailPage`, `AboutPage` and `/about`. The theme button from Stage 5 moved into `Layout` with its state, since the header is now shared; the header counter moved into the list panel.
### 2. The detail page
- Asked:
  The guide says the detail page should show more than the card, but FlowForge workflows only had a title, a trigger and a status, so I asked what could be added.
- Got:
  A `createdAt` date: the form now sends it with every new workflow, and the five sample workflows in `db.json` received fixed dates. The detail page shows the trigger with its icon and description, the status, the formatted creation date and the id, and handles a missing id with an error message and a link back. The effect depends on `[id]` and uses `.then` / `.catch` / `.finally` with the `ignore` flag.
- Changed or rejected:
  `setLoading(true)` at the start of the effect was left out, as the guide notes, because of the `react-hooks/set-state-in-effect` lint rule.
### 3. CSS Modules
- Asked:
  I asked to move the Stage 1 styles out of the single `App.css` without changing how the app looks.
- Got:
  `index.css` with only the variables (including both dark theme blocks), base elements, panels and section headings, messages, buttons and badges. `Layout`, `WorkflowCard`, `WorkflowList`, `WorkflowForm`, `WorkflowsPage` and `WorkflowDetailPage` each have a `.module.css`, with the responsive rules moved next to the component they change. The trigger data moved to `src/constants.js`.
- Changed or rejected:
  The guide's TaskFlow colors were not used; the FlowForge palette and the Stage 1 look were kept. The `item-title` attribute was replaced by `item-link`, as table 8.2 requires, and all other Stage 7 attributes stayed on the same elements.
### 4. Testing
- Asked:
  I asked to check the navigation steps from the guide and that Stage 7 still works.
- Got:
  A temporary script drove Chrome against a copy of `db.json` on separate ports: clicking a title opened `/workflows/1` with no HTML document request, Back returned to the list, `NavLink` marked only the current page, refresh on the detail URL worked, `/workflows/999` showed the error and `/ceva` the 404 page. The Stage 7 checks (validation, add, toggle, delete, API stopped) passed again, and screenshots of light, dark and phone widths matched the previous look.
- Changed or rejected:
  The script was not added to the repository.
## What I learned / what did not work
`<Link>` changes only the address and React draws the matching page; an `<a href>` would reload the whole document and lose the state.
Without `end`, the link to `/` would be marked active on every page, because every address starts with `/`.
`useParams` always returns text, so the id from the URL is a string even when the ids in `db.json` are numbers.
With CSS Modules, a class written as a plain string no longer matches anything; only the global classes in `index.css` can still be used that way.
