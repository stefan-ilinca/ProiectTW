import { useState } from "react";
import WorkflowList from "./components/WorkflowList.jsx";

// Sample data from README, used only as the starting value of the state
const INITIAL_WORKFLOWS = [
  { id: 1, title: "Lead Qualification", active: true, trigger: "webhook" },
  { id: 2, title: "Daily Sales Report", active: true, trigger: "schedule" },
  { id: 3, title: "Customer Data Sync", active: false, trigger: "manual" },
];

// Starting theme: the one set in the operating system
function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [workflows, setWorkflows] = useState(INITIAL_WORKFLOWS);
  const [theme, setTheme] = useState(initialTheme);

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
          <WorkflowList
            workflows={workflows}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
      <footer className="app-footer">
        <p>FlowForge · Web Technologies Project · 2026</p>
      </footer>
    </>
  );
}
