import { Router } from "express";
import { createContactController } from "../modules/contacts/usecases/createContact/createContactController";
import { updateContactController } from "../modules/contacts/usecases/updateContact/updateContactController";
import { deleteContactController } from "../modules/contacts/usecases/deleteContact/deleteContactController";
import { findContactByEmailController } from "../modules/contacts/usecases/findContactByEmail/findContactByEmailController";

const contactRoutes = Router();

const createContact = new createContactController();
const updateContact = new updateContactController();
const deleteContact = new deleteContactController();
const findContactByEmail = new findContactByEmailController();

contactRoutes.get("/:email", findContactByEmail.show);
contactRoutes.post("/", createContact.store);
contactRoutes.put("/:email", updateContact.update);
contactRoutes.delete("/:email", deleteContact.delete);

export { contactRoutes };
