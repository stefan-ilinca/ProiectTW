import { useState } from "react";
import { TRIGGERS } from "../constants.js";
import styles from "./WorkflowForm.module.css";

const TITLE_MAX = 100;

// Controlled form: React state is the source of truth for every field.
// The form only validates and reports the data through onAdd; it never calls fetch.
export default function WorkflowForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [trigger, setTrigger] = useState("webhook");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Returns the error message, or an empty string when the data is valid
  function validate() {
    const t = title.trim();
    if (t === "") return "The workflow name is required.";
    if (t.length > TITLE_MAX) {
      return `The workflow name can have at most ${TITLE_MAX} characters.`;
    }
    if (!TRIGGERS.some((option) => option.value === trigger)) {
      return "Choose one of the available triggers.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stops the page reload
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // New workflows start inactive until they are switched on from the list
      await onAdd({
        title: title.trim(),
        trigger,
        active: false,
        createdAt: new Date().toISOString(),
      });
      // Cleared only after the server confirmed the save
      setTitle("");
      setTrigger("webhook");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-testid="form"
    >
      <label>
        Workflow name
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Lead qualification"
          maxLength={TITLE_MAX}
          aria-invalid={Boolean(error)}
          data-testid="form-title"
        />
      </label>
      <label>
        Trigger
        <select
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          data-testid="form-trigger"
        >
          {TRIGGERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p className="error" role="alert" data-testid="form-error">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="btn"
        disabled={submitting}
        data-testid="form-submit"
      >
        {submitting ? "Saving..." : "Create workflow"}
      </button>
    </form>
  );
}
