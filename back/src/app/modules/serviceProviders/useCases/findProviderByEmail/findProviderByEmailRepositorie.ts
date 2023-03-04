import { ServiceProvider } from "@prisma/client";
import { prisma } from "../../../../prisma/prismaClient";
import { AppError } from "../../../../error/appError";

export class findProviderByEmailRepositorie {
  async findByEmail(email: string): Promise<ServiceProvider> {
    const serviceProviderByEmail = await prisma.serviceProvider.findUnique({
      where: {
        email: email,
      },
      include: {
        contacts: true,
      },
    });
    if (!serviceProviderByEmail) {
      throw new AppError("this email is already in use");
    }

    return serviceProviderByEmail;
  }
}
