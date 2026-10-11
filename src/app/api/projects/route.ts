import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.coloringProject.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        configurations: true,
        generations: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, projects });
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return NextResponse.json({ success: true, projects: [] });
  }
}
