import { ServiceProvider } from "@prisma/client";
import { AppError } from "../../../../error/appError";
import { createProvider } from "../../dtos/createProviderDTO";
import { prisma } from "../../../../prisma/prismaClient";

export class createProviderRepositorie {
  async create({
    cnpj,
    corporate_name,
    opening_date,
    phone,
    email,
    zip_code,
    address,
    contacts,
  }: createProvider): Promise<ServiceProvider> {
    const arrayContacts = contacts.map((contact) => ({
      name: contact.name,
      email: contact.email,
      departament: contact.departament,
    }));

    const existingProvider = await prisma.serviceProvider.findUnique({
      where: {
        email: email,
      },
    });

    if (existingProvider) {
      throw new AppError("this email is already in use");
    }
    const newServiceProvider = await prisma.serviceProvider.create({
      data: {
        cnpj,
        corporate_name,
        opening_date,
        phone,
        email,
        zip_code,
        address,
        contacts: {
          createMany: {
            data: arrayContacts,
          },
        },
      },
    });
    return newServiceProvider;
  }
}
