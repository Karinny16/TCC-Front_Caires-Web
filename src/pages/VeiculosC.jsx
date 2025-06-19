import "./VeiculosC.css";
import Title from "../components/Title";
import Button from "../components/Button";
import MeuMenu from "../components/MeuMenu";
import { FaCar } from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VeiculosC() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [cor, setCor] = useState("");
  const [tipo_veiculo, setTipo_Veiculo] = useState("");
  const [fkIdMorador, setFkIdMorador] = useState("");

  const navigate = useNavigate();

  function isPlacaValida(placa) {
    return /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/.test(placa);
  }

  function handleCadastrar() {
    if (!modelo || !placa || !cor || !tipo_veiculo || !fkIdMorador) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!isPlacaValida(placa)) {
      alert("Placa inválida! Use o padrão Mercosul (ex: ABC1D23).");
      return;
    }

    const veiculo = {
      modelo,
      placa,
      cor,
      tipo_veiculo,
      fk_id_morador: fkIdMorador,
    };

    fetch("http://localhost:3333/veiculo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veiculo),
    })
      .then((resp) => {
        if (resp.status === 201) {
          alert("Veículo cadastrado com sucesso!");
          navigate("/VeiculosR");
        } else {
          return resp.json().then((data) => {
            throw new Error(data.message || "Erro ao cadastrar.");
          });
        }
      })
      .catch((error) => {
        console.error("Erro:", error.message);
        alert(error.message || "Erro ao cadastrar veículo.");
      });
  }

  return (
    <div className="container">
      <div className="othe-side">
        <div className="conten-1">
          <div>
            <MeuMenu />
          </div>
          <Title>Adicionar um novo Veículo:</Title>
          <div className="phot-circle">
              
                <FaCar  size={170} color="#555" />
            </div>
        </div>
      </div>

      <div className="direita-side">
        <div className="tamanho"></div>
        <div className="putbu">
          <div className="input-container">
            <Title>Modelo:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>Placa:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </div>
          <div className="input-container">
            <Title>Cor:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>Tipo:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o tipo_veiculo"
              value={tipo_veiculo}
              onChange={(e) => setTipo_Veiculo(e.target.value)}
            />
          </div>
          <div className="input-container">
            <Title>ID do Morador:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a ID do Morador"
              value={fkIdMorador}
              onChange={(e) => setFkIdMorador(e.target.value)}
            />
          </div>

 <div className="contente-3"></div>
          <div className="contente-2">
            <div className="button-div">         
                 <Button
              text="VOLTAR"
              onClick={() => navigate("/VeiculosR")}
            />

            <Button
              text="CADASTRAR"
              onClick={handleCadastrar}
            />
          </div>
        </div>
            </div>

      </div>
    </div>
  );
}


export default VeiculosC;
