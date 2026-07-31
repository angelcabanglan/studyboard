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

// Static mock data — will be replaced by real database queries in Week 5.
const groups: Group[] = [
  {
    id: "1",
    name: "Data Structures Study Circle",
    subject: "Computer Science",
    memberCount: 5,
    tasks: [
      { id: "t1", title: "Review binary trees", done: false },
      { id: "t2", title: "Practice linked list problems", done: true },
      { id: "t3", title: "Summarize Big-O notation", done: false },
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
  return groups.find((group) => group.id === id);
}
