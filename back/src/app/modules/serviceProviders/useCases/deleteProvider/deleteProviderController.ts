import { Request, Response } from "express";
import { deleteProviderRepositorie } from "./deleteProviderRepositorie";

const repositories = new deleteProviderRepositorie();

export class deleteProviderController {
  async delete(req: Request, res: Response) {
    try {
      const checkIfServiceProviderWasDeleted = await repositories.delete(
        req.params.email
      );
      return res.status(200).json({ msg: "service provider deleted" });
    } catch (error) {
      return res.send(error);
    }
  }
}
