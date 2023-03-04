import { Request, Response } from "express";
import { updateProviderRepositorie } from "./updateProviderRepositorie";

const repositories = new updateProviderRepositorie();

export class updateProviderController {
  async update(req: Request, res: Response) {
    const checkIfServiceProviderWasUpdated = await repositories.update(
      req.params.email,
      req.body
    );
    if (checkIfServiceProviderWasUpdated !== true) {
      return res.status(400).json({ msg: "An error ocurred" });
    }
    return res.status(200).json({ msg: "service provider updated" });
  }
}
