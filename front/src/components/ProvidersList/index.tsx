import { providerType } from "../../types/providerType";
import { contactsType } from "../../types/contactType";
import "./style.scss";
import { InformationModal } from "../InformationModal";
import { useState } from "react";

interface providerTypes {
  providers?: providerType[];
  filteredProvider?: providerType;
}

export function ProviderList({ providers, filteredProvider }: providerTypes) {
  const [actualProvider, setActualProvider] = useState<providerType>();
  const [modalState, setModalState] = useState(false);

  function handleClick(provider: providerType) {
    setModalState(true);
    setActualProvider(provider);
  }

  return (
    <section className="">
      {filteredProvider ? (
        <ul className="provider-list">
          <>
            <li
              className="provider-item"
              onClick={() => handleClick(filteredProvider)}
            >
              <div className="informations">
                <h1>{filteredProvider.corporate_name}</h1>
                <p>telefone: {filteredProvider.phone}</p>
              </div>
              <div className="buttons">
                <button>delete</button>
                <button>edit</button>
              </div>
            </li>
          </>
        </ul>
      ) : (
        <ul className="provider-list">
          {providers?.map((provider, index) => (
            <>
              <li
                className="provider-item"
                onClick={() => handleClick(provider)}
              >
                <div className="informations">
                  <h1>{provider.corporate_name}</h1>
                  <p>telefone: {provider.phone}</p>
                </div>
                <div className="buttons">
                  <button>delete</button>
                  <button>edit</button>
                </div>
              </li>
            </>
          ))}
        </ul>
      )}
      <InformationModal
        provider={actualProvider}
        show={modalState}
        onClose={() => setModalState(!true)}
      />
    </section>
  );
}
