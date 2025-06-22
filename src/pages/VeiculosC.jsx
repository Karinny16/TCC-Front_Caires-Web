import "./VeiculosC.css";
import Title from "../components/Title";
import Button from "../components/Button";
import MeuMenu from "../components/MeuMenu";
import { FaCar } from "react-icons/fa";
import { FormCardSchema } from "../components/FormCad";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function VeiculosC() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "all",
    resolver: zodResolver(FormCardSchema),
    defaultValues: {
      modelo: "",
      placa: "",
      tipo: "",
      cor: "",
      id_unidade: "",
    },
  });

  const onSubmit = (data) => {
        console.log("Dados do formulário:", data);
    fetch("http://localhost:3333/veiculo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),          
    })
      .then((resp) => {
        if (resp.status === 201) {
          alert("Veículo cadastrado com sucesso!");
          navigate("/VeiculosR");
        } else {
          return resp.json().then((body) => {
            throw new Error(body.message || "Erro ao cadastrar.");
          });
        }
      })
      .catch((err) => {
        console.error("Erro:", err.message);
        alert(err.message || "Erro ao cadastrar veículo.");
      });
  };

  return (
    <div className="container">
      <div className="other-side">
        <div className="contente-1">
          <MeuMenu />
          <Title>Adicionar um novo Veículo:</Title>
          <div className="photo-circle">
            <FaCar size={170} color="#555" />
          </div>
        </div>
      </div>

      <div className="direita-side">
        <form className="putbu" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Title>Modelo:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("modelo")}
              placeholder="Informe o modelo do veículo"
            />
            {errors.modelo && (
              <span style={{ color: "red" }}>{errors.modelo.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Placa:</Title>
            <input
              type="text"
              className="input-fields"
              value={watch("placa")}
              placeholder="Digite a placa (ABC1D23)"
              onChange={(e) => {
                // mantém em maiúsculo para combinar com o regex
                setValue("placa", e.target.value.toUpperCase(), {
                  shouldValidate: true,
                });
              }}
            />
            {errors.placa && (
              <span style={{ color: "red" }}>{errors.placa.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Cor:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("cor")}
              placeholder="Digite a cor do veículo"
            />
            {errors.cor && (
              <span style={{ color: "red" }}>{errors.cor.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Tipo:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("tipo")}
              placeholder="Digite o tipo do veículo"
            />
            {errors.tipo && (
              <span style={{ color: "red" }}>{errors.tipo.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Id Unidade:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("id_unidade")}
              placeholder="Digite o id da unidade"
            />
            {errors.id_unidade && (
              <span style={{ color: "red" }}>
                {errors.id_unidade.message}
              </span>
            )}
          </div>
          
          <div className="contente-3"></div>
          <div className="contente-2">
            <div className="button-div">
              <Button text="VOLTAR" onClick={() => navigate("/VeiculosR")} />
              <Button type="submit" text="CADASTRAR" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VeiculosC;
