import { updateProvider } from "../../dtos/updateProviderDTO";
import { prisma } from "../../../../prisma/prismaClient";

export class updateProviderRepositorie {
  async update(email: string, data: updateProvider): Promise<boolean> {
    const serviceProviderExists = await prisma.serviceProvider.findUnique({
      where: {
        email,
      },
    });

    if (!serviceProviderExists) {
      return false;
    }

    const updatedServiceProvider = await prisma.serviceProvider.update({
      where: {
        email,
      },
      data,
    });
    return true;
  }
}
