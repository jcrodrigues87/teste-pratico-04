import { useEffect, useState } from "react";
import { ProviderList } from "../../components/ProvidersList";
import { api } from "../../services/api";
import { providerType } from "../../types/providerType";
import "./style.scss";

export function ListProviders() {
  const [providers, setProviders] = useState<Array<providerType>>([]);

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

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <>
      <div className="container">
        <ProviderList providers={providers}></ProviderList>
      </div>
    </>
  );
}
