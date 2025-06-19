import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonAz from "../../components/ButtonAz";
import MeuMenu from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function PedidosR() {
  const navigate = useNavigate();
  const [encomendas, setEncomendas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/encomendas")
      .then((resp) => resp.json())
      .then((data) => {
        // Supondo que o backend retorna { message: [encomendas] }
        setEncomendas(Array.isArray(data.message) ? data.message : []);
      });
  }, []);

  return (
    <div className="container-principal">
      {/* Container dos botões - Não interfere no alinhamento */}
      <div className="container-botoes">
        <ButtonAz />
      </div>

      {/* Container principal do conteúdo */}
      <div className="continent-4">
        <div className="continente scroll">
          {/* Barra de pesquisa */}
          <div className="pesquisa-side">
            <div className="continente-1">
              <div>
                <MeuMenu /> {/* Aqui o menu aparece na tela */}
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
            <div
              className="encomendas-list"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "center",
              }}
            >
              {encomendas.map((enc) => (
                <div
                  key={enc.id_encomenda}
                  className="encomenda-card"
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px black",
                    padding: 16,
                    width: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      enc.imagem
                        ? `http://localhost:3333/uploads/${enc.imagem}`
                        : "https://via.placeholder.com/120x120?text=Sem+Foto"
                    }
                    alt="Encomenda"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    Morador: {enc.nome_morador || enc.fk_id_morador}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    Data:{" "}
                    {enc.data_entrega
                      ? new Date(enc.data_entrega).toLocaleString()
                      : "-"}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#888",
                      marginTop: 6,
                    }}
                  >
                    Status: {enc.status_entrega}
                  </div>
                  <button
                    style={{
                      marginTop: 12,
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 16px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Tem certeza que deseja deletar esta encomenda?"
                        )
                      ) {
                        try {
                          const resp = await fetch(
                            `http://localhost:3333/encomendas/${enc.id_encomenda}`,
                            {
                              method: "DELETE",
                            }
                          );
                          if (resp.ok) {
                            setEncomendas((prev) =>
                              prev.filter(
                                (e) => e.id_encomenda !== enc.id_encomenda
                              )
                            );
                          } else {
                            alert("Erro ao deletar encomenda.");
                          }
                        } catch (err) {
                          alert("Erro ao deletar encomenda.");
                        }
                      }
                    }}
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidosR;
