import React, { useState } from "react";
import "./impressao.css"; // Certifique-se de usar o CSS que você forneceu
import cairesd from "../assets/cairesd.png";
import certo from "../assets/certo.png";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHistorico } from "../../src/context/HistoricoContext";

function Impressao() {
  const navigate = useNavigate();
  const [id_morador, setId_morador] = useState("");
  const [morador, setMorador] = useState(null);
  const [erroBusca, setErroBusca] = useState("");
  const { historicoConsultas, setHistoricoConsultas } = useHistorico(); // Usa contexto global

  const handleClick = () => {
    navigate("/Telainicial");
  };


  
  const buscarMorador = async () => {
    setErroBusca("");
    setMorador(null);
    if (!id_morador) return;
    try {
      const resp = await fetch(`http://localhost:3333/morador/${id_morador}`);
      if (resp.ok) {
        const data = await resp.json();
        const resultado = data.message || data;
        // Adiciona data/hora ao registro
        const registroComData = {
          ...resultado,
          dataHora: new Date().toLocaleString()
        };
        setMorador(registroComData);
        setHistoricoConsultas(prev => [...prev, registroComData]);
      } else {
        setErroBusca("Morador não encontrado.");
      }
    } catch (e) {
      setErroBusca("Erro ao buscar morador.");
    }
  };

  return (
    <div class="container">
      <div class="oest-side">
        <div class="content-1">
          <img src={cairesd} alt="Logo" className="img-cad" />
        </div>
        <div class="busca-2">
          <div className="div-a">
            <div className="busca-contain">
              <IoIosSearch size={20} color="black" className="input-icon" />
              <input
                type="text"
                className="input-fiels"
                placeholder="procurar por ID do morador"
                value={id_morador}
                onChange={e => setId_morador(e.target.value)}
                onKeyDown={function(e) { if (e.key === 'Enter') { buscarMorador(); } }}
              />
            </div>
          </div>
          <div class="div-but">
            <button className="custom-button-cad13" onClick={buscarMorador}>
              ACESSAR
            </button>
          </div>
      
        </div>
      </div>
      <div class="righ-side">
        {erroBusca && <div style={{color: 'red', marginTop: 10}}>{erroBusca}</div>}
        {morador && (
          <div className="resultado-morador">
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <h1 style={{margin: 0}}>Acesso liberado</h1>
              <img src={certo} alt="Certo" style={{width: 77, height: 48, margin: 0}} />
            </div>
            <h3>Para o morador {morador.nome}</h3>
            <h4>Dados do morador</h4>
            <div><b>ID:</b> {morador.id_morador}</div>
            <div><b>Nome:</b> {morador.nome}</div>
            <div><b>Gênero:</b> {morador.genero}</div>
            <div><b>CPF:</b> {morador.cpf}</div>
            <div><b>Email:</b> {morador.email}</div>
            <div><b>Ramal:</b> {morador.ramal}</div>
            <div><b>Telefone:</b> {morador.telefone}</div>
            <div><b>Apartamento:</b> {morador.apartamento}</div>
            <div><b>Bloco:</b> {morador.bloco}</div>

            
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

export default Impressao;
