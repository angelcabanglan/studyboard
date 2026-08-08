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

// Helper to extract the dynamic route params (groupId + taskId).
function getParams(context: {
  params: Promise<{ id: string; taskId: string }> | { id: string; taskId: string };
}) {
  return context.params;
}

// PATCH /api/groups/[id]/tasks/[taskId] — update a task (e.g. toggle done)
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string; taskId: string }> | { id: string; taskId: string };
  }
) {
  try {
    const { id, taskId } = await getParams(context);

    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const existing = await prisma.task.findFirst({
      where: { id: taskId, groupId: id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await request.json();
    const data: { title?: string; status?: string } = {};

    if (body?.title !== undefined) {
      if (typeof body.title !== "string" || body.title.trim() === "") {
        return NextResponse.json(
          { error: "Title must be a non-empty string" },
          { status: 400 }
        );
      }
      data.title = body.title.trim();
    }

    if (body?.done !== undefined) {
      data.status = body.done ? "Done" : "Pending";
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return NextResponse.json(serializeTask(task), { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to update task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE /api/groups/[id]/tasks/[taskId] — remove a task
export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string; taskId: string }> | { id: string; taskId: string };
  }
) {
  try {
    const { id, taskId } = await getParams(context);

    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const existing = await prisma.task.findFirst({
      where: { id: taskId, groupId: id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
