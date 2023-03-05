import { Request, Response } from "express";
import { updateProviderRepositorie } from "./updateProviderRepositorie";

const repositories = new updateProviderRepositorie();

export class updateProviderController {
  async update(req: Request, res: Response) {
    try {
      const checkIfServiceProviderWasUpdated = await repositories.update(
        req.params.email,
        req.body
      );
      return res.status(200).json({ msg: "service provider updated" });
    } catch (error) {
      res.send(error);
    }
  }
}
