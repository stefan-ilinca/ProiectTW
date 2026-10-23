import WorkflowList from "./components/WorkflowList.jsx";

const workflows = [
  { id: 1, title: "Lead Qualification", active: true, trigger: "webhook" },
  { id: 2, title: "Daily Sales Report", active: true, trigger: "schedule" },
  { id: 3, title: "Customer Data Sync", active: false, trigger: "manual" },
];

export default function App() {
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
          <WorkflowList workflows={workflows} />
        </section>
      </main>
      <footer className="app-footer">
        <p>FlowForge · Web Technologies Project · 2026</p>
      </footer>
    </>
  );
}
