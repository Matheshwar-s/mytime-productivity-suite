import { useState, useEffect } from "react";

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem("mytime_calendar_events")) || {});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    localStorage.setItem("mytime_calendar_events", JSON.stringify(events));
  }, [events]);

  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Empty cells
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const monthDays = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const addEvent = () => {
    if (!selectedDate || !newEvent.trim()) return;
    const key = selectedDate.toISOString().split("T")[0];
    const updated = {
      ...events,
      [key]: [...(events[key] || []), newEvent],
    };
    setEvents(updated);
    setNewEvent("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          📆 {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            ⬅ Prev
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Next ➡
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-800 dark:text-white font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((date, index) => {
          const key = date?.toISOString().split("T")[0];
          return (
            <div
              key={index}
              onClick={() => date && setSelectedDate(date)}
              className={`h-24 p-2 rounded-lg border cursor-pointer transition ${
                date
                  ? "bg-white dark:bg-gray-800 hover:ring-2 ring-blue-500"
                  : "bg-transparent cursor-default"
              }`}
            >
              {date && (
                <>
                  <div className="text-sm font-semibold">{date.getDate()}</div>
                  <ul className="text-xs mt-1 overflow-y-auto max-h-16 text-gray-600 dark:text-gray-300">
                    {(events[key] || []).slice(0, 2).map((e, i) => (
                      <li key={i} className="truncate">• {e}</li>
                    ))}
                    {(events[key]?.length || 0) > 2 && <li className="text-blue-500">+ more</li>}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Event Add/Edit Modal */}
      {selectedDate && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-4">
          <h3 className="text-lg font-semibold dark:text-white">
            📌 Events on {selectedDate.toISOString().split("T")[0]}
          </h3>

          <ul className="list-disc list-inside text-gray-800 dark:text-white space-y-1">
            {(events[selectedDate.toISOString().split("T")[0]] || []).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>

          <div className="flex gap-2">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Add event"
              className="flex-1 px-3 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              onClick={addEvent}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
