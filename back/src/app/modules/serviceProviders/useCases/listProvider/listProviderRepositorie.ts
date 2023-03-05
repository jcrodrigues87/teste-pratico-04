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
    if (allServicesProviders.length < 1) {
      throw new AppError("No Service Provider was found", 404);
    }
    return allServicesProviders;
  }
}
