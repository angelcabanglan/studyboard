"use client";

import { useState } from "react";
import { Task } from "@/lib/data";

export default function TaskItem({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(task.done);

  return (
    <div
      onClick={() => setCompleted(!completed)}
      className="flex items-center gap-3 p-3.5 bg-gray-900/80 border border-gray-700/80 hover:border-gray-500 rounded-lg cursor-pointer transition-all duration-200 select-none shadow-sm hover:shadow-md"
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
        className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
      />
      <span
        className={`text-sm font-medium transition-all duration-200 ${
          completed
            ? "line-through text-gray-400"
            : "text-white"
        }`}
      >
        {task.title}
      </span>
    </div>
  );
}