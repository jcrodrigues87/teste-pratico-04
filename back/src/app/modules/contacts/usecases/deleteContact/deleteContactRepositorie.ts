import { AppError } from "../../../../error/appError";
import { prisma } from "../../../../prisma/prismaClient";

export class deleteContactRepositorie {
  async delete(email: string): Promise<boolean> {
    const contactExists = await prisma.contacts.findUnique({
      where: {
        email,
      },
    });
    if (!contactExists) {
      throw new AppError("contact doesn't exist", 400);
    }

    const deletedUser = await prisma.contacts.delete({
      where: {
        email,
      },
    });
    return true;
  }
}
