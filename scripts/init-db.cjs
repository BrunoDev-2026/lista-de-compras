const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ShoppingItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ShoppingNote (
      id INTEGER PRIMARY KEY DEFAULT 1,
      content TEXT NOT NULL DEFAULT '',
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("SQLite database is ready.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
