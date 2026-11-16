import { Link } from "react-router-dom";

// Any address that matches no other route ends up here
export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <div className="section-header">
        <p className="section-label">404</p>
        <h2>Page not found</h2>
      </div>
      <p className="info">The requested address does not lead anywhere.</p>
      <Link to="/">Back to workflows</Link>
    </section>
  );
}
