import WorkflowCard from "./WorkflowCard.jsx";

// The whole list, received through props: one card per workflow.
export default function WorkflowList({ workflows }) {
  if (workflows.length === 0) {
    return <p className="empty">No workflows available.</p>;
  }

  return (
    <ul className="item-list">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </ul>
  );
}
