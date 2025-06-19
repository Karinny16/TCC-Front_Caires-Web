import SelectE from "../components/SelectE";
import PickDate from "../components/PickDate";
import MeuMenu from "../components/MeuMenu";

import Title from "../components/Title"; // Certifique-se de que o caminho está correto
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EventosC() {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [tituloEvento, setTituloEvento] = useState("");
  const [descricaoEvento, setDescricaoEvento] = useState("");
  const [tipo, setTipo] = useState(""); // Certifique-se de que o tipo está sendo capturado
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [cor, setCor] = useState("");
  const [statusPagamento, setStatusPagamento] = useState("");
  const [fkIdMorador, setFkIdMorador] = useState("");

  const handleClick = () => {
    navigate("/Funciocondo");
  };

  const formatarData = (data) => {
    return data
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a primeira barra
      .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a segunda barra
      .slice(0, 10); // Limita o tamanho a 10 caracteres
  };

  const handleCadastrar = async () => {
    console.log({
      cpf,
      tituloEvento,
      descricaoEvento,
      tipo,
      dataInicio,
      dataFim,
      cor,
      statusPagamento,
      fkIdMorador,
    }); // Log para verificar os valores dos estados

    if (!cpf || !tituloEvento || !descricaoEvento || !tipo || !dataInicio || !dataFim || !cor || !statusPagamento || !fkIdMorador) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const evento = {
      cpf,
      titulo_evento: tituloEvento,
      descricao_evento: descricaoEvento,
      tipo,
      inicio_evento: formatarData(dataInicio),
      fim_evento: formatarData(dataFim),
      cor,
      status_pagamento: statusPagamento,
      fk_id_morador: fkIdMorador,
    };

    try {
      const response = await fetch("http://localhost:3333/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      });

      if (response.ok) {
        alert("Evento cadastrado com sucesso!");
      } else {
        const error = await response.json();
        alert(`Erro ao cadastrar evento: ${error.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container teste">
      <div className="other-side">
        <div>
          <MeuMenu /> {/* Aqui o menu aparece na tela */}
        </div>
        <Title>Adicionar um novo Evento:</Title>
      </div>

      <div className="direita-side">
        <div className="putbu">
          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>Título do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o título do evento"
              value={tituloEvento}
              onChange={(e) => setTituloEvento(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>Descrição do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a descrição do evento"
              value={descricaoEvento}
              onChange={(e) => setDescricaoEvento(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>Tipo do Evento:</Title>
            <select
              className="input-fields"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione o tipo</option> {/* Valor padrão vazio */}
              <option value="Evento">Evento</option>
              <option value="Comunicado">Comunicado</option>
            </select>
          </div>

          <div className="input-container">
            <Title>Início do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a data de início (ex: DD/MM/AAAA)"
              value={dataInicio}
              onChange={(e) => setDataInicio(formatarData(e.target.value))}
            />
          </div>

          <div className="input-container">
            <Title>Fim do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a data de término (ex: DD/MM/AAAA)"
              value={dataFim}
              onChange={(e) => setDataFim(formatarData(e.target.value))}
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
            <Title>Status do Pagamento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o status do pagamento. ex: Pendente"
              value={statusPagamento}
              onChange={(e) => setStatusPagamento(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Title>ID do Morador:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o ID do morador"
              value={fkIdMorador}
              onChange={(e) => setFkIdMorador(e.target.value)}
            />
          </div>

          <div className="contente-3"></div>
          <div className="contente-2">
            <div className="button-div">
              <Button
                text="VOLTAR"
                onClick={handleClick}
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

export default EventosC;
