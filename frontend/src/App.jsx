import { useEffect, useState } from "react";
import WorkflowList from "./components/WorkflowList.jsx";
import { fetchWorkflows } from "./api.js";

// Starting theme: the one set in the operating system
function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  // The data comes from the API, so the list starts empty
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(initialTheme);

  // Runs once, after the first render
  useEffect(() => {
    let ignore = false; // no state updates if the component is gone in the meantime

    async function load() {
      try {
        const data = await fetchWorkflows();
        if (!ignore) setWorkflows(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Changes stay local in Stage 6 and are lost on refresh (saved to the API in Stage 7)
  // Immutable updates: a new array, and a new object for the changed workflow
  function handleToggle(id) {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  }

  function handleDelete(id) {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  }

  // Theme switch: state for the button, data-theme attribute for the CSS
  function handleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  // Derived value: recalculated on every render
  const active = workflows.filter((workflow) => workflow.active).length;

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">F</span>
            <h1>FlowForge</h1>
          </div>
          <p className="app-description">
            Build and manage automated workflows from one place.
          </p>
          <p className="app-count">
            {workflows.length} workflows, {active} of them active
          </p>
          <button
            className="theme-toggle"
            onClick={handleTheme}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </header>
      <main className="container">
        <section className="panel workflows-panel">
          <div className="section-header workflows-heading">
            <div>
              <p className="section-label">WORKFLOWS</p>
              <h2>Your workflows</h2>
            </div>
            <span className="workflow-total">{workflows.length} total</span>
          </div>
          {loading && <p className="info">Loading workflows...</p>}
          {error && (
            <p className="error" role="alert">
              Could not load the workflows: {error}. Is <code>npm run api</code>{" "}
              running?
            </p>
          )}
          {!loading && !error && (
            <WorkflowList
              workflows={workflows}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
      <footer className="app-footer">
        <p>FlowForge · Web Technologies Project · 2026</p>
      </footer>
    </>
  );
}
