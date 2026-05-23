import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { shoppingSchema } from "@/validations/shoppingSchema";

type Params = {
  params: Promise<{ id: string }>;
};

const parseId = (id: string) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const parsedId = parseId(id);

    if (!parsedId) {
      return NextResponse.json({ message: "Item inválido" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = shoppingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const item = await prisma.shoppingItem.update({
      where: { id: parsedId },
      data: parsed.data
    });

    return NextResponse.json(item);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erro API items (PUT /:id):", error);
    return NextResponse.json(
      { message: "Erro interno ao atualizar o item." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const parsedId = parseId(id);

    if (!parsedId) {
      return NextResponse.json({ message: "Item inválido" }, { status: 400 });
    }

    await prisma.shoppingItem.delete({
      where: { id: parsedId }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erro API items (DELETE /:id):", error);
    return NextResponse.json(
      { message: "Erro interno ao excluir o item." },
      { status: 500 }
    );
  }
}

