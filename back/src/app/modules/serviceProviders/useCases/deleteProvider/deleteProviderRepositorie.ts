import { AppError } from "../../../../error/appError";
import { prisma } from "../../../../prisma/prismaClient";

export class deleteProviderRepositorie {
  async delete(email: string): Promise<boolean> {
    const serviceProviderExists = await prisma.serviceProvider.findUnique({
      where: {
        email: email,
      },
    });

    if (!serviceProviderExists) {
      throw new AppError("This provider wasn't found", 404);
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
