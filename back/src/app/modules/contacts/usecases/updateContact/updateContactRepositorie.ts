import { Contacts } from "@prisma/client";
import { AppError } from "../../../../error/appError";
import { prisma } from "../../../../prisma/prismaClient";
import { updateContactProvider } from "../../dtos/updateProviderContactDTO";

export class updateContactRepositorie {
  async update(email: string, data: updateContactProvider): Promise<Contacts> {
    const contactExists = await prisma.contacts.findUnique({
      where: {
        email,
      },
    });

    if (!contactExists) {
      throw new AppError("this contact does not exists", 400);
    }

    const contactUpdated = await prisma.contacts.update({
      where: {
        email,
      },
      data: {
        name: data.name,
        email: data.email,
        departament: data.departament,
      },
    });
    return contactUpdated;
  }
}
