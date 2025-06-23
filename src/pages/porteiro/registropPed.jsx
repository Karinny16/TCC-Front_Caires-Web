import "./registrop.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonP from "../../components/buttonP";
import MeuMenu from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function PedidosRP() {
  const navigate = useNavigate();

  return (
    <>
       <button
            className="logout-top-left"
            onClick={() => navigate("/")}
            title="Sair"
          >
            <IoIosPower size={48} color="white" />
          </button>
    <div className="container-principal">
      {/* Container dos botões - Não interfere no alinhamento */}
      <div className="container-botoes">
        <ButtonP />
      </div>

      {/* Container principal do conteúdo */}
      <div className="continent-4">
        <div className="continente scroll">
          {/* Barra de pesquisa */}
          <div className="pesquisa-side">
            <div className="continente-1">
              <div>
              </div>
              <img src={cairesa} alt="Logo" className="img-cadA" />
              <div className="icon-contain">
                <IoAddCircleOutline
                  size={50}
                  color="black"
                  className="more-icon"
                  onClick={() => navigate("/pedidosc")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="procura-2">
              <div className="input-contain">
                <IoIosSearch size={20} color="black" className="input-icon" />
                <input
                  type="text"
                  className="input-fiels"
                  placeholder="procurar"
                />
              </div>
            </div>
          </div>

          {/* Lista de Informações */}
          <div className="label-side">
            <div className="dive-label">
              <div className="div-label">
                <p>Nome:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
              <div className="div1-label">
                <p>Data de Entrega:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
              <div className="div2-label">
                <p>Status de Entrega:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default PedidosRP;
