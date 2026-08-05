import Link from "next/link";
import { Group } from "@/lib/data";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/groups/${group.id}`} className="block">
      <div className="border border-gray-700 bg-gray-900/60 p-4 rounded-xl hover:border-gray-500 transition cursor-pointer space-y-2">
        <h2 className="text-lg font-bold text-white">{group.name}</h2>
        <p className="text-sm text-gray-400">{group.subject}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
          <span>{group.memberCount} members</span>
          <span className="text-blue-400">View Details →</span>
        </div>
      </div>
    </Link>
  );
}