import React, { useEffect } from 'react';
import Title from "../../components/Title";
import Button from "../../components/Button";
import DropdownWithRadios from "../../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MenuPorteiro from "../../components/MenuPorteiro";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

// Schema de validação para visitante
const FormCardSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  cpf: z.string().min(14, "CPF obrigatório"),
  rg: z.string().optional(),
  nivel_acesso: z.string().nonempty("Selecione o nível de acesso"),
  genero: z.string().nonempty("Selecione o gênero"),
  permissao: z.enum(["negado", "permitido"], { message: "Selecione a permissão" }),
  motivo: z.string().max(50, "Máximo 50 caracteres").optional(),
}).refine((data) => {
  if (data.permissao === "negado") {
    return !!data.motivo && data.motivo.trim().length > 0;
  }
  return true;
}, {
  message: "Informe o motivo da negação",
  path: ["motivo"],
});

const NIVEL_ACESSO_OPTIONS = [
  "Visitante Comum",
  "Visitante Permanente",
  "Prestador de Serviço"
];

function AtualizarVisitante({ imageUrl }) {
  const navigate = useNavigate();
  const { id_visitante } = useParams();

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
      rg: "",
      nivel_acesso: "",
      genero: "",
      permissao: "",
      motivo: "",
    },
  });

  // Buscar dados do visitante ao montar
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`http://localhost:3333/visitantes/${id_visitante}`);
        if (resp.ok) {
          const data = await resp.json();
          const visitante = Array.isArray(data.message) ? data.message[0] : data.message;
          setValue("nome", visitante.nome);
          setValue("cpf", visitante.cpf);
          setValue("rg", visitante.rg || "");
          setValue("nivel_acesso", visitante.nivel_acesso);
          setValue("genero", visitante.id_genero?.toString() || "");
          setValue("permissao", visitante.permissao || "");
          setValue("motivo", visitante.motivo || "");
        }
      } catch (e) {
        alert("Erro ao buscar dados do visitante.");
      }
    }
    fetchData();
  }, [id_visitante, setValue]);

  const handleClick = () => {
    navigate("/visitantesP");
  };

  const onSubmit = async (data) => {
    try {
      const visitanteData = {
        nome: data.nome,
        cpf: data.cpf,
        rg: data.rg,
        nivel_acesso: data.nivel_acesso,
        id_genero: Number(data.genero),
        permissao: data.permissao,
        motivo: data.permissao === "negado" ? data.motivo : "Morador permitido",
      };
      const resp = await fetch(`http://localhost:3333/visitantes/${id_visitante}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitanteData),
      });

      if (resp.ok) {
        alert("Visitante atualizado com sucesso!");
        navigate("/visitantesP");
      } else {
        alert("Erro ao atualizar visitante.");
      }
    } catch (e) {
      alert("Erro de conexão.");
    }
  };

  return (
    <div className="container teste">
      <div className="other-side">
        <div className="contente-1">
          <MenuPorteiro />
          <Title>Atualizar Visitante:</Title>
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
              {...register("cpf")}
              placeholder="Digite seu CPF (000.000.000-00)"
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
              {...register("rg")}
              placeholder="Digite seu RG"
            />
            {errors.rg && (
              <span style={{ color: "red" }}>{errors.rg.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Nível de Acesso:</Title>
            <select
              className="input-fields"
              {...register("nivel_acesso")}
              defaultValue=""
            >
              <option value="" disabled>Selecione o nível de acesso</option>
              {NIVEL_ACESSO_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.nivel_acesso && (
              <span style={{ color: "red" }}>{errors.nivel_acesso.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Gênero:</Title>
            <DropdownWithRadios
              value={watch("genero")}
              onChange={(val) => setValue("genero", val, { shouldValidate: true })}
            />
            {errors.genero && (
              <span style={{ color: "red" }}>{errors.genero.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Permissão:</Title>
            <select
              className="input-fields"
              {...register("permissao")}
              defaultValue=""
            >
              <option value="" disabled>Selecione a permissão</option>
              <option value="permitido">Permitido</option>
              <option value="negado">Negado</option>
            </select>
            {errors.permissao && (
              <span style={{ color: "red" }}>{errors.permissao.message}</span>
            )}
          </div>

          {watch("permissao") === "negado" && (
            <div className="input-container">
              <Title>Motivo da Negação:</Title>
              <input
                type="text"
                className="input-fields"
                {...register("motivo")}
                placeholder="Digite o motivo da negação"
                maxLength={50}
              />
              {errors.motivo && (
                <span style={{ color: "red" }}>{errors.motivo.message}</span>
              )}
            </div>
          )}

          <div className="button-div">
            <Button text="VOLTAR" type="button" onClick={handleClick} />
            <Button type="submit" text="ATUALIZAR" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AtualizarVisitante;
