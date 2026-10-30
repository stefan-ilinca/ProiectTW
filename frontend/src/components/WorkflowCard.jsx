// A single workflow from the list, received through props.
// Display labels are kept separate from the values stored in the data.
const TRIGGER_LABELS = {
  webhook: {
    label: "Webhook",
    icon: "↗",
    description: "Runs when an incoming request is received.",
  },
  schedule: {
    label: "Schedule",
    icon: "◷",
    description: "Runs automatically at a set time.",
  },
  manual: {
    label: "Manual",
    icon: "↻",
    description: "Runs only when started by hand.",
  },
};

// The card does not change the data: it only reports the click
// through onToggle and onDelete, received from App.
export default function WorkflowCard({ workflow, onToggle, onDelete }) {
  const trigger = TRIGGER_LABELS[workflow.trigger];

  return (
    <li className={workflow.active ? "item-card" : "item-card done"}>
      <label className="workflow-main">
        <input
          type="checkbox"
          checked={workflow.active}
          onChange={() => onToggle(workflow.id)}
        />
        <div className="workflow-info">
          <div className="workflow-title-row">
            <span className="workflow-icon">{trigger.icon}</span>
            <div>
              <h3>{workflow.title}</h3>
              <p className="workflow-description">{trigger.description}</p>
            </div>
          </div>
          <div className="workflow-meta">
            <span className={`badge badge-${workflow.trigger}`}>
              {trigger.label}
            </span>
          </div>
        </div>
      </label>
      <div className="workflow-actions">
        <div
          className={
            workflow.active ? "workflow-status active-status" : "workflow-status"
          }
        >
          {workflow.active && <span className="status-dot"></span>}
          <span className="status">
            {workflow.active ? "Active" : "Inactive"}
          </span>
        </div>
        <button
          className="btn-danger"
          onClick={() => onDelete(workflow.id)}
          aria-label={`Delete ${workflow.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
