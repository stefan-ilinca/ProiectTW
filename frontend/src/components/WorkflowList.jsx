import WorkflowCard from "./WorkflowCard.jsx";

// The whole list and the two actions, received through props
// and passed on to every card unchanged.
export default function WorkflowList({ workflows, onToggle, onDelete }) {
  if (workflows.length === 0) {
    return <p className="empty">No workflows available.</p>;
  }

  return (
    <ul className="item-list">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
