import { getGroupById, getTasksByGroupId } from "@/lib/data";
import TaskItem from "@/components/TaskItem";

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const group = getGroupById(resolvedParams.id);
  const tasks = getTasksByGroupId(resolvedParams.id);

  if (!group) {
    return (
      <div className="p-8 text-center text-red-400 max-w-xl mx-auto font-sans">
        Group not found.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-6 font-sans text-white">
      {/* Category Header */}
      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
        STUDYBOARD / GROUPS
      </p>

      {/* Group Info Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          {group.name}
        </h1>
        <h2 className="text-base font-semibold text-gray-300">
          {group.subject}
        </h2>
        <p className="text-sm text-gray-400 font-medium">
          {group.memberCount} members
        </p>
      </div>

      {/* Checklist Tasks */}
      <div className="space-y-3 pt-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}