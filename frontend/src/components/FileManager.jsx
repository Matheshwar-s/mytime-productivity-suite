import { useState } from "react";

export default function FileManager({ files, activeFile, setActiveFile, setFiles }) {
  const [newFileName, setNewFileName] = useState("");

  const createFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    if (files[name]) return alert("File already exists!");
    const updated = { ...files, [name]: "" };
    setFiles(updated);
    setActiveFile(name);
    setNewFileName("");
  };

  const deleteFile = (file) => {
    const { [file]: _, ...rest } = files;
    setFiles(rest);
    if (file === activeFile) setActiveFile(Object.keys(rest)[0] || "");
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="New File"
          className="flex-1 px-3 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button onClick={createFile} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </div>
      <ul className="space-y-2 max-h-48 overflow-auto">
        {Object.keys(files).map((file) => (
          <li
            key={file}
            className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
              file === activeFile ? "bg-blue-100 dark:bg-blue-900" : "bg-white dark:bg-gray-700"
            }`}
            onClick={() => setActiveFile(file)}
          >
            <span className="text-sm text-gray-800 dark:text-white">{file}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file);
              }}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
