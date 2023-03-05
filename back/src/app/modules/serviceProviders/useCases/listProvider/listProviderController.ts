import { Request, Response } from "express";
import { listProviderRepositorie } from "./listProviderRepositorie";

const repositories = new listProviderRepositorie();

export class listProviderController {
  async index(req: Request, res: Response) {
    try {
      const servicesProviders = await repositories.findAll();
      return res.status(201).json(servicesProviders);
    } catch (error) {
      return res.send(error);
    }
  }
}
