export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type Group = {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  tasks: Task[];
};

export const groups: Group[] = [
  {
    id: "1",
    name: "Data Structures Study Circle",
    subject: "Itelec1",
    memberCount: 5,
    tasks: [
      { id: "t1", title: "Review Next.js Components & Props", done: false },
      { id: "t2", title: "Practice Tailwind CSS Styling", done: true },
      { id: "t3", title: "Complete Itelec1 Hands-on Lab", done: false },
    ],
  },
  {
    id: "2",
    name: "Thermodynamics Crew",
    subject: "Physics",
    memberCount: 3,
    tasks: [
      { id: "t4", title: "Solve entropy problem set", done: false },
      { id: "t5", title: "Read Chapter 4", done: false },
    ],
  },
  {
    id: "3",
    name: "Philippine History Readers",
    subject: "History",
    memberCount: 8,
    tasks: [
      { id: "t6", title: "Outline Chapter 2 discussion", done: true },
      { id: "t7", title: "Prepare debate points", done: false },
      { id: "t8", title: "Watch assigned documentary", done: true },
    ],
  },
];

export function getGroups(): Group[] {
  return groups;
}

export function getGroupById(id: string): Group | undefined {
  return groups.find((group) => String(group.id) === String(id));
}

export function getTasksByGroupId(groupId: string) {
  const group = getGroupById(groupId);
  return group ? group.tasks : [];
}