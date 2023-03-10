import { createProviderContact } from "../../contacts/dtos/createProviderContactDTO";

export type createProvider = {
  cnpj: string;
  corporate_name: string;
  opening_date: string;
  phone: string;
  email: string;
  zip_code: string;
  address: string;
  contacts: createProviderContact[];
};
