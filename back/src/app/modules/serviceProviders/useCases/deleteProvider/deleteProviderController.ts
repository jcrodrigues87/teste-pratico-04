import { Request, Response } from "express";
import { deleteProviderRepositorie } from "./deleteProviderRepositorie";

const repositories = new deleteProviderRepositorie();

export class deleteProviderController {
  async delete(req: Request, res: Response) {
    const checkIfServiceProviderWasDeleted = await repositories.delete(
      req.params.email
    );
    if (checkIfServiceProviderWasDeleted !== true) {
      return res.status(400).json({ msg: "An error ocurred" });
    }
    return res.status(200).json({ msg: "service provider deleted" });
  }
}
