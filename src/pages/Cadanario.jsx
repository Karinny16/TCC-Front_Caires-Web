import "./Cadanario.css";
import Title from "../components/Title";
import SelectComponent from '../components/SelectComponent'; 
import Button from '../components/Button'
import { IoPersonCircleOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";

import DropdownWithRadios from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SelectFS from "../components/SelectFS";

function Cadanario() {
  const [funcionario, setFuncionario] = useState({});
  const [dataNascimento, setDataNascimento] = useState(""); // Estado para a data de nascimento
  const [telefone, setTelefone] = useState(""); // Estado para o telefone
  const [cpf, setCpf] = useState(""); // Estado para o CPF
  const [nivelAcesso, setNivelAcesso] = useState([]); // <-- agora é array
  const [cnpj, setCnpj] = useState(""); // Estado para o CNPJ
  const [genero, setGenero] = useState(""); // Estado para o gênero
  const [idGenero, setIdGenero] = useState("");
  const [idNivel, setIdNivel] = useState("");

  const { control } = useForm();
  const navigate = useNavigate();

  function handlerChangeFunc(event) {
    setFuncionario({ ...funcionario, [event.target.name]: event.target.value });
    console.log(funcionario);
  }

  function handleGeneroChange(value) {
    setIdGenero(value);
    setFuncionario({ ...funcionario, id_genero: value });
  }

  function formatDate(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a primeira barra
      .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3") // Adiciona a segunda barra
      .slice(0, 10); // Limita ao tamanho de 10 caracteres (DD/MM/AAAA)
  }

  function handleDateChange(event) {
    const formattedDate = formatDate(event.target.value);
    setDataNascimento(formattedDate);
    setFuncionario({ ...funcionario, data_nascimento: formattedDate }); // Corrigido aqui
  }

  function formatTelefone(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2") // Adiciona o traço no número
      .slice(0, 15); // Limita ao tamanho de 15 caracteres
  }

  function handleTelefoneChange(event) {
    const formattedTelefone = formatTelefone(event.target.value);
    setTelefone(formattedTelefone);
    setFuncionario({ ...funcionario, telefone: formattedTelefone });
  }

  function formatCpf(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona o segundo ponto
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4") // Adiciona o traço
      .slice(0, 14); // Limita ao tamanho de 14 caracteres
  }

  function handleCpfChange(event) {
    const formattedCpf = formatCpf(event.target.value);
    setCpf(formattedCpf);
    setFuncionario({ ...funcionario, cpf: formattedCpf });
  }
   function handlerChangeNivel(event) {
    // Busca o id_nivel pelo nome selecionado
    const selected = nivelAcesso.find((n) => n.descricao === event.target.value);
    setIdNivel(selected ? selected.id_nivel : "");
    setFuncionario({ ...funcionario, nivel_acesso: event.target.value, id_nivel: selected ? selected.id_nivel : "" });
  }
  function submit(event) {
    event.preventDefault();
    // Monta o objeto para o backend
    const payload = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      senha: funcionario.senha,
      data_nascimento: funcionario.data_nascimento,
      id_genero: funcionario.id_genero,
      nivel_acesso: funcionario.nivel_acesso,
      id_condominio: funcionario.id_condominio,
      id_nivel: funcionario.id_nivel
    };
    insertFunc(payload);
  }
   useEffect(() => {
    fetch('http://localhost:3333/nivelAcesso', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    })
      .then((resp) => resp.json())
      .then((acesso) => {
        console.log('TESTE: ' + acesso.data);
        setNivelAcesso(acesso.data); // <-- aqui muda
      })
      .catch((error) => {
        console.log('ERRO: ' + error);
      })
  }, []);

  function insertFunc(funcionario) {
    fetch("http://localhost:3333/funcionario", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(funcionario),
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

  const handleClick = () => {
    navigate("/Funciocondo");
  };

  const handleNivelAcessoChange = (nivel, cnpjValue) => {
    setNivelAcesso(nivel);
    setCnpj(cnpjValue || ""); // Atualiza o CNPJ se fornecido
    setFuncionario({
      ...funcionario,
      nivel_acesso: nivel,
      cnpj: cnpjValue || "", // Atualiza o estado do funcionário
    });
  };

  return (
    <div className="container teste">
      <div className="other-side">
        <div className="contente-1">
          <Title>Adicionar um novo Funcionário:</Title>
          <div className="photo-circle">
          
        <IoPersonCircleOutline size={550} color="#555" />
        </div>
        </div>
      </div>

      <div className="direita-side">
        <div className="putbu">
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu nome"
              name="nome"
              id="nome"
              onChange={handlerChangeFunc}
            />
          </div>

          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
              name="cpf"
              id="cpf"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>

          <div className="input-container">
            <Title>Data de Nascimento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a data de nascimento (DD/MM/AAAA)"
              name="dt_nascimento"
              id="dt_nascimento"
              value={dataNascimento}
              onChange={handleDateChange}
            />
          </div>

          <div className="input-container">
            <Title>Gênero:</Title>
            <DropdownWithRadios value={idGenero} onChange={handleGeneroChange} />
          </div>

          <div className="input-container">
            <Title>Senha:</Title>
            <input
              type="password"
              className="input-fields"
              placeholder="Digite sua senha"
              name="senha"
              id="senha"
              onChange={handlerChangeFunc}
            />
          </div>

          <div className="input-container">
            <Title>Código do Condomínio:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o código do condomínio"
              name="id_condominio"
              id="id_condominio"
              onChange={handlerChangeFunc}
            />
          </div>
          <div>
            <SelectFS
              text="Nível de Acesso:"
              name="nivel_acesso"
              id="nivel_acesso"
              handlerChange={handlerChangeNivel}
              options={nivelAcesso} // <-- já está correto aqui
            />
          </div>
          <div className="contente-3"></div>
          <div className="contente-2">
            <div className="button-div">
              <Button
                text="VOLTAR"
                onClick={handleClick}
                op
              />
              <Button
                text="CADASTRAR"
                onClick={submit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadanario;
