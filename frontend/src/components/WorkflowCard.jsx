import { Link } from "react-router-dom";
import { TRIGGER_LABELS } from "../constants.js";
import styles from "./WorkflowCard.module.css";

// A single workflow from the list, received through props.
// The card does not change the data: it only reports the click
// through onToggle and onDelete, received from the page.
export default function WorkflowCard({ workflow, onToggle, onDelete }) {
  const trigger = TRIGGER_LABELS[workflow.trigger];

  return (
    <li
      className={workflow.active ? styles.card : `${styles.card} ${styles.done}`}
      data-testid="item"
      data-id={workflow.id}
    >
      {/* A div, not a label: the title is now a link to the detail page */}
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={workflow.active}
          onChange={() => onToggle(workflow.id)}
          aria-label={`Active: ${workflow.title}`}
          data-testid="item-toggle"
        />
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>{trigger.icon}</span>
            <div>
              <Link
                to={`/workflows/${workflow.id}`}
                className={styles.title}
                data-testid="item-link"
              >
                {workflow.title}
              </Link>
              <p className={styles.description}>{trigger.description}</p>
            </div>
          </div>
          <div className={styles.meta}>
            <span className={`badge badge-${workflow.trigger}`}>
              {trigger.label}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div
          className={
            workflow.active ? `${styles.status} ${styles.on}` : styles.status
          }
        >
          {workflow.active && <span className={styles.dot}></span>}
          <span>{workflow.active ? "Active" : "Inactive"}</span>
        </div>
        <button
          className="btn-danger"
          onClick={() => onDelete(workflow.id)}
          aria-label={`Delete ${workflow.title}`}
          data-testid="item-delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
