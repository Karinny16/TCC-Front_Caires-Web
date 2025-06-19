import Title from "../components/Title";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import DropdownWithRadios from "../components/Dropdown";
import { IoPersonCircleOutline } from "react-icons/io5";

import MeuMenu from "../components/MeuMenu";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ResindenciaC() {
  const navigate = useNavigate();
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
    insertResidencia(data);
  };


  function insertResidencia(register) {
    fetch("http://localhost:3333/residencia", {
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
        alert("Unidade cadastrado com sucesso!");
        navigate("/MoradoresR");
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
          <Title>Adicionar uma nova unidade:</Title>
        </div>
      </div>

      <div className="direita-side">
        <div className="tamanho"></div>
        <div className="putbu">
          <div className="input-container">
            <Title>Bloco:</Title>
            <input
              type="number"
              className="input-fields"
              placeholder="Digite o bloco"
              {...register("bloco", { required: true })}
            />
            {errors?.bloco?.type == "required" && (
              <p className="error-menssage">Bloco é Obrigatorio</p>
            )}
          </div>

          <div className="input-container">
            <Title>Andar:</Title>
            <input
              type="number"
              className="input-fields"
              placeholder="Digite o andar"
              {...register("andar", { required: true })}
            
            />
            {errors?.andar?.type == "required" && (
              <p className="error-menssage">Andar é Obrigatorio</p>
            )}
          </div>
          <div className="input-container">
            <Title>Apartamento:</Title>
            <input
              type="number"
              className="input-fields"
              placeholder="Digite o apartamento"
              {...register("apartamento", { required: true })}
             
            />
            {errors?.apartamento?.type == "required" && (
              <p className="error-menssage">Apartamento é Obrigatorio</p>
            )}
          </div>

         
          <div>
            <div className="contente-3"></div>
            <div class="contente-2">
              <div className="button-div">
                <Button text="VOLTAR"
                 onClick={() => navigate("/moradoresR")} />
               
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

export default ResindenciaC;
