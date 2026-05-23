import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { shoppingSchema } from "@/validations/shoppingSchema";

export async function GET() {
  const items = await prisma.shoppingItem.findMany({
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = shoppingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Dados inválidos", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const item = await prisma.shoppingItem.create({
    data: parsed.data
  });

  return NextResponse.json(item, { status: 201 });
}
