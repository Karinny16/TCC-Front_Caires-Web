import "./registrop.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonP from "../../components/buttonP";
import MenuPorteiro from "../../components/MenuPorteiro";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardGeral from "../CardGeral";
function RegistroP() {
  const navigate = useNavigate();
  const [visitantes, setVisitantes] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // NOVO

  useEffect(() => {
    fetch("http://localhost:3333/visitantes", {
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

  useEffect(() => {
    fetch("http://localhost:3333/moradorVisitanteAssociacao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const lista = Array.isArray(data.message) ? data.message : [];
        setAssociacoes(lista);
      })
      .catch((err) => {
        console.error("Erro ao buscar associações:", err);
        setAssociacoes([]);
      });
  }, []);

  // Função para filtrar visitantes
  const visitantesFiltrados = visitantes.filter((visitante) => {
    const unidadesDoVisitante = associacoes
      .filter((assoc) => assoc.id_visitante === visitante.id_visitante)
      .map((assoc) => assoc.id_unidade)
      .join(", ");

    const termo = searchTerm.toLowerCase();
    return (
      visitante.nome.toLowerCase().includes(termo) ||
      visitante.cpf.toLowerCase().includes(termo) ||
      unidadesDoVisitante.toLowerCase().includes(termo)
    );
  });

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
                <MenuPorteiro />
                <img src={cairesa} alt="Logo" className="img-cadA" />
                <div className="icon-contain">
                  <IoAddCircleOutline
                    size={50}
                    color="black"
                    className="more-icon"
                    onClick={() => navigate("/visitantesCP")}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {visitantesFiltrados.length > 0 ? (
                visitantesFiltrados.map((visitante, idx) => {
                  const unidadesDoVisitante = associacoes
                    .filter((assoc) => assoc.id_visitante === visitante.id_visitante)
                    .map((assoc) => assoc.id_unidade)
                    .join(", ");

                  return (
                    <CardGeral
                      key={visitante.id_visitante || idx}
                      id={visitante.id_visitante}
                      campo1={visitante.nome}
                      campo2={visitante.cpf}
                      campo3={unidadesDoVisitante}
                      rota="atualizarVisitanteP"
                    />
                  );
                })
              ) : (
                <div style={{ padding: "16px", color: "#888" }}>
                  Nenhum visitante encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistroP;
