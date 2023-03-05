import { Request, Response } from "express";
import { findContactByEmailRepositorie } from "./findContactByEmailRepositorie";

export class findContactByEmailController {
  async show(req: Request, res: Response) {
    const repositorie = new findContactByEmailRepositorie();
    try {
      const contactByEmail = await repositorie.findByEmail(req.params.email);
      return res.status(200).json(contactByEmail);
    } catch (error) {
      return res.send(error);
    }
  }
}
