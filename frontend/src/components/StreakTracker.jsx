import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, subDays, format } from "date-fns";

export default function StreakTracker() {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    // Fetch from localStorage or default
    const saved = JSON.parse(localStorage.getItem("mytime_streak")) || [];
    setStreakData(saved);
  }, []);

  const recordToday = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    if (!streakData.find(d => d.date === today)) {
      const updated = [...streakData, { date: today, count: 1 }];
      setStreakData(updated);
      localStorage.setItem("mytime_streak", JSON.stringify(updated));
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          🟩 Coding Streak Tracker
        </h2>
        <button
          onClick={recordToday}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          Log Today
        </button>
      </div>
      <CalendarHeatmap
        startDate={subDays(new Date(), 150)}
        endDate={new Date()}
        values={streakData}
        classForValue={value => {
          if (!value) return "color-empty";
          if (value.count >= 3) return "color-gitlab-4";
          if (value.count === 2) return "color-gitlab-3";
          return "color-gitlab-2";
        }}
        showWeekdayLabels
      />
    </div>
  );
}
