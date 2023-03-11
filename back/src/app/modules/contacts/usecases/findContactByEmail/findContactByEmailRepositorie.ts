import { AppError } from "../../../../error/appError";
import { prisma } from "../../../../prisma/prismaClient";

export class findContactByEmailRepositorie {
  async findByEmail(email: string) {
    const contactByEmail = prisma.contacts.findUnique({
      where: {
        email,
      },
    });

    if (!contactByEmail) {
      throw new AppError("contact with this email was not found", 404);
    }
    return contactByEmail;
  }
}
