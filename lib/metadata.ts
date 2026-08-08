import { Metadata } from "next";
import { getGroupById } from "@/lib/data";

export async function generateGroupMetadata(
  id: string
): Promise<Metadata> {
  const group = await getGroupById(id);

  return {
    title: group ? `${group.name} | StudyBoard` : "Group Not Found",
    description: group
      ? `Study group for ${group.subject} with ${group.memberCount} members.`
      : "Group does not exist.",
  };
}
