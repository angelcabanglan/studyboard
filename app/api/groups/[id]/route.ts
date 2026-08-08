import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across requests to avoid
// exhausting database connections during development hot-reloading.
const prisma = new PrismaClient();

// Helper to extract the `id` param from the dynamic route segment.
function getParams(context: { params: Promise<{ id: string }> | { id: string } }) {
  return context.params;
}

// GET /api/groups/[id] — fetch a single group by id
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);

    const group = await prisma.group.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch group:", error);
    return NextResponse.json(
      { error: "Failed to fetch group" },
      { status: 500 }
    );
  }
}

// PUT /api/groups/[id] — update an existing group
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);
    const body = await request.json();

    const name = body?.name;
    const subject = body?.subject;
    const members = body?.members ?? body?.memberCount;
    const description = body?.description;

    // Validate that at least one updatable field is passed.
    if (
      name === undefined &&
      subject === undefined &&
      members === undefined &&
      description === undefined
    ) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 }
      );
    }

    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
      return NextResponse.json(
        { error: "Name must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      subject !== undefined &&
      (typeof subject !== "string" || subject.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Subject must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      members !== undefined &&
      (typeof members !== "number" ||
        !Number.isInteger(members) ||
        members < 0)
    ) {
      return NextResponse.json(
        { error: "Members must be a non-negative integer" },
        { status: 400 }
      );
    }

    const existing = await prisma.group.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const group = await prisma.group.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        subject: subject !== undefined ? subject.trim() : undefined,
        members: members !== undefined ? members : undefined,
        description: description !== undefined ? description : undefined,
      },
    });

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to update group:", error);
    return NextResponse.json(
      { error: "Failed to update group" },
      { status: 500 }
    );
  }
}

// PATCH /api/groups/[id] — partially update an existing group
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);
    const body = await request.json();

    const name = body?.name;
    const subject = body?.subject;
    const members = body?.members ?? body?.memberCount;
    const description = body?.description;

    // Validate that at least one updatable field is passed.
    if (
      name === undefined &&
      subject === undefined &&
      members === undefined &&
      description === undefined
    ) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 }
      );
    }

    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
      return NextResponse.json(
        { error: "Name must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      subject !== undefined &&
      (typeof subject !== "string" || subject.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Subject must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      members !== undefined &&
      (typeof members !== "number" ||
        !Number.isInteger(members) ||
        members < 0)
    ) {
      return NextResponse.json(
        { error: "Members must be a non-negative integer" },
        { status: 400 }
      );
    }

    const existing = await prisma.group.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const group = await prisma.group.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        subject: subject !== undefined ? subject.trim() : undefined,
        members: members !== undefined ? members : undefined,
        description: description !== undefined ? description : undefined,
      },
    });

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to update group:", error);
    return NextResponse.json(
      { error: "Failed to update group" },
      { status: 500 }
    );
  }
}

// DELETE /api/groups/[id] — delete a group by id
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await getParams(context);

    const existing = await prisma.group.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    await prisma.group.delete({ where: { id } });

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete group:", error);
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    );
  }
}
