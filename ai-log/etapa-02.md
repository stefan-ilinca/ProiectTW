# Stage 2: AI log
## Tools
- ChatGPT
## Key requests
### 1. JavaScript data model
- Asked:
  I asked how to move the static workflow sample data from HTML into a JavaScript array while keeping logic separate from the interface.
- Got:
  A list of workflow objects with `id`, `title`, `active`, and `trigger`, plus a constant for the allowed trigger values.
- Changed or rejected:
  The names and values were adapted to the FlowForge project instead of the generic TaskFlow example.
### 2. Immutable functions
- Asked:
  I asked for list, count, search, add, toggle and delete functions using array methods without mutating the input list.
- Got:
  A set of pure functions built with `map`, `filter`, `find`, `reduce`, and the spread syntax.
- Changed or rejected:
  The validation rules were aligned with the actual FlowForge workflow model, and the console messages were written in English to match the app.
### 3. Console testing structure
- Asked:
  I asked for a clear set of console sections to group all the test results.
- Got:
  A read section, an add section, an update/delete section, and a final validation section.
- Changed or rejected:
  The examples were adjusted to the FlowForge workflow names and not the generic TaskFlow labels.
## What I learned / what did not work
I learned that using `map` and `filter` makes it easy to keep the original array intact while still creating new arrays for updates.
I also learned that `nextId` must use the highest existing ID plus one, not `list.length + 1`, because deletions can otherwise create duplicate IDs.
The JavaScript layer must stay separate from the UI, so it can be tested in the browser console without touching the HTML or CSS.
