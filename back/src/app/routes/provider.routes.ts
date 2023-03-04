import { Router } from "express";
import { createProviderController } from "../modules/serviceProviders/useCases/createProvider/createProviderController";
import { deleteProviderController } from "../modules/serviceProviders/useCases/deleteProvider/deleteProviderController";
import { findProviderByEmailController } from "../modules/serviceProviders/useCases/findProviderByEmail/findProviderByEmailController";
import { listProviderController } from "../modules/serviceProviders/useCases/listProvider/listProviderController";
import { updateProviderController } from "../modules/serviceProviders/useCases/updateProvider/updateProviderController";

const providerRoutes = Router();

const createProvider = new createProviderController();
const deleteProvider = new deleteProviderController();
const listProvider = new listProviderController();
const updateProvider = new updateProviderController();
const listProviderByEmail = new findProviderByEmailController();

providerRoutes.get("/", listProvider.index);
providerRoutes.get("/:email", listProviderByEmail.show);
providerRoutes.post("/", createProvider.store);
providerRoutes.put("/:email", updateProvider.update);
providerRoutes.delete("/:email", deleteProvider.delete);

export { providerRoutes };
