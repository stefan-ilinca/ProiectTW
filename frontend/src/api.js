// All HTTP requests live here; components never call fetch directly.
// The address comes from the environment, with the local json-server as fallback.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchWorkflows() {
  const res = await fetch(`${API_URL}/workflows`);
  // fetch only rejects when the server cannot be reached, so 404 / 500 are checked here
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}
