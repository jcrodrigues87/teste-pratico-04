import { providerType } from "../../types/providerType";
import { contactsType } from "../../types/contactType";
import "./style.scss";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { documentType } from "../../types/documentType";

interface ModalProps {
  provider: providerType | undefined;
  documents: Array<documentType> | undefined;
  show: boolean;
  onClose: () => void;
}

export function InformationModal(props: ModalProps) {
  const navigate = useNavigate();

  if (props.show != true) {
    return null;
  }

  function handleDocumentClick(filename: string) {
    console.log(`${props.provider?.email}/${filename}`);
    api
      .get(`provider/download/${props.provider?.email}/${filename}`)
      .then(() => console.log("deu certo"));
  }
  function handleDelete(email: string | undefined) {
    api.delete(`/provider/${email}`).then(() => {
      props.onClose();
      window.location.reload();
    });
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
          <ul>
            <strong>Documentos</strong>
            {props.documents?.map((document) => (
              <li
                onClick={() => handleDocumentClick(document.name)}
                className="modal-item contacts"
              >
                <p>nome: {document.name}</p>
                <p>url: {document.url}</p>
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
