import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function AnalyticsDashboard() {
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mytime_tasks")) || {};
    setTaskData(saved);
  }, []);

  const getDailyCounts = () => {
    const keys = Object.keys(taskData);
    const counts = keys.map((date) => taskData[date]?.length || 0);
    return {
      labels: keys,
      datasets: [
        {
          label: "Tasks per Day",
          data: counts,
          backgroundColor: "#60a5fa",
        },
      ],
    };
  };

  const getTaskTypeBreakdown = () => {
    const allTasks = Object.values(taskData).flat();
    const categories = {
      "Code": 0,
      "Review": 0,
      "Meeting": 0,
      "Other": 0,
    };
    allTasks.forEach(task => {
      if (task.toLowerCase().includes("code")) categories["Code"]++;
      else if (task.toLowerCase().includes("review")) categories["Review"]++;
      else if (task.toLowerCase().includes("meeting")) categories["Meeting"]++;
      else categories["Other"]++;
    });
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Task Types",
          data: Object.values(categories),
          backgroundColor: ["#4ade80", "#facc15", "#38bdf8", "#a78bfa"],
        },
      ],
    };
  };

  return (
    <div className="space-y-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📊 Analytics & Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">📅 Task Frequency</h3>
          <Bar data={getDailyCounts()} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">🧩 Task Category Breakdown</h3>
          <Doughnut data={getTaskTypeBreakdown()} />
        </div>
      </div>
    </div>
  );
}
