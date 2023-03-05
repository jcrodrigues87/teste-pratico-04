import { updateProvider } from "../../dtos/updateProviderDTO";
import { prisma } from "../../../../prisma/prismaClient";
import { AppError } from "../../../../error/appError";

export class updateProviderRepositorie {
  async update(email: string, data: updateProvider): Promise<boolean> {
    const serviceProviderExists = await prisma.serviceProvider.findUnique({
      where: {
        email,
      },
    });

    if (!serviceProviderExists) {
      throw new AppError("This provider was not found", 404);
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
