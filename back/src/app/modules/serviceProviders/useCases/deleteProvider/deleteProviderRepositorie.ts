import { prisma } from "../../../../prisma/prismaClient";

export class deleteProviderRepositorie {
  async delete(email: string): Promise<boolean> {
    const serviceProviderExists = await prisma.serviceProvider.findUnique({
      where: {
        email: email,
      },
    });

    if (!serviceProviderExists) {
      return false;
    }
    const deleteContacts = prisma.serviceProvider.update({
      where: {
        email: email,
      },
      data: {
        contacts: {
          deleteMany: {},
        },
      },
    });
    const deletedServiceProvider = prisma.serviceProvider.delete({
      where: {
        email: email,
      },
    });

    const transaction = await prisma.$transaction([
      deleteContacts,
      deletedServiceProvider,
    ]);
    return true;
  }
}
