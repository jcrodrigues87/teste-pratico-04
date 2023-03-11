import { createProviderContact } from "../../dtos/createProviderContactDTO";
import { prisma } from "../../../../prisma/prismaClient";
import { AppError } from "../../../../error/appError";
import { Contacts } from "@prisma/client";

export class createContactRepositorie {
  async create(
    emailProvider: string,
    { name, email, departament }: createProviderContact
  ): Promise<Contacts> {
    const contactAlreadyExists = await prisma.contacts.findUnique({
      where: {
        email,
      },
    });

    if (contactAlreadyExists) {
      throw new AppError("user with this email already exists", 400);
    }

    const serviceProviderExists = await prisma.serviceProvider.findUnique({
      where: {
        email: emailProvider,
      },
    });
    if (!serviceProviderExists) {
      throw new AppError("Provider with this email does not exists", 404);
    }

    const createContact = await prisma.contacts.create({
      data: {
        name,
        email,
        departament,
        service_provider: {
          connect: {
            email: emailProvider,
          },
        },
      },
      include: {
        service_provider: true,
      },
    });
    return createContact;
  }
}
