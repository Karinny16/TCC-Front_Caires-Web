import Title from "../components/Title";
import Button from "../components/Button";
import PickDate from "../components/PickDate";
import { BsBuildings } from "react-icons/bs";
import MenuPorteiro from "../components/MenuPorteiro";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCardSchema, formatDate } from "../components/FormCad";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PedidosC() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "all",
    resolver: zodResolver(FormCardSchema),
    defaultValues: {
      empresa: "",
      data: "",
      status_entrega: "",
      id_unidade: "",
    },
  });

  const handleClick = () => {
    navigate("/pedidosP");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://sua-api.com/endpoint', data);
      console.log("Dados enviados com sucesso:", response.data);
      
      reset();
      // navigate('/rotaDeSucesso');
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="container">
      <div className="othe-side">
        <div className="conten-1">
          <div>
            <MenuPorteiro />
          </div>
          <Title>Adicionar uma nova encomenda:</Title>
          <div className="photo-circle">
            <BsBuildings size={150} color="#555" />
          </div>
        </div>
      </div>

      <div className="direit-side">
        <div className="tamanho"></div>
        <form className="putb" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Title>Empresa:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("empresa")}
              placeholder="Digite a empresa"
            />
            {errors.empresa && (
              <span style={{ color: "red" }}>{errors.empresa.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Id_Unidade:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("id_unidade")}
              placeholder="Digite o id da unidade"
            />
            {errors.id_unidade && (
              <span style={{ color: "red" }}>{errors.id_unidade.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Data da Entrega:</Title>
            <input
              type="text"
              className="input-fields"
              value={watch("data")}
              placeholder="DD/MM/AAAA"
              onChange={(e) => {
                const formatted = formatDate(e.target.value);
                setValue("data", formatted, { shouldValidate: true });
              }}
            />
            {errors.data && (
              <span style={{ color: "red" }}>{errors.data.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Status da Entrega:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("status_entrega")}
              placeholder="Digite o status. ex: Pendente, Processando"
            />
            {errors.status_entrega && (
              <span style={{ color: "red" }}>
                {errors.status_entrega.message}
              </span>
            )}
          </div>
            
          <div className="contente-3"></div>

          <div className="contente-2">
            <div className="button-div">
              <Button text="VOLTAR" onClick={handleClick} />
              <Button type="submit" text="ENVIAR" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PedidosC;
