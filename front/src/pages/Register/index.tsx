import React, { useState, ChangeEvent } from "react";
import { apiCep, api } from "../../services/api";
import { contactsType } from "../../types/contactType";
import { useNavigate } from "react-router-dom";
import "./style.scss";

export const Register = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [corporate_name, setCorporateName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("Logradouro");
  const [city, setCity] = useState("Cidade");
  const [number, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("Complemento");
  const [district, setDistrict] = useState("Bairro");
  const [state, setState] = useState("Estado");
  const [contactsCounter, setContactsCounter] = useState(0);
  const [contacts, setContacts] = useState<contactsType[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactDepartament, setContactDepartament] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileList, setFileList] = useState<FileList | null>(null);
  const navigate = useNavigate();

  function handleContactAdd(name: string, email: string, departament: string) {
    setContacts([
      ...contacts,
      {
        name: name,
        email: email,
        departament: departament,
      },
    ]);
    setContactName("");
    setContactEmail("");
    setContactDepartament("");
  }

  function handleFilesUpload(e: ChangeEvent<HTMLInputElement>) {
    setFileList(e.target.files);
  }

  function sendProviderInformation() {
    if (contacts.length === 0) {
      setErrorMessage("Pelo menos um contato/ usuário deve ser cadastrado!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      api
        .post("/provider", {
          cnpj,
          corporate_name,
          phone,
          email,
          opening_date: openingDate,
          zip_code: cep,
          address: `${street}, ${number}, ${district}, ${city}, ${state}`,
          contacts: contacts,
          filesPath: "",
        })
        .then(() => {
          console.log("entrou na segunda req");
          if (!fileList) {
            return;
          } else {
            const files = fileList ? [...fileList] : [];
            const data = new FormData();
            files.forEach((file, i) => {
              data.append("files", file);
            });
            api
              .post(`/provider/upload/${email}`, data, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(() => navigate("/"));
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function setCepAndCallApi(cep: string) {
    setCep(cep);
    if (cep.length === 8) {
      apiCep
        .get(`/${cep}/json`)
        .then((response) => {
          setCity(response.data.localidade);
          setStreet(response.data.logradouro);
          setComplement(response.data.complemento);
          setDistrict(response.data.bairro);
          setState(response.data.uf);
          if (
            response.data.logradouro === "" ||
            response.data.complemento === "" ||
            response.data.bairro === ""
          ) {
            setIsDisabled(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleDatePicker(date: string) {
    if (date.length == 2 || date.length == 5) {
      date = `${date}/`;
      setOpeningDate(date);
    }
    setOpeningDate(date);
  }

  return (
    <>
      <header className="header">
        <h2 onClick={() => navigate("/")}>Cadastrar Prestadores</h2>
      </header>
      <div className="main-register">
        <div className="container">
          <div className="register-form">
            <div className="general-informations">
              <h4 className="title">Informações gerais</h4>
              <label>Razão Social</label>
              <input
                required
                value={corporate_name}
                placeholder="Razão social"
                onChange={(e) => setCorporateName(e.target.value)}
                type="text"
              />
              <label>cnpj</label>
              <input
                required
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="cnpj"
                type="text"
              />
              <label>data de abertura</label>
              <input
                required
                value={openingDate}
                onChange={(e) => handleDatePicker(e.target.value)}
                placeholder="dd/mm/yyyy"
                type="text"
              />
              <label>telefone</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
              <label>email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main-register">
        <div className="container">
          <div className="register-form">
            <div className="address-informations">
              <h4 className="title">Endereço</h4>
              <label>CEP</label>
              <input
                type="text"
                placeholder="CEP"
                maxLength={8}
                value={cep}
                onChange={(e) => setCepAndCallApi(e.target.value)}
              />

              <label>N°</label>
              <input
                type="text"
                placeholder="Número"
                value={number}
                onChange={(e) => setAddressNumber(e.target.value)}
              />
              <label>Rua</label>
              <input
                disabled={isDisabled}
                type="text"
                placeholder={street}
              />

              <label>Complemento</label>
              <input
                type="text"
                disabled={isDisabled}
                placeholder={complement}
              />
              <label>Bairro</label>
              <input
                type="text"
                disabled={isDisabled}
                placeholder={district}
              />
              <label>Cidade</label>
              <input
                type="text"
                disabled={true}
                placeholder={city}
              />
              <label>Estado</label>
              <input
                type="text"
                disabled={true}
                placeholder={state}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="main-register">
        <div className="container">
          <div className="register-form">
            <div className="contacts-information">
              <h4 className="title">Contatos</h4>
              <div>
                <input
                  value={contactName}
                  placeholder="Nome Contato"
                  type="text"
                  onChange={(e) => setContactName(e.target.value)}
                />
                <input
                  value={contactEmail}
                  placeholder="Email Contato"
                  type="text"
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                <input
                  value={contactDepartament}
                  placeholder="Departamento"
                  type="text"
                  onChange={(e) => setContactDepartament(e.target.value)}
                />
                <button
                  className="send-informations"
                  onClick={() =>
                    handleContactAdd(
                      contactName,
                      contactEmail,
                      contactDepartament
                    )
                  }
                >
                  Add Contact
                </button>
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFilesUpload}
                />
              </div>
              <div>
                <p className="error-message">{errorMessage}</p>
              </div>
            </div>
            <button
              className="send-informations"
              onClick={() => sendProviderInformation()}
            >
              Enviar Informaçoes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
