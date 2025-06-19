import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import DropdownWithRadios from "../../components/Dropdown";
import MeuMenu from "../../components/MeuMenu";
import { useForm, Controller } from "react-hook-form";
import "../../styles/error.css";

function MoradoresA() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const formatCPF = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 3) v = v.slice(0, 3) + "." + v.slice(3);
    if (v.length > 7) v = v.slice(0, 7) + "." + v.slice(7);
    if (v.length > 11) v = v.slice(0, 11) + "-" + v.slice(11, 13);
    if (v.length > 14) v = v.slice(0, 14);
    return v;
  };

  const formatDate = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);
    if (v.length > 10) v = v.slice(0, 10);
    return v;
  };

  useEffect(() => {
    fetch(`http://localhost:3333/morador/${id}`)
      .then((res) => res.json())
      .then((data) => {
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (data.dt_nascimento) {
      const [dia, mes, ano] = data.dt_nascimento.split("/");
      data.dt_nascimento = `${ano}-${mes}-${dia}`;
    }

    const response = await fetch(`http://localhost:3333/morador/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Morador atualizado com sucesso!");
      navigate("/MoradoresR");
    } else {
      alert("Erro ao atualizar morador");
    }
  };

  const onDelete = async () => {
    const confirmDelete = window.confirm("Deseja realmente excluir este morador?");
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3333/morador/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Morador excluído com sucesso!");
      navigate("/MoradoresR");
    } else {
      alert("Erro ao excluir morador");
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="other-side">
        <div className="contente-1">
          <MeuMenu />
          <Title>Atualizar Morador</Title>
          <div className="photo-circle"></div>
        </div>
      </div>
      <div className="direita-side">
        <div className="tamanho"></div>
        <div className="putbu">
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu nome"
              {...register("nome", { required: true })}
            />
            {errors?.nome && <p className="error-menssage">Nome é obrigatório</p>}
          </div>

          <div className="input-container">
            <Title>CPF:</Title>
            <Controller
              name="cpf"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite seu CPF"
                  {...field}
                  onChange={(e) => field.onChange(formatCPF(e.target.value))}
                />
              )}
            />
          </div>

          <div className="input-container">
            <Title>Data de Nascimento:</Title>
            <Controller
              name="dt_nascimento"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite a data de nascimento"
                  {...field}
                  onChange={(e) => field.onChange(formatDate(e.target.value))}
                />
              )}
            />
          </div>

          <div className="input-container">
            <Title>Gênero:</Title>
            <Controller
              name="genero"
              control={control}
              defaultValue=""
              render={({ field }) => <DropdownWithRadios {...field} />}
            />
          </div>

          <div className="input-container">
            <Title>Telefone:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu telefone"
              {...register("telefone")}
            />
          </div>

          <div className="input-container">
            <Title>Email:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu email"
              {...register("email")}
            />
          </div>

          <div className="input-container">
            <Title>Apartamento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu apartamento"
              {...register("apartamento")}
            />
          </div>

          <div className="input-container">
            <Title>Bloco:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu bloco"
              {...register("bloco")}
            />
          </div>

          <div className="input-container">
            <Title>Ramal:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu ramal"
              {...register("ramal")}
            />
          </div>

          <div className="input-container">
            <Title>Senha:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite sua senha"
              {...register("senha")}
            />
          </div>

          <div className="button-div">
            <Button text="VOLTAR" onClick={() => navigate("/MoradoresR")} />
            <Button text="ATUALIZAR" type="submit" />
            <Button text="EXCLUIR" onClick={onDelete} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default MoradoresA;
