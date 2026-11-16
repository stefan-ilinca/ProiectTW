import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchWorkflow } from "../api.js";
import { TRIGGER_LABELS } from "../constants.js";
import styles from "./WorkflowDetailPage.module.css";

// Creation date in a readable form; older items may not have one
function formatDate(value) {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// One workflow, loaded from the server by the id in the address
export default function WorkflowDetailPage() {
  const { id } = useParams(); // text from the URL, e.g. "3"
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs again whenever the id in the address changes
  useEffect(() => {
    let ignore = false;

    fetchWorkflow(id)
      .then((data) => {
        if (!ignore) {
          setWorkflow(data);
          setError(null); // an error from a previous id no longer applies
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading workflow...
      </p>
    );
  }

  if (error) {
    return (
      <section className={`panel ${styles.detail}`}>
        <p className="error" role="alert" data-testid="error">
          The workflow could not be loaded: {error}
        </p>
        <Link to="/" className={styles.back}>
          ← Back to workflows
        </Link>
      </section>
    );
  }

  const trigger = TRIGGER_LABELS[workflow.trigger];

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Back to workflows
      </Link>
      <div className="section-header">
        <p className="section-label">WORKFLOW #{workflow.id}</p>
        <h2
          className={workflow.active ? undefined : styles.inactive}
          data-testid="detail-title"
        >
          {workflow.title}
        </h2>
      </div>
      <dl className={styles.fields}>
        <dt>Trigger</dt>
        <dd>
          <span className={`badge badge-${workflow.trigger}`}>
            {trigger.icon} {trigger.label}
          </span>
          <p className={styles.note}>{trigger.description}</p>
        </dd>
        <dt>Status</dt>
        <dd>{workflow.active ? "Active" : "Inactive"}</dd>
        <dt>Created</dt>
        <dd>{formatDate(workflow.createdAt)}</dd>
        <dt>ID</dt>
        <dd>{workflow.id}</dd>
      </dl>
    </section>
  );
}
