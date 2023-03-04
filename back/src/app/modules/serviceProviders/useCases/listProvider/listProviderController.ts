import { Request, Response } from "express";
import { listProviderRepositorie } from "./listProviderRepositorie";

const repositories = new listProviderRepositorie();

export class listProviderController {
  async index(req: Request, res: Response) {
    const servicesProviders = await repositories.findAll();
    if (servicesProviders.length < 1) {
      return res.status(404).json({ error: "serviceProviders not found" });
    }
    return res.status(201).json(servicesProviders);
  }
}
