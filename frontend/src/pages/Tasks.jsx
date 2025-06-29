import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Tasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");

  const dateKey = selectedDate.toDateString();

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = {
      ...tasks,
      [dateKey]: [...(tasks[dateKey] || []), newTask],
    };
    setTasks(updatedTasks);
    setNewTask("");
  };

  const deleteTask = (taskIndex) => {
    const updated = [...tasks[dateKey]];
    updated.splice(taskIndex, 1);
    setTasks({ ...tasks, [dateKey]: updated });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          🗓️ Select a Date
        </h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="!border-none"
        />
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          📌 Tasks for {dateKey}
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            placeholder="New task"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {(tasks[dateKey] || []).map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded"
            >
              <span className="text-gray-800 dark:text-white">{task}</span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
          {(tasks[dateKey] || []).length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tasks yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
