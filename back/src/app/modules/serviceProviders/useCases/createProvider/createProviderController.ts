import { Request, Response } from "express";
import { createProviderRepositorie } from "./createProviderRepositorie";

export class createProviderController {
  async store(req: Request, res: Response) {
    try {
      const repositories = new createProviderRepositorie();
      const createServiceProvider = await repositories.create(req.body);
      return res.status(200).json(createServiceProvider);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
