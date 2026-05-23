import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { shoppingSchema } from "@/validations/shoppingSchema";

export async function GET() {
  try {
    const items = await prisma.shoppingItem.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(items);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erro API items (GET):", error);
    return NextResponse.json(
      { message: "Erro interno ao carregar a lista de compras." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erro API items (POST):", error);
    return NextResponse.json(
      { message: "Erro interno ao salvar um item." },
      { status: 500 }
    );
  }
}

