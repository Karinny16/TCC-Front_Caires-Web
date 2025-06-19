import React from 'react';
import Title from "../../components/Title";
import SelectV from "../../components/SelectV";
import Button from "../../components/Button";
import DropdownWithRadios from "../../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FormCardSchema, formatTelefone, formatCPF, formatRG } from "../../components/FormCad";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MenuPorteiro from "../../components/MenuPorteiro";
import { useNavigate } from "react-router-dom";

function CadasPvisi({ imageUrl }) {
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
      nome: "",
      cpf: "",
      rg: "",
      telefone: "",
      genero: "",
      id_unidade: "",
      visitantes: "",
    },
  });

  const handleClick = () => {
    navigate("/visitantesP");
  };

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="container teste">
      <div className="other-side">
        <div className="contente-1">
          <div>
            <MenuPorteiro />
          </div>
          <Title>Adicionar um novo Visitante:</Title>
          <div className="photo-circle">
            {imageUrl ? (
              <img src={imageUrl} alt="User" />
            ) : (
              <IoPersonCircleOutline size={550} color="#555" />
            )}
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
            <Title>RG:</Title>
            <input
              type="text"
              className="input-fields"
              value={watch("rg")}
              placeholder="Digite seu RG"
              onChange={(e) => {
                const formatted = formatRG(e.target.value);
                setValue("rg", formatted, { shouldValidate: true });
              }}
            />
            {errors.rg && (
              <span style={{ color: "red" }}>{errors.rg.message}</span>
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
            <Title>Telefone:</Title>
            <input
              type="text"
              className="input-fields"
              value={watch("telefone")}
              placeholder="Digite seu Telefone"
              onChange={(e) => {
                const formatted = formatTelefone(e.target.value);
                setValue("telefone", formatted, { shouldValidate: true });
              }}
            />
            {errors.telefone && (
              <span style={{ color: "red" }}>{errors.telefone.message}</span>
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

          <div>
            <SelectV
              value={watch("visitantes")}
              onChange={(val) => setValue("visitantes", val)}
            />
            {errors.visitantes && (
              <span style={{ color: "red" }}>{errors.visitantes.message}</span>
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

export default CadasPvisi;
