import "../pages/registros/MoradoresR.css";
import cairesa from "../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../components/ButtonR";
import ButtonAz from "../components/ButtonAz";
import MeuMenu  from "../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FuncionarioCard from "./funcionarioCard";
function Funcionario() {
    const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3333/funcionario', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Se vier como { message: [...] }
        if (Array.isArray(data.message)) {
          setFuncionario(data.message);
        }
        // Se vier como array direto
        else if (Array.isArray(data)) {
          setFuncionario(data);
        } else {
          setFuncionario([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar moradores:", err);
        setMoradores([]);
      });
  }, [])

  return (

    <div className="container-principal">
      {/* Container dos botões - Não interfere no alinhamento */}
      <div className="container-botoes">
        <ButtonAz />
      </div>

      {/* Container principal do conteúdo */}
      <div className="continent-4">
        <div className="continente scroll">

          {/* Barra de pesquisa */}
          <div className="pesquisa-side">
            <div className="continente-1">
              <div>
                <MeuMenu  /> {/* Aqui o menu aparece na tela */}
              </div>
              <img src={cairesa} alt="Logo" className="img-cadA" />
              <div className="icon-contain">
                <IoAddCircleOutline
                  size={50}
                  color="black"
                  className="more-icon"
                  onClick={() => navigate("/cadanario")} 
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="procura-2">
              <div className="input-contain">
                <IoIosSearch size={20} color="black" className="input-icon" />
                <input
                  type="text"
                  className="input-fiels"
                  placeholder="procurar"
                />
              </div>
            </div>
          </div>

          <div className="label-side">
            <div className="div-label">
              <p>Nome</p>
              <p>funcao</p>
              <p>Telefone</p>
            </div>
            {Array.isArray(funcionario) && funcionario.length > 0 ? (
              funcionario.map((funcionarios, idx) => (
                <FuncionarioCard
                  key={funcionarios.id_funcionario || idx}
                  nome={funcionarios.nome}
                  nivel_acesso={funcionarios.nivel_acesso}
                  telefone={funcionarios.telefone}
                  id_morador={funcionarios.id_funcionario}
                  rota="moradoresa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>Nenhum Funcionario encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funcionario;
