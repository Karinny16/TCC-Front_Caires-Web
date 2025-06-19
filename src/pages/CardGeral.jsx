import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const CardGeral = ({ id, campo1, campo2, campo3, rota }) => {
  const navigate = useNavigate();

  return (
    <div className="dive-label" style={{ position: "relative" }}>
      <BsThreeDotsVertical
        style={{ position: "absolute", top: 20, right: 8, cursor: "pointer", fontSize: 22, color: "#555" }}
        title="Editar"
        onClick={() => navigate(`/${rota}/${id}`)}
      />
      <div className="div-label">
        <div className="text-container">
          <text className="text-fields">{campo1}</text>
        </div>
      </div>
      <div className="div1-label">
        <div className="text-container">
          <text className="text-fields">{campo2}</text>
        </div>
      </div>
      <div className="div2-label">
        <div className="text-container">
          <text className="text-fields">{campo3}</text>
        </div>
      </div>
    </div>
  );
};

export default CardGeral;
