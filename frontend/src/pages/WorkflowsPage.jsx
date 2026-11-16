import { useEffect, useState } from "react";
import WorkflowList from "../components/WorkflowList.jsx";
import WorkflowForm from "../components/WorkflowForm.jsx";
import {
  createWorkflow,
  deleteWorkflow,
  fetchWorkflows,
  updateWorkflow,
} from "../api.js";
import styles from "./WorkflowsPage.module.css";

// Main page: the create form and the list (the Stage 7 App, moved unchanged)
export default function WorkflowsPage() {
  // The data comes from the API, so the list starts empty
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Derived value: recalculated on every render
  const active = workflows.filter((workflow) => workflow.active).length;

  return (
    <div className={styles.grid}>
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
      <section className="panel">
        <div className={`section-header ${styles.heading}`}>
          <div>
            <p className="section-label">WORKFLOWS</p>
            <h2>Your workflows</h2>
          </div>
          {/* The counter moved here from the header, which is now shared by every page */}
          <span className={styles.summary}>
            {workflows.length} workflows, {active} of them active
          </span>
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
    </div>
  );
}
