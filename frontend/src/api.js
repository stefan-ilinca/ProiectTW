// All HTTP requests live here; components never call fetch directly.
// The address comes from the environment, with the local json-server as fallback.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Shared helper: sends JSON and throws if the response is not 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  // fetch only rejects when the server cannot be reached, so 404 / 500 are checked here
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  // 204 No Content has no body
  return res.status === 204 ? null : res.json();
}

export function fetchWorkflows() {
  return request("/workflows");
}

export function createWorkflow(workflow) {
  return request("/workflows", {
    method: "POST",
    body: JSON.stringify(workflow),
  });
}

export function updateWorkflow(id, changes) {
  return request(`/workflows/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteWorkflow(id) {
  return request(`/workflows/${id}`, { method: "DELETE" });
}
