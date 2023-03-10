import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProviderList } from "../../components/ProvidersList";
import { api } from "../../services/api";
import { providerType } from "../../types/providerType";
import "./style.scss";

export function ListProviders() {
  const [providers, setProviders] = useState<Array<providerType>>([]);
  const [filteredProvider, setFilteredProvider] = useState<providerType>();
  const [filterText, setFilterText] = useState("");
  const [searchedState, setSearchedState] = useState(false);
  const navigate = useNavigate();

  function getProviders() {
    api
      .get("/provider")
      .then((response) => {
        response.data.statusCode === 404
          ? setProviders([])
          : setProviders(response.data);
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
      <header className="header">
        <h2 onClick={() => navigate("/")}>Prestadores de Serviço</h2>
        <div className="div-header">
          <input
            className="header-input"
            placeholder="Pesquisar provedor"
            type="text"
            value={filterText}
            onChange={(event) => handleSearchInput(event.target.value)}
          />
          <button
            className="header-button"
            onClick={() => handleSearchProviders()}
          >
            pesquisar
          </button>
        </div>
      </header>
      <div className="main">
        {searchedState === false ? (
          <div className="container">
            <ProviderList providers={providers}></ProviderList>
          </div>
        ) : (
          <div className="container">
            <ProviderList filteredProvider={filteredProvider}></ProviderList>
          </div>
        )}
      </div>
    </>
  );
}
