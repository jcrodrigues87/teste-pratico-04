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
    <section>
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
            </li>
          </>
        </ul>
      ) : (
        <ul className="provider-list">
          {providers?.map((provider, index) => (
            <>
              <li className="provider-item">
                <div className="informations">
                  <h1 onClick={() => handleClick(provider)}>
                    {provider.corporate_name}
                  </h1>
                  <p>telefone: {provider.phone}</p>
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
