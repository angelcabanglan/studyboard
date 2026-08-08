import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across requests to avoid
// exhausting database connections during development hot-reloading.
const prisma = new PrismaClient();

// GET /api/groups — fetch all groups
export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: { createdAt: "desc" },
      include: { tasks: true },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

// POST /api/groups — create a new group
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body?.name;
    const subject = body?.subject;
    const members = body?.members;
    const description = body?.description;

    if (typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof subject !== "string" || subject.trim() === "") {
      return NextResponse.json(
        { error: "Subject is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name: name.trim(),
        subject: subject.trim(),
        members:
          typeof members === "number" &&
          Number.isInteger(members) &&
          members >= 0
            ? members
            : 0,
        description: typeof description === "string" ? description : undefined,
      },
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to create group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
