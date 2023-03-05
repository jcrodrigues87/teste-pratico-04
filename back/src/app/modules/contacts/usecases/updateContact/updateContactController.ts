import { Request, Response } from "express";
import { updateContactRepositorie } from "./updateContactRepositorie";

export class updateContactController {
  async update(req: Request, res: Response) {
    try {
      const repositorie = new updateContactRepositorie();
      const updatedContact = await repositorie.update(
        req.params.email,
        req.body
      );
      return res.status(200).json(updatedContact);
    } catch (error) {
      return res.send(error);
    }
  }
}
