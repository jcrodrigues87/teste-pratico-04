import { Router } from "express";
import { Request, Response } from "express";
import { contactRoutes } from "./contacts.routes";
import { providerRoutes } from "./provider.routes";

const routes = Router();

routes.use("/provider", providerRoutes);
routes.use("/contact", contactRoutes);
routes.get("/", async (request: Request, response: Response) => {
  return response.status(200).json({
    message: "API Fullstack Job Test - Canex running",
  });
});

export { routes };
