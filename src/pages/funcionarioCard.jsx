
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const FuncionarioCard = ({id_funcionario, nome, nivel_acesso,cpf, rota})=>{
    const navigate = useNavigate();
    return(
        <div className="dive-label" style={{ position: "relative" }}>
          <BsThreeDotsVertical
            style={{ position: "absolute", top: 20, right: 8, cursor: "pointer", fontSize: 22, color: "#555" }}
            title="Editar"
            onClick={() => navigate(`/${rota}/${id_funcionario}`)}
          />
          <div className="div-label">
            <div className="text-container">
              <text className="text-fields">{nome}</text>
            </div>
          </div>
          <div className="div1-label">
            <div className="text-container">
              <text className="text-fields">{nivel_acesso}</text>
            </div>
          </div>
          <div className="div2-label">
            <div className="text-container">
              <text className="text-fields">{cpf}</text>
            </div>
          </div>
        </div>
    )
}

export default FuncionarioCard;