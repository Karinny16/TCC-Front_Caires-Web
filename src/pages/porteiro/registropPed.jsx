import React from "react";
import "./registrop.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonP from "../../components/buttonP";
import MenuPorteiro from "../../components/MenuPorteiro";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function PedidosRP() {
  const navigate = useNavigate();
  const [encomendas, setEncomendas] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3333/encomendas")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) setEncomendas(data.message);
        else setEncomendas([]);
      });
  }, []);

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
        <div className="container-botoes">
          <ButtonP />
        </div>

        <div className="continent-4">
          <div className="continente scroll">
            {/* Barra de pesquisa */}
            <div className="pesquisa-side">
              <div className="continente-1">
                 <MenuPorteiro />
                <div></div>
                <img src={cairesa} alt="Logo" className="img-cadA" />
                <div className="icon-contain">
                  <IoAddCircleOutline
                    size={50}
                    color="black"
                    className="more-icon"
                    onClick={() => navigate("/encomenda")}
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
              <table className="encomenda-table">
                <thead>
                  <tr>
                    <th>Imagem</th>
                    <th>Empresa</th>
                    <th>Data de Entrega</th>
                    <th>ID Unidade</th>
                  </tr>
                </thead>
                <tbody>
                  {encomendas.map((enc) => (
                    <tr key={enc.id_encomenda}>
                      <td>
                        {enc.imagem ? (
                          <img
                            src={`http://localhost:3333/uploads/${enc.imagem}`}
                            alt="Encomenda"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 8,
                              border: "1px solid #ccc",
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{enc.empresa}</td>
                      <td>
                        {enc.data_entrega
                          ? new Date(enc.data_entrega).toLocaleDateString()
                          : ""}
                      </td>
                      <td>{enc.id_unidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PedidosRP;
