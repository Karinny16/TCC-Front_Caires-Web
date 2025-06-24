import React from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { FiImage, FiPackage } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MenuPorteiro from "../../components/MenuPorteiro";

function CadasEncomenda() {
  const navigate = useNavigate();
  const [imagem, setImagem] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      empresa: "",
      id_unidade: "",
      status_entrega: "",
      data_entrega: "",
    },
  });

  const handleClick = () => {
    navigate("/pedidosP");
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("empresa", data.empresa);
      formData.append("id_unidade", data.id_unidade);
      formData.append("status_entrega", data.status_entrega);
      formData.append("data_entrega", data.data_entrega);
      if (imagem) formData.append("imagem", imagem);

      const resp = await fetch("http://localhost:3333/encomendas", {
        method: "POST",
        body: formData,
      });

      if (resp.ok) {
        alert("Encomenda cadastrada com sucesso!");
        reset();
        setPreviewUrl(null);
        setImagem(null);
        navigate("/pedidosP");
      } else {
        alert("Erro ao cadastrar encomenda.");
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
          <Title>Adicionar uma nova Encomenda:</Title>
          <div className="photo-circle">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" />
            ) : (
              <FiPackage size={180} color="#809ad1" />
            )}
          </div>
          {/* Input de foto abaixo do círculo */}
          <div
            className="input-container"
            style={{ marginTop: 16, position: "relative" }}
          >
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
        <form
          className="putbu"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="input-container">
            <Title>Empresa:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("empresa", { required: true })}
              placeholder="Digite o nome da empresa"
            />
            {errors.empresa && (
              <span style={{ color: "red" }}>Campo obrigatório</span>
            )}
          </div>

          <div className="input-container">
            <Title>Vínculo de Unidade:</Title>
            <input
              type="text"
              className="input-fields"
              {...register("id_unidade", { required: true })}
              placeholder="Digite o vínculo da unidade"
            />
            {errors.id_unidade && (
              <span style={{ color: "red" }}>Campo obrigatório</span>
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

export default CadasEncomenda;
