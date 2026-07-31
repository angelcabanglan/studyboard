"use client";

import { useState } from "react";
import { Task } from "@/lib/data";

export default function TaskItem({ task }: { task: Task }) {
  const [done, setDone] = useState(task.done);

  return (
    <li className="flex items-center gap-3 rounded-md border px-3 py-2">
      <input
        type="checkbox"
        checked={done}
        onChange={() => setDone(!done)}
        className="h-4 w-4"
      />

      <span className={done ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>
    </li>
  );
}
