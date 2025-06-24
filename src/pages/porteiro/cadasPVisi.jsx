import React from 'react';
import Title from "../../components/Title";
import Button from "../../components/Button";
import DropdownWithRadios from "../../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MenuPorteiro from "../../components/MenuPorteiro";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FiImage } from "react-icons/fi";
import CustomAlert from "../../components/CardAlert.jsx";

// Schema de validação para visitante
const FormCardSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  cpf: z.string().min(14, "CPF obrigatório"),
  rg: z.string().optional(),
  nivel_acesso: z.string().nonempty("Selecione o nível de acesso"),
  genero: z.string().nonempty("Selecione o gênero"),
  id_unidade: z.string().nonempty("Informe a unidade"), // novo campo obrigatório
});

const NIVEL_ACESSO_OPTIONS = [
  "Visitante Comum",
  "Visitante Permanente",
  "Prestador de Serviço"
];

function CadasPvisi({ imageUrl }) {
  const navigate = useNavigate();
  const [imagem, setImagem] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [alertMsg, setAlertMsg] = React.useState(""); // <-- ALERTA
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
      nivel_acesso: "",
      genero: "",
      id_unidade: "", // novo campo
    },
  });

  const handleClick = () => {
    navigate("/visitantesP");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("cpf", data.cpf);
      formData.append("rg", data.rg);
      formData.append("nivel_acesso", data.nivel_acesso);
      formData.append("id_genero", data.genero);
      if (imagem) {
        formData.append("imagem", imagem);
      }

      // 1. Cadastra visitante com imagem
      const resp = await fetch("http://localhost:3333/visitantes", {
        method: "POST",
        body: formData,
      });

      if (resp.ok) {
        const visitanteCriado = await resp.json();
        const id_visitante = visitanteCriado.id_visitante;
        if (!id_visitante) {
          setAlertMsg("Erro: id_visitante não retornado pelo backend.");
          return;
        }
        // 2. Faz associação com unidade
        const assocResp = await fetch("http://localhost:3333/moradorVisitanteAssociacao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_visitante,
            id_unidade: data.id_unidade,
          }),
        });

        if (assocResp.ok) {
          setAlertMsg("Visitante cadastrado e associado à unidade com sucesso!");
          setTimeout(() => navigate("/visitantesP"), 1500);
        } else {
          setAlertMsg("Visitante cadastrado, mas erro ao associar à unidade.");
        }
      } else {
        // Tenta pegar mensagem do backend para CPF/RG duplicado
        let msg = "Erro ao cadastrar visitante.";
        try {
          const errorData = await resp.json();
          if (errorData && errorData.message) {
            msg = errorData.message; // <-- Mostra a mensagem do backend
          }
        } catch {}
        setAlertMsg(msg);
      }
    } catch (e) {
      setAlertMsg("Erro de conexão.");
    }
  };

  // Atualiza preview ao selecionar imagem
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="container teste">
      <CustomAlert message={alertMsg} onClose={() => setAlertMsg("")} />
      <div className="other-side">
        <div className="contente-1">
          <MenuPorteiro />
          <Title>Adicionar um novo Visitante:</Title>
          <div className="photo-circle">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" />
            ) : imageUrl ? (
              <img src={imageUrl} alt="User" />
            ) : (
              <IoPersonCircleOutline size={550} color="#555" />
            )}
          </div>
          {/* Input de foto abaixo do círculo */}
          <div className="input-container" style={{ marginTop: 16, position: "relative" }}>
            <label className="custom-file-label">
              <FiImage className="icon-image-upload" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
                style={{ display: "none" }}
              />
              <span className="custom-file-text">Selecionar imagem</span>
            </label>
          </div>
        </div>
      </div>

      <div className="direita-side">
        <form className="putbu" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
            <Title>Unidade (associação):</Title>
            <input
              type="text"
              className="input-fields"
              {...register("id_unidade")}
              placeholder="Digite o id da unidade para associação"
            />
            {errors.id_unidade && (
              <span style={{ color: "red" }}>{errors.id_unidade.message}</span>
            )}
          </div>

          <div className="button-div">
            <Button text="VOLTAR" type="button" onClick={handleClick} />
            <Button type="submit" text="ENVIAR" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadasPvisi;
