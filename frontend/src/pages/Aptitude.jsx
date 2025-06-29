import { useState } from "react";

const questions = [
  {
    question: "If a train runs 100 km in 2 hours, what is its average speed?",
    options: ["50 km/h", "60 km/h", "100 km/h", "25 km/h"],
    answer: "50 km/h",
  },
  {
    question: "What is the next number in the series? 2, 4, 8, 16, __",
    options: ["18", "24", "32", "20"],
    answer: "32",
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
];

export default function Aptitude() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const checkAnswer = () => {
    if (selected === questions[index].answer) {
      setScore(score + 1);
    }
    if (index + 1 === questions.length) {
      setShowResult(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🧠 Aptitude Practice</h2>

      {!showResult ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{questions[index].question}</h3>
          <ul className="space-y-2">
            {questions[index].options.map((option) => (
              <li
                key={option}
                onClick={() => setSelected(option)}
                className={`p-2 rounded cursor-pointer border ${
                  selected === option
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={checkAnswer}
            disabled={selected === null}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {index + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">🎉 Your Score: {score}/{questions.length}</h3>
          <button
            onClick={resetQuiz}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
