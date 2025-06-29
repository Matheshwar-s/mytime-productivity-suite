import StreakTracker from "../components/StreakTracker";
import { useState, useEffect } from "react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

export default function SuperDashboard() {
  const [tasks, setTasks] = useState({});
  const [todayKey, setTodayKey] = useState(new Date().toDateString());
  const [compilerOutput, setCompilerOutput] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("mytime_tasks")) || {};
    const savedCompiler = localStorage.getItem("mytime_last_output") || "No runs yet";
    setTasks(savedTasks);
    setCompilerOutput(savedCompiler);
  }, []);

  const todayTasks = tasks[todayKey] || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🧠 Super Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">📌 Today’s Tasks</h2>
          <p className="text-gray-600 dark:text-gray-300">{todayTasks.length} task(s)</p>
          <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-200">
            {todayTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
            {todayTasks.length === 0 && <p>No tasks for today.</p>}
          </ul>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">🧪 Last Code Run</h2>
          <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm text-gray-800 dark:text-gray-100 overflow-auto max-h-48">
            {compilerOutput}
          </pre>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">📅 Streak Tracker</h2>
          <StreakTracker />
        </div>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
