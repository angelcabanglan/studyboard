import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across requests to avoid
// exhausting database connections during development hot-reloading.
const prisma = new PrismaClient();

// Map a Prisma Task (uses `status`) to the frontend Task shape (uses `done`).
function serializeTask(task: {
  id: string;
  title: string;
  status: string;
}) {
  return {
    id: task.id,
    title: task.title,
    done: task.status === "Done",
  };
}

// Helper to extract the dynamic route params.
function getParams(context: {
  params: Promise<{ id: string }> | { id: string };
}) {
  return context.params;
}

// GET /api/groups/[id]/tasks — fetch all tasks for a group
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);

    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: { groupId: id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(tasks.map(serializeTask), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST /api/groups/[id]/tasks — create a task for a group
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);

    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await request.json();
    const title = body?.title;

    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        groupId: id,
      },
    });

    return NextResponse.json(serializeTask(task), { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
