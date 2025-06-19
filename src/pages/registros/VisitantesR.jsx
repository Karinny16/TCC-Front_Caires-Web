import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonAz from "../../components/ButtonAz";
import MeuMenu from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGeral from "..//CardGeral"; // Importação do card reutilizável

function VisitantesR() {
  const navigate = useNavigate();
  const [visitantes, setVisitantes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/visitante", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const lista = Array.isArray(data.message) ? data.message : [];
        setVisitantes(lista);
      })
      .catch((err) => {
        console.error("Erro ao buscar visitantes:", err);
        setVisitantes([]);
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
              <MeuMenu />
              <img src={cairesa} alt="Logo" className="img-cadA" />
              <div className="icon-contain">
                <IoAddCircleOutline
                  size={50}
                  color="black"
                  className="more-icon"
                  onClick={() => navigate("/visitantesc")}
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
            <div className="div-label">
              <p>Nome</p>
              <p>CPF</p>
              <p>Vinculo</p>
            </div>
            {Array.isArray(visitantes) && visitantes.length > 0 ? (
              visitantes.map((visitante, idx) => (
                <CardGeral
                  key={visitante.id_visitante || idx}
                  id={visitante.id_visitante}
                  campo1={visitante.nome}
                  campo2={visitante.cpf}
                  campo3={visitante.fk_idMorador}
                  rota="visitantesa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>
                Nenhum visitante encontrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitantesR;
