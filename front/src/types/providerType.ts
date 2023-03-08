import { contactsType } from "./contactType";

export type providerType = {
  id: number;
  cnpj: string;
  corporate_name: string;
  opening_date: Date;
  phone: string;
  email: string;
  zip_code: string;
  address: string;
  contacts: contactsType[];
};
