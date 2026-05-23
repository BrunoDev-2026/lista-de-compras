import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const noteSchema = z.object({
  content: z.string().max(5000, "A anotação pode ter no máximo 5000 caracteres")
});

export async function GET() {
  const note = await prisma.shoppingNote.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, content: "" }
  });

  return NextResponse.json(note);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const parsed = noteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Dados inválidos", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const note = await prisma.shoppingNote.upsert({
    where: { id: 1 },
    update: { content: parsed.data.content },
    create: { id: 1, content: parsed.data.content }
  });

  return NextResponse.json(note);
}
