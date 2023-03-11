import { useNavigate } from "react-router-dom";
import "./style.scss";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-home">
      <div className="container-home">
        <div className="home-buttons">
          <div>
            <button
              onClick={() => navigate("/register")}
              className="buttons"
            >
              Registrar Provedor
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/providers")}
              className="buttons"
            >
              Listar Provedores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
