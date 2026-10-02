# Stage 1: AI log
## Tools
- ChatGPT
## Key requests
### 1. Data model
- Asked:
  I asked how FlowForge could be adapted to the required list-based data model.
- Got:
  A workflow model containing a name, active state, trigger, category and owner.
- Changed or rejected:
  The workflow trigger was limited to three fixed values:
  Webhook, Schedule and Manual.
### 2. HTML and CSS structure
- Asked:
  I asked for a Stage 1 HTML and CSS structure based on the university guide.
- Got:
  Suggestions for a two-column layout using CSS Grid, workflow cards using
  Flexbox, responsive design, visible keyboard focus and dark mode.
- Changed or rejected:
  The interface was customized visually for FlowForge instead of copying
  the TaskFlow example.
## What I learned / what did not work
I learned how CSS Grid can be used for the main two-column layout while
Flexbox is useful inside forms and cards.
I also learned how CSS variables make it possible to implement a dark theme
without duplicating all CSS rules.
The interface becomes a single column below 700px through a media query.
I also learned why visible focus states are important for keyboard accessibility.