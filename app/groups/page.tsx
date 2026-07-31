import GroupCard from "@/components/GroupCard";
import { getGroups } from "@/lib/data";

export default function GroupsPage() {
  const groups = getGroups();

  return (
    <div>
      <h1 className="text-3xl font-bold">All Groups</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
