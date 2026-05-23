CREATE TABLE "ShoppingItem" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ShoppingNote" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "content" TEXT NOT NULL DEFAULT '',
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ShoppingNote_pkey" PRIMARY KEY ("id")
);
