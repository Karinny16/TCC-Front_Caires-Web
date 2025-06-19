import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonAz from "../../components/ButtonAz";
import MeuMenu from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGeral from "../CardGeral"; // Importação do card reutilizável

function ServadoresR() {
  const navigate = useNavigate();
  const [servadores, setServadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/controlPS", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const lista = Array.isArray(data.message) ? data.message : [];
        setServadores(lista);
      })
      .catch((err) => {
        console.error("Erro ao buscar servadores:", err);
        setServadores([]);
      });
  }, []);

  return (
    <div className="container-principal">
      {/* Botões superiores */}
      <div className="container-botoes">
        <ButtonAz />
      </div>

      {/* Conteúdo principal */}
      <div className="continent-4">
        <div className="continente scroll">
          {/* Barra de pesquisa e menu */}
          <div className="pesquisa-side">
            <div className="continente-1">
              <div>
                <MeuMenu />
              </div>
              <img src={cairesa} alt="Logo" className="img-cadA" />
              <div className="icon-contain">
                <IoAddCircleOutline
                  size={50}
                  color="black"
                  className="more-icon"
                  onClick={() => navigate("/prestadoresc")}
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

          {/* Lista de Servidores */}
          <div className="label-side">
            <div className="div-label">
              <p>Nome</p>
              <p>CPF</p>
              <p>Vinculo</p>
            </div>
            {Array.isArray(servadores) && servadores.length > 0 ? (
              servadores.map((servidor, idx) => (
                <CardGeral
                  key={servidor.id_servidor || idx}
                  id={servidor.id_servidor}
                  campo1={servidor.nome}
                  campo2={servidor.cpf}
                  campo3={servidor.fk_id_prestador_servico}
                  rota="servadoresa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>
                Nenhum prestador encontrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServadoresR;
