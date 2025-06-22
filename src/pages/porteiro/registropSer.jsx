import React, { useState } from "react";
import "../porteiro/Consulta.css";
import cairesd from "../../assets/cairesd.png";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ButtonR from "../../components/ButtonR";
import ButtonP from "../../components/buttonP";
import Button from "../../components/Button";

function ServidoresRP() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [visitante, setVisitante] = useState(null);
  const [erroBusca, setErroBusca] = useState("");

  const handleClick = () => {
    navigate("/T");
  };

  // Função de busca (você pode implementar depois)
  const buscarPrestador = async () => {
    setErroBusca("");
    setVisitante(null);
    if (!cpf) return;
    try {
      const resp = await fetch(`http://localhost:3333/visitantes/cpf/${cpf}`);
      console.log("Status da resposta:", resp.status);
      if (resp.ok && resp.status !== 204) {
        const data = await resp.json();
        const resultado = data?.message || data;
        const registroComData = {
          ...resultado,
          dataHora: new Date().toLocaleString()
        };
        setVisitante(registroComData);
        console.log("Visitante preenchido:", registroComData);
      } else if (resp.status === 404 || resp.status === 204) {
        setErroBusca("Visitante não encontrado. Deseja cadastrá-lo?");
      } else {
        setErroBusca("Erro ao buscar visitante.");
      }
    } catch (e) {
      setErroBusca("Erro ao buscar visitante.");
    }
  };
  return (
    <div className="container">
      {/* Botões no topo */}
      <div className="containe-botoes">
        <ButtonP />
    
      </div>
      <div className="oest-side">
        <div className="content-1">
          <img src={cairesd} alt="Logo" className="img-cad" />
        </div>
        <div className="busca-2">
          <div className="div-a">
            <div className="busca-contain">
              <IoIosSearch size={20} color="black" className="input-icon" />
              <input
                type="text"
                className="procurar-campo"
                placeholder="procurar visitantes por CPF"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                onKeyDown={function(e) { if (e.key === 'Enter') { buscarPrestador(); } }}
              />
            </div>
          </div>
          <div className="div-but">
            <button className="custom-button-cad13" onClick={buscarPrestador}>
              ACESSAR
            </button>
          </div>
        </div>
      </div>
      <div className="righ-side">
        {erroBusca && (
          <div style={{ color: 'red', marginTop: 10 }}>
            {erroBusca}
            {erroBusca.includes("Deseja cadastrá-lo") && (
              <div style={{ marginTop: 10 }}>
                <button
                  className="custom-button-cad12"
                  onClick={() => navigate("/visitantesCP")}
                >
                  Cadastrar Visitante
                </button>
              </div>
            )}
          </div>
        )}
       {visitante && (
          <div className="resultado-morador">
           <div className={`badge${visitante[0]?.permissao === "negado" ? " negado" : ""}`}>
              Visitante já cadastrado
            </div>
            <div className="info-row">
              <span className="info-label">Nome:</span> {visitante[0].nome}
            </div>
            <div className="info-row">
              <span className="info-label">CPF:</span> {visitante[0].cpf}
            </div>
            <div className="info-row">
              <span className="info-label">RG:</span> {visitante[0].rg}
            </div>
            <div className="info-row">
              <span className="info-label">Nível de acesso:</span> {visitante[0].nivel_acesso}
            </div>
            <div className="info-row">
              <span className="info-label">Status de permição:</span> {visitante[0].permissao}
            </div>
             <div className="info-row">
              <span className="info-label">Unidade:</span> {visitante[0].id_unidade}
            </div>
            <div className="info-row">
              <span className="info-label">Data/Hora da consulta:</span> {visitante.dataHora}
            </div>
          </div>
        )}
        <div className="botao"></div>
        <div className="div-button21">
          <button className="custom-button-cad12" onClick={handleClick}>
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServidoresRP;