-- CreateTable
CREATE TABLE "Fornecedor" (
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
    "nomeContato" TEXT NOT NULL,
    "emailContato" TEXT NOT NULL,
    "departamentoContato" TEXT NOT NULL,
    "nomeContato1" TEXT,
    "emailContato1" TEXT,
    "departamentoContato1" TEXT,
    "dataCriado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");
