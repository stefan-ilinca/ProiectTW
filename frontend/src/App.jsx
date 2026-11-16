import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import WorkflowsPage from "./pages/WorkflowsPage.jsx";
import WorkflowDetailPage from "./pages/WorkflowDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Route map. Layout wraps every page; the detail route uses the resource name from tw.json.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WorkflowsPage />} />
        <Route path="/workflows/:id" element={<WorkflowDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
