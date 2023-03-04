import { Request, Response } from "express";
import { createProviderRepositorie } from "./createProviderRepositorie";

const repositories = new createProviderRepositorie();

export class createProviderController {
  async store(req: Request, res: Response) {
    const createdServiceProvider = await repositories.create(req.body);
    if (!createdServiceProvider) {
      return res.status(401).json({ msg: "an error ocurred" });
    }
    return res.status(200).json(createdServiceProvider);
  }
}
