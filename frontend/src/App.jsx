import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Compiler from "./pages/Compiler";
import CalendarPage from "./pages/CalendarPage";
import Aptitude from "./pages/Aptitude";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
