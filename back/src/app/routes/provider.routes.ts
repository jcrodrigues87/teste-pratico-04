import { Request, Response, Router } from "express";
import { createProviderController } from "../modules/serviceProviders/useCases/createProvider/createProviderController";
import { deleteProviderController } from "../modules/serviceProviders/useCases/deleteProvider/deleteProviderController";
import { findProviderByEmailController } from "../modules/serviceProviders/useCases/findProviderByEmail/findProviderByEmailController";
import { listProviderController } from "../modules/serviceProviders/useCases/listProvider/listProviderController";
import { updateProviderController } from "../modules/serviceProviders/useCases/updateProvider/updateProviderController";
import { fileHandlerController } from "../modules/serviceProviders/useCases/uploadDocuments/uploadDocumentsController";

const providerRoutes = Router();

const createProvider = new createProviderController();
const deleteProvider = new deleteProviderController();
const listProvider = new listProviderController();
const updateProvider = new updateProviderController();
const listProviderByEmail = new findProviderByEmailController();
const fileHandler = new fileHandlerController();

providerRoutes.get("/", listProvider.index);
providerRoutes.get("/:email", listProviderByEmail.show);
providerRoutes.post("/", createProvider.store);
providerRoutes.put("/:email", updateProvider.update);
providerRoutes.delete("/:email", deleteProvider.delete);
providerRoutes.post("/upload/:email", fileHandler.upload);
providerRoutes.get("/files/:email", fileHandler.getFiles);
providerRoutes.get("/download/:email/:fileName", fileHandler.downloadFile);

export { providerRoutes };
