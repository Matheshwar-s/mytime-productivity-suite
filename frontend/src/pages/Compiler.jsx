import { useState, useEffect } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";

export default function Compiler() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [files, setFiles] = useState(() => JSON.parse(localStorage.getItem("mytime_code_files")) || {});

  const languageMap = {
    javascript: javascript(),
    python: python(),
    java: java(),
  };

  const languageIDs = {
    javascript: 63,
    python: 71,
    java: 62,
  };

  useEffect(() => {
    localStorage.setItem("mytime_code_files", JSON.stringify(files));
  }, [files]);

  const runCode = async () => {
    const payload = {
      source_code: code,
      language_id: languageIDs[language],
    };

    try {
      const { data } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "85628992d5msh3d7f56f229d31cep1755b2jsn174433643595", // 🔐 Replace with your actual key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      setOutput(data.stdout || data.stderr || data.compile_output || "No Output");
      localStorage.setItem("mytime_last_output", data.stdout);
    } catch (error) {
      console.error("Compilation error:", error);
      setOutput("❌ Error running code.");
    }
  };

  const saveFile = () => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;
    const key = `${language}_${fileName}`;
    const updatedFiles = { ...files, [key]: code };
    setFiles(updatedFiles);
  };

  const loadFile = (key) => {
    setCode(files[key]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🧑‍💻 Code Compiler</h1>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode("");
        }}
        className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="400px"
        theme={oneDark}
        extensions={[languageMap[language]]}
        onChange={(value) => setCode(value)}
        className="rounded border dark:border-gray-600"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={runCode}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          ▶ Run
        </button>
        <button
          onClick={saveFile}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          💾 Save File
        </button>
      </div>

      {/* Output Area */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">🧪 Output:</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-white">{output}</pre>
      </div>

      {/* Saved Files */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">📂 Saved Files ({language})</h2>
        <ul className="space-y-1">
          {Object.keys(files)
            .filter((key) => key.startsWith(language))
            .map((key) => (
              <li
                key={key}
                className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => loadFile(key)}
              >
                {key.replace(`${language}_`, "")}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
