import { Request, Response } from "express";
import { findProviderByEmailRepositorie } from "./findProviderByEmailRepositorie";

const repositories = new findProviderByEmailRepositorie();

export class findProviderByEmailController {
  async show(req: Request, res: Response) {
    try {
      const servicerProvider = await repositories.findByEmail(req.params.email);
      return res.status(200).json(servicerProvider);
    } catch (error) {
      res.send(error);
    }
  }
}
