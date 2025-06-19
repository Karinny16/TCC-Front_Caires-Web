import Title from "../components/Title";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import DropdownWithRadios from "../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


import MeuMenu from "../components/MeuMenu";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "../styles/error.css";
function MoradoresC() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();


  console.log({ errors });
  const onSubmi = (data) => {
    console.log(data);
    insertMorador(data);
  };

  
  const navigate = useNavigate();

  // Função para formatar a data enquanto digita
  const formatDate = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);
    if (v.length > 10) v = v.slice(0, 10);
    return v;
  };

  // Função para formatar o CPF enquanto digita
  const formatCPF = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 3) v = v.slice(0, 3) + "." + v.slice(3);
    if (v.length > 7) v = v.slice(0, 7) + "." + v.slice(7);
    if (v.length > 11) v = v.slice(0, 11) + "-" + v.slice(11, 13);
    if (v.length > 14) v = v.slice(0, 14);
    return v;
  };

  function insertMorador(register) {
    fetch("http://localhost:3333/morador", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(register),
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const errorText = await resp.text();
          console.error("ERRO:", errorText);
          throw new Error(errorText);
        }
        return resp.json();
      })
      .then((respJSON) => {
        console.log("RESPOSTA:", respJSON);
        navigate("/");
      })
      .catch((error) => {
        console.log("ERRO:", error.message);
      });
  }
  return (
    <div class="container teste">
      <div class="other-side">
        <div class="contente-1">
          <div>
            <MeuMenu /> {/* Aqui o menu aparece na tela */}
          </div>
          <Title>Adicionar um novo Morador:</Title>
          <div class="photo-circle">
            
              <IoPersonCircleOutline size={550} color="#555" />
          </div>
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
            {errors?.nome?.type == "required" && (
              <p className="error-menssage">Nome é Obrigatorio</p>
            )}
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
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    field.onChange(formatted);
                  }}
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
                  placeholder="Digite a data de nascimento (DD/MM/AAAA)"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatDate(e.target.value);
                    field.onChange(formatted);
                  }}
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
              placeholder="Digite seu nome"
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

          <div>
            <div className="contente-3"></div>
            <div class="contente-2">
              <div className="button-div">
                <Button text="VOLTAR"
                onClick={() => navigate("/MoradoresR")} />

                <Button
                  text="CADASTRAR"
                  onClick={() => {
                    handleSubmit(onSubmi)();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoradoresC;
