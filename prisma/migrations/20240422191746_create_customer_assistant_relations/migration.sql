-- CreateTable
CREATE TABLE "customer_assistant_relations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "customer_assistant_relations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_assistant_relations_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "assistants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_assistant_relations_customerId_key" ON "customer_assistant_relations"("customerId");
