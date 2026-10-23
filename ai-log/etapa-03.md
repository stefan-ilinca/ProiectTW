# Stage 3: AI log
## Tools
- Claude Code
## Key requests
### 1. Project setup with Vite
- Asked:
  I asked to follow the Stage 3 guide: move the mockup files, create a React project with Vite in `frontend/`, remove the demo files and keep the ESLint configuration.
- Got:
  The Stage 1 and 2 files moved to `mockup/`, a fresh Vite React project generated with `npm create vite@latest frontend -- --template react --eslint`, and the demo assets, icons and `index.css` removed.
- Changed or rejected:
  The non-interactive scaffold picks Oxlint by default, so the project was regenerated with the `--eslint` flag to match the guide.
### 2. Porting the header and the data to JSX
- Asked:
  I asked to rewrite `App.jsx` with the FlowForge header from the mockup and the workflow array from Stage 2, with the counter computed from data.
- Got:
  A component with the array declared above the function, `active` computed with `filter`, the header using `className`, and the list printed with `JSON.stringify` inside `pre`.
- Changed or rejected:
  The counter text follows the English wording of the app ("3 workflows, 2 of them active") instead of the Romanian example from the guide. The page language stays `en` because all the interface text is in English.
### 3. npm install failure
- Asked:
  `npm install` kept failing with `Cannot read properties of null (reading 'edgesOut')` and I asked what was wrong.
- Got:
  The error came from npm 10.8 bundled with Node 22.5, which cannot resolve the dependency tree of the current Vite template. Installing the latest Node 22 through nvm (22.23 with npm 10.9) fixed it.
- Changed or rejected:
  Nothing rejected; the fix is documented here because it is likely to show up on other machines with an older Node 22.
## What I learned / what did not work
I learned that `package.json` lists the dependencies and the scripts, while `node_modules/` is recreated by `npm install` and must stay out of Git.
JSX needs `className` instead of `class`, every tag has to be closed, and expressions go between braces, so the counter is written as `{workflows.length}`.
Code above the component runs once, while the body of `App` runs on every render, which is why the fixed array belongs above the function.
`npm run build` is the quick way to confirm that the project compiles without errors before committing.
