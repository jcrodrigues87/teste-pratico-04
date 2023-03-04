import { ServiceProvider } from "@prisma/client";
import { prisma } from "../../../../prisma/prismaClient";
import { AppError } from "../../../../error/appError";

export class listProviderRepositorie {
  async findAll(): Promise<ServiceProvider[]> {
    const allServicesProviders = await prisma.serviceProvider.findMany({
      include: {
        contacts: true,
      },
    });
    if (!allServicesProviders) {
      throw new AppError("No Service Provider was found");
    }
    return allServicesProviders;
  }
}
