import Title from "../../components/Title";
import Button from "../../components/Button";
import DropdownWithRadios from "../../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MenuPorteiro from "../../components/MenuPorteiro";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCardSchema, formatDate, formatCPF } from "../../components/FormCad";

function CadasPSer() {
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
      nome: "",
      cpf: "",
      genero: "",
      uf: "",
      id_unidade: "",


    },
  });

  const handleClick = () => {
    navigate("/servidorP");
  };

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="container teste">
      <div className="other-side">
        <div className="contente-1">
          <MenuPorteiro />

          <Title>Adicionar um novo Prestador de serviço:</Title>
          <div className="photo-circle">
            <IoPersonCircleOutline size={550} color="#555" />
          </div>
        </div>
      </div>

      <div className="direita-side">
        <form className="putbu" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("nome")}
              placeholder="Digite o seu nome"
            />
            {errors.nome && (
              <span style={{ color: "red" }}>{errors.nome.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              value={watch("cpf")}
              placeholder="Digite seu CPF"
              onChange={(e) => {
                const formatted = formatCPF(e.target.value);
                setValue("cpf", formatted, { shouldValidate: true });
              }}
            />
            {errors.cpf && (
              <span style={{ color: "red" }}>{errors.cpf.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Gênero:</Title>
            <DropdownWithRadios
              value={watch("genero")}
              onChange={(val) => setValue("genero", val)}
            />
            {errors.genero && (
              <span style={{ color: "red" }}>{errors.genero.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>UF:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("uf")}
              placeholder="Digite seu UF"
            />
            {errors.uf && (
              <span style={{ color: "red" }}>{errors.uf.message}</span>
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

export default CadasPSer;
