// The fixed trigger values and their display data, in one place.
// The values are the ones stored in db.json; labels, icons and descriptions are only for display.
export const TRIGGERS = [
  {
    value: "webhook",
    label: "Webhook",
    icon: "↗",
    description: "Runs when an incoming request is received.",
  },
  {
    value: "schedule",
    label: "Schedule",
    icon: "◷",
    description: "Runs automatically at a set time.",
  },
  {
    value: "manual",
    label: "Manual",
    icon: "↻",
    description: "Runs only when started by hand.",
  },
];

// { webhook: { label, icon, description }, ... } for looking up a stored value
export const TRIGGER_LABELS = Object.fromEntries(
  TRIGGERS.map((t) => [t.value, t])
);
