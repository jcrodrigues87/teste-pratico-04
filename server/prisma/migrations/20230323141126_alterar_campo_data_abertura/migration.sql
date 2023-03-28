-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "razao" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "dataAbertura" DATETIME,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "dataCriado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Fornecedor" ("cep", "cidade", "cnpj", "dataAbertura", "dataCriado", "email", "endereco", "estado", "id", "numero", "razao", "telefone") SELECT "cep", "cidade", "cnpj", "dataAbertura", "dataCriado", "email", "endereco", "estado", "id", "numero", "razao", "telefone" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
