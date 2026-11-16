// Short description of the application, taken from the README
export default function AboutPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <p className="section-label">ABOUT</p>
        <h2>About FlowForge</h2>
      </div>
      <p>
        FlowForge is a web application for creating and managing automated
        workflows. Each workflow starts from a trigger: an incoming webhook, a
        schedule, or a manual run.
      </p>
      <p>
        It is built step by step during the semester, as the Web Technologies
        project.
      </p>
      <p className="info">
        Stack: React, Vite, React Router, Node.js, Express, MariaDB, Docker.
      </p>
    </section>
  );
}
