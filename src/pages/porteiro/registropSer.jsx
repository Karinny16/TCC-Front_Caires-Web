import React, { useState } from "react";
import "../porteiro/Consulta.css";
import cairesd from "../../assets/cairesd.png";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ButtonR from "../../components/ButtonR";
import ButtonP from "../../components/buttonP";
import Button from "../../components/Button";
import { IoIosPower } from "react-icons/io"; // Adicione este import

function ServidoresRP() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [visitante, setVisitante] = useState(null);
  const [erroBusca, setErroBusca] = useState("");
  const [erroCpf, setErroCpf] = useState(""); // Novo estado para erro de CPF

  const handleClick = () => {
    navigate("/T");
  };

  function formatarCpf(valor) {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");
    // Limita a 11 dígitos
    valor = valor.slice(0, 11);
    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  }

  // Função de busca (você pode implementar depois)
  const buscarPrestador = async () => {
    setErroBusca("");
    setVisitante(null);
    setErroCpf(""); // Limpa erro de CPF
    if (!cpf || cpf.length !== 14) { // 14 caracteres com pontos e traço
      setErroCpf("Digite corretamente");
      return;
    }
    try {
      const resp = await fetch(`http://localhost:3333/visitantes/cpf/${cpf}`);
      console.log("Status da resposta:", resp.status);
      if (resp.ok && resp.status !== 204) {
        const data = await resp.json();
        const resultado = data?.message || data;
        let visitantesArray = Array.isArray(resultado) ? resultado : [resultado];
        visitantesArray = visitantesArray.map(v => ({ ...v, dataHora: new Date().toLocaleString() }));
        setVisitante(visitantesArray);
        console.log("Visitante preenchido:", visitantesArray);
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
    <>
      {/* Botão de logout fora do card, canto superior esquerdo */}
      <button
        className="logout-top-left"
        onClick={() => navigate("/")}
        title="Sair"
      >
        <IoIosPower size={48} color="white" />
      </button>

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
                  placeholder="Procurar visitantes por CPF"
                  value={cpf}
                  onChange={e => {
                    setCpf(formatarCpf(e.target.value));
                    setErroCpf(""); // Limpa erro ao digitar
                  }}
                  onKeyDown={function(e) { if (e.key === 'Enter') { buscarPrestador(); } }}
                />
                {erroCpf && (
                  <div style={{ color: 'red', marginTop: 5 }}>{erroCpf}</div>
                )}
              </div>
            </div>
            <div className="div-but">
              <button className="custom-button-cad13" onClick={buscarPrestador}>
                CONSULTAR
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
              {/* Exibe a imagem do visitante, se houver */}
              {visitante[0]?.imagem && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <img
                    src={`http://localhost:3333/uploads/${visitante[0].imagem}`}
                    alt="Foto do visitante"
                    className="foto-visitante-redonda"
                  />
                </div>
              )}
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
                <span className="info-label">Status de permissão:</span> {visitante[0].permissao}
              </div>
              <div className="info-row">
                <span className="info-label">Unidade:</span>{" "}
                {Array.isArray(visitante)
                  ? visitante.map(v => v.id_unidade).filter(Boolean).join(", ")
                  : visitante.id_unidade}
              </div>
              {/* Motivo só aparece se permissão for negado */}
              {visitante[0]?.permissao === "negado" && (
                <div className="info-row">
                  <span className="info-label">Motivo:</span> {visitante[0].motivo}
                </div>
              )}
            
            </div>
          )}
          <div className="botao"></div>
          <div className="div-button21">
         
          </div>
        </div>
      </div>
    </>
  );
}

export default ServidoresRP;