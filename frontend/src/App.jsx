import { useEffect, useState } from "react";
import WorkflowList from "./components/WorkflowList.jsx";
import WorkflowForm from "./components/WorkflowForm.jsx";
import {
  createWorkflow,
  deleteWorkflow,
  fetchWorkflows,
  updateWorkflow,
} from "./api.js";

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

  // Server first, then state: only what was saved reaches the screen.
  // No try here: the error goes back to the form, which shows it next to the fields.
  async function handleAdd(workflow) {
    const created = await createWorkflow(workflow); // the server returns it with an id
    setWorkflows((prev) => [...prev, created]);
  }

  async function handleToggle(id) {
    const workflow = workflows.find((w) => w.id === id);
    try {
      // PATCH sends only the changed field; the list gets the object returned by the server
      const updated = await updateWorkflow(id, { active: !workflow.active });
      setWorkflows((prev) => prev.map((w) => (w.id === id ? updated : w)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteWorkflow(id);
      setWorkflows((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      setError(err.message);
    }
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
        <section className="panel create-panel">
          <div className="section-header">
            <p className="section-label">AUTOMATION</p>
            <h2>Create workflow</h2>
            <p className="section-description">
              Create a new automation and choose how it will be triggered.
            </p>
          </div>
          <WorkflowForm onAdd={handleAdd} />
        </section>
        <section className="panel workflows-panel">
          <div className="section-header workflows-heading">
            <div>
              <p className="section-label">WORKFLOWS</p>
              <h2>Your workflows</h2>
            </div>
            <span className="workflow-total">{workflows.length} total</span>
          </div>
          {loading && (
            <p className="info" data-testid="loading">
              Loading workflows...
            </p>
          )}
          {error && (
            <p className="error" role="alert" data-testid="error">
              Request failed: {error}. Is <code>npm run api</code> running?
            </p>
          )}
          {/* No !error here: if a toggle fails, the list stays under the message */}
          {!loading && (
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
