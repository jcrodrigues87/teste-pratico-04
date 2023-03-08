import { useEffect, useState } from "react";
import { ProviderList } from "../../components/ProvidersList";
import { api } from "../../services/api";
import { providerType } from "../../types/providerType";
import "./style.scss";

export function ListProviders() {
  const [providers, setProviders] = useState<Array<providerType>>([]);
  const [filteredProvider, setFilteredProvider] = useState<providerType>();
  const [filterText, setFilterText] = useState("");
  const [searchedState, setSearchedState] = useState(false);

  function getProviders() {
    api
      .get("/provider")
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearchInput(value: string) {
    if (value.length === 0) {
      setSearchedState(false);
    }
    setFilterText(value);
  }

  function handleSearchProviders() {
    setSearchedState(true);
    setFilteredProvider(
      providers.find(
        (provider) =>
          provider.cnpj === filterText ||
          provider.corporate_name === filterText ||
          provider.email === filterText
      )
    );
  }

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <>
      <div>
        <input
          placeholder="Pesquisar provedor"
          type="text"
          value={filterText}
          onChange={(event) => handleSearchInput(event.target.value)}
        />
        <button onClick={() => handleSearchProviders()}>pesquisar</button>
      </div>
      {searchedState === false ? (
        <div className="container">
          <ProviderList providers={providers}></ProviderList>
        </div>
      ) : (
        <div className="container">
          <ProviderList filteredProvider={filteredProvider}></ProviderList>
        </div>
      )}
    </>
  );
}
