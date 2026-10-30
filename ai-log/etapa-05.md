# Stage 5: AI log
## Tools
- Claude Code
## Key requests
### 1. Moving the list into state
- Asked:
  I asked to follow the Stage 5 guide and turn the fixed array from Stage 4 into state in `App`, with a checkbox and a delete button on every card, keeping the FlowForge data and names.
- Got:
  `INITIAL_WORKFLOWS` as the starting value of `useState`, and two handlers in `App` that reuse the immutable logic from Stage 2: `map` with `{ ...w, active: !w.active }` for toggling and `filter` for deleting, both with the function form `setWorkflows((prev) => ...)`. `WorkflowList` passes `onToggle` and `onDelete` down, and `WorkflowCard` calls them with the workflow id.
- Changed or rejected:
  The guide's `gata` field became `active`, so a checked box means an active workflow, the same as the status already shown on the card. The header counter stays a derived value, as in Stage 3.
### 2. Placing the theme button
- Asked:
  The guide places the theme button absolutely in the corner of the header, but the FlowForge header is a grid with the counter on the right, so I asked whether the button would overlap it.
- Got:
  On screens between roughly 700px and 1150px the absolute button would sit on top of the counter, so the button was added as a fourth column of the existing header grid instead; under 700px it moves next to the logo and the counter drops to its own row.
- Changed or rejected:
  The absolute positioning from the guide was not used. The behaviour is the same: state for the button text and `aria-pressed`, `data-theme` written on `<html>` in the click handler.
### 3. Dark theme only through variables
- Asked:
  The Stage 1 dark theme also changed `.app-header` directly, outside the variables, and I asked how to keep the theme switch variable-only.
- Got:
  A new `--header-bg` variable used by the header, so the system block (`:root:not([data-theme="light"])` inside the media query) and the explicit `:root[data-theme="dark"]` block only redefine variables.
- Changed or rejected:
  Nothing rejected.
### 4. Checking clicks and warnings without a browser
- Asked:
  I asked how to confirm that toggling, deleting and the theme button work and that the console stays clean.
- Got:
  A temporary script rendered `App` in a simulated DOM (jsdom, installed outside the project) and clicked the checkboxes, the theme button and every Delete button: the counter went 2 → 1 → 2 active, the theme went light → dark → light, the empty message appeared after the last delete, and no warnings were printed.
- Changed or rejected:
  The script and jsdom were not added to the repository; `npm run lint` and `npm run build` also pass.
## What I learned / what did not work
State is changed only by calling the setter with a new array; changing an object in place would not re-render, because React compares references.
The child components do not know how the data changes: they only report what the user did through the functions received in props.
`checked` without `onChange` makes the checkbox read-only, and `onClick={onDelete(id)}` would delete every workflow during the first render.
`useState(initialTheme)` takes the function itself, so the system theme is read only once.
Like the list, the theme choice is lost on refresh.
