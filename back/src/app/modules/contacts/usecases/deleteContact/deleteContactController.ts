import { Request, Response } from "express";
import { deleteContactRepositorie } from "./deleteContactRepositorie";

export class deleteContactController {
  async delete(req: Request, res: Response) {
    const repositorie = new deleteContactRepositorie();
    try {
      const deleteContact = await repositorie.delete(req.params.email);
      return res.status(200).json({ msg: "contact deleted with success" });
    } catch (error) {
      res.send(error);
    }
  }
}
