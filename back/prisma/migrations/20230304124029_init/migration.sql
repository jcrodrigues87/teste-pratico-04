-- CreateTable
CREATE TABLE "Service_provider" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razao" TEXT NOT NULL,
    "opening_date" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "Service_provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departament" TEXT NOT NULL,
    "service_provider_id" INTEGER NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_provider_cnpj_key" ON "Service_provider"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Service_provider_phone_key" ON "Service_provider"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Service_provider_email_key" ON "Service_provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_email_key" ON "Contacts"("email");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_service_provider_id_fkey" FOREIGN KEY ("service_provider_id") REFERENCES "Service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
