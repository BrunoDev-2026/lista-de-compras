import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const databaseUrl = process.env.DATABASE_URL;

function normalizeError(error: unknown) {
  if (error instanceof Error) return { message: error.message, stack: error.stack };
  return { message: String(error) };
}

if (!databaseUrl) {
  // Em produção, logs ajudam a identificar env var faltante.
  // eslint-disable-next-line no-console
  console.error("DATABASE_URL não está definida. Verifique as Environment Variables no Render.");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error", "warn"],
    datasources: {
      db: {
        url: databaseUrl ?? "" // Prisma vai falhar se vazio; vamos capturar/logar nas rotas.
      }
    }
  });

// Expor helper para debug (opcional) sem afetar rotas existentes.
export const prismaDebug = {
  normalizeError
};

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
