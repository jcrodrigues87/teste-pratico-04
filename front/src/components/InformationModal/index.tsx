import { providerType } from "../../types/providerType";
import { contactsType } from "../../types/contactType";
import "./style.scss";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  provider: providerType | undefined;
  show: boolean;
  onClose: () => void;
}

export function InformationModal(props: ModalProps) {
  const navigate = useNavigate();

  if (props.show != true) {
    return null;
  }

  function handleDelete(email: string | undefined) {
    api.delete(`/provider/${email}`).then(() => {
      props.onClose();
      window.location.reload();
    });
  }

  function handleUpdate(email: string | undefined) {
    api.put(`/provider/${email}`);
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
            <li className="modal-item provider">
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
              <li className="modal-item contacts">
                <strong className="name">{contact.name}</strong>
                <p>Email: {contact.email}</p>
                <p>Departamento: {contact.departament}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="info-buttons close"
            onClick={props.onClose}
          >
            Close
          </button>
          <button
            className="info-buttons delete"
            onClick={() => handleDelete(props.provider?.email)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
