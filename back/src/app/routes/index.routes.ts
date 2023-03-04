import { Router } from "express";
import { Request, Response } from "express";
import { providerRoutes } from "./provider.routes";

const routes = Router();

routes.use("/provider", providerRoutes);
routes.get("/", async (request: Request, response: Response) => {
  return response.status(200).json({
    message: "API Fullstack Job Test - Canex running",
  });
});

export { routes };
