import Title from "../../components/Title";
import Button from "../../components/Button";
import MeuMenu from "../../components/MeuMenu";

function VeiculosA() {
  return (
    <div class="container ">
      <div class="othe-side">
        <div class="conten-1">
          <div>
            <MeuMenu />
          </div>
          <Title>Adicionar um novo Veículo:</Title>
          <div class="phot-circle"></div>
        </div>
      </div>

      <div className="direit-side">
        <div className="tamanho"></div>
        <div className="putb">
          <div className="input-container">
            <Title>Modelo:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o modelo"
            />
          </div>

          <div className="input-container">
            <Title>Placa:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a placa"
            />
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
            <Title>Tipo:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o tipo"
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
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default VeiculosA;
