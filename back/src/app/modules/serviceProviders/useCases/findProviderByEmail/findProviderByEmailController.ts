import { Request, Response } from "express";
import { findProviderByEmailRepositorie } from "./findProviderByEmailRepositorie";

const repositories = new findProviderByEmailRepositorie();

export class findProviderByEmailController {
  async show(req: Request, res: Response) {
    const servicerProvider = await repositories.findByEmail(req.params.email);

    if (!servicerProvider) {
      return res.status(404).json({ msg: "provider was not found" });
    }
    return res.status(200).json(servicerProvider);
  }
}
