import { providerType } from "../../types/providerType";
import { contactsType } from "../../types/contactType";
import "./style.scss";

interface ModalProps {
  provider: providerType | undefined;
  show: boolean;
  onClose: () => void;
}

export function InformationModal(props: ModalProps) {
  if (props.show != true) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{props.provider?.corporate_name}</h3>
        </div>
        <div className="modal-body">
          <ul className="modal-list">
            <strong>Informações</strong>
            <li className="modal-item">
              <p>CNPJ: {props.provider?.cnpj}</p>
              <p>Email: {props.provider?.email}</p>
              <p>Telefone: {props.provider?.phone}</p>
              <p>Endereço: {props.provider?.address}</p>
              <p>Data abertura: {props.provider?.opening_date}</p>
            </li>
          </ul>
          <ul className="modal-list">
            <strong>Contatos</strong>
            {props.provider?.contacts.map((contact: contactsType) => (
              <li className="modal-item">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.departament}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className=""
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
