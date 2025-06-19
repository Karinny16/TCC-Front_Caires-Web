import SelectE from "../../components/SelectE";
import PickDate from "../../components/PickDate";
import MeuMenu from "../../components/MeuMenu";

import Title from "../../components/Title";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function EventosA() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Funciocondo");
  };
  return (
    <div class="container teste">
      <div class="other-side">
        {/* <div class="contente-1"> */}
        <div>
      <MeuMenu /> {/* Aqui o menu aparece na tela */}
    </div>
        <Title>Adicionar um novo Evento:</Title>
        {/* <div class="photo-circle">
        </div>

        </div> */}
      </div>

      <div className="direita-side">
        <div className="putbu">
          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="input-container">
            <Title>Título do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o título do evento"
            />
          </div>
          <div className="input-container">
            <Title>Descrição do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a descrição do evento"
            />
          </div>
          <div>
            <SelectE />
          </div>
        <div className="input-container">
          <Title>Início do Evento:</Title>
          <PickDate />

        </div>
        <div className="input-container">
          <Title>Fim do Evento:</Title>
          <PickDate />

        </div>
        <div className="input-container">
          <Title>Cor:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite a cor"
          />
        </div>
        <div className="input-container">
          <Title>Status do Pagamento:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite o status do pagamento. ex:Pendente"
          />
        </div>

        <div className="contente-3"></div>
        <div class="contente-2">
          <div className="button-div">
           <Button
                  text="ATUALIZAR"
                  onClick={() => alert("Botão clicado!")} // Função de clique
                />

                <Button
                  text="EXCLUIR"
                  onClick={() => alert("Botão clicado!")} // Função de clique
                />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default EventosA;
