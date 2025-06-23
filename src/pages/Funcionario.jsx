import "../pages/registros/MoradoresR.css";
import cairesa from "../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonAz from "../components/ButtonAz";
import MeuMenu from "../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FuncionarioCard from "./funcionarioCard";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Funcionario() {
  const navigate = useNavigate();
  const { register, watch, setValue } = useForm();
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);

  const searchTerm = watch("searchTerm", ""); // Observa o campo de busca

  useEffect(() => {
    fetch("http://localhost:3333/funcionario", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const lista = Array.isArray(data.message) ? data.message : data;
        setFuncionarios(lista);
        setFilteredFuncionarios(lista);
      })
      .catch((err) => {
        console.error("Erro ao buscar funcionários:", err);
        setFuncionarios([]);
        setFilteredFuncionarios([]);
      });
  }, []);

  useEffect(() => {
    const filtered = funcionarios.filter((func) =>
      func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      func.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      func.nivel_acesso.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFuncionarios(filtered);
  }, [searchTerm, funcionarios]);

  return (
    <div className="container-principal">
      {/* Container dos botões */}
      <div className="container-botoes">
        <ButtonAz />
      </div>

      {/* Container principal */}
      <div className="continent-4">
        <div className="continente scroll">
          {/* Barra de pesquisa */}
          <div className="pesquisa-side">
            <div className="continente-1">
              <div>
                <MeuMenu />
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
                  {...register("searchTerm")} // Campo controlado pelo React Hook Form
                />
              </div>
            </div>
          </div>

          {/* Lista de informações */}
          <div className="label-side">
            <div className="div-label">
              <p>Nome</p>
              <p>Função</p>
              <p>Telefone</p>
            </div>
            {Array.isArray(filteredFuncionarios) && filteredFuncionarios.length > 0 ? (
              filteredFuncionarios.map((funcionario, idx) => (
                <FuncionarioCard
                  key={funcionario.id_funcionario || idx}
                  nome={funcionario.nome}
                  nivel_acesso={funcionario.nivel_acesso}
                  cpf={funcionario.cpf}
                  id_morador={funcionario.id_funcionario}
                  rota="moradoresa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>Nenhum funcionário encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funcionario;
