import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonAz from "../../components/ButtonAz";
import MeuMenu  from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CardGeral from "../CardGeral";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function MoradoresR() {
    const navigate = useNavigate();

  const [moradores, setMoradores] = useState([]);
  const [filteredMoradores, setFilteredMoradores] = useState([]); // Estado para moradores filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  useEffect(() => {
    fetch('http://localhost:3333/morador', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((resp) => resp.json())
      .then((morador) => {
        const lista = Array.isArray(morador.message) ? morador.message : [];
        setMoradores(lista);
        setFilteredMoradores(lista); // Inicializa os moradores filtrados
      })
      .catch((err) => {
        console.error("Erro ao buscar moradores:", err);
        setMoradores([]);
        setFilteredMoradores([]);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = moradores.filter((morador) =>
      morador.nome.toLowerCase().includes(term) ||
      morador.id_unidade.toString().toLowerCase().includes(term) || // Filtra pela unidade
      morador.cpf.toLowerCase().includes(term) // Filtra pelo CPF
    );
    setFilteredMoradores(filtered);
  };

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
                <MeuMenu  /> {/* Aqui o menu aparece na tela */}
              </div>
              <img src={cairesa} alt="Logo" className="img-cadA" />
              <div className="icon-contain">
                <IoAddCircleOutline
                  size={50}
                  color="black"
                  className="more-icon"
                  onClick={() => navigate("/moradoresc")} 
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
                  onChange={handleSearch} // Adiciona o evento de busca
                />
              </div>
            </div>
          </div>

          {/* Lista de Informações */}
          <div className="label-side">
            <div className="div-label">
              <p>Nome</p>
              <p>Unidade</p>
              <p>CPF</p>
            </div>
            {Array.isArray(filteredMoradores) && filteredMoradores.length > 0 ? (
              filteredMoradores.map((morador, idx) => (
                <CardGeral
                  key={morador.id_morador || idx}
                  campo1={morador.nome}
                  campo2={morador.id_unidade}
                  campo3={morador.cpf}
                  id_morador={morador.id_morador}
                  rota="moradoresa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>Nenhum morador encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoradoresR;
