import { Request, Response } from "express";
import { createContactRepositorie } from "./createContactRepositorie";

export class createContactController {
  async store(req: Request, res: Response) {
    try {
      const repositorie = new createContactRepositorie();
      const { email_provider } = req.body;
      const createdContact = await repositorie.create(email_provider, req.body);
      res.status(200).json({ msg: "contact created" });
    } catch (error) {
      res.send(error);
    }
  }
}
