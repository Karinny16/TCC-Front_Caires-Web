import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonAz from "../../components/ButtonAz";
import MeuMenu from "../../components/MeuMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGeral from "../CardGeral";

function VeiculosR() {
  const navigate = useNavigate();
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/veiculo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((resp) => resp.json())
      .then((res) => {
        const lista = Array.isArray(res.message) ? res.message : [];
        setVeiculos(lista);
      })
      .catch((err) => {
        console.error("Erro ao buscar veículos:", err);
        setVeiculos([]);
      });
  }, []);

  return (
    <div className="container-principal">
      <div className="container-botoes">
        <ButtonAz />
      </div>

      <div className="continent-4">
        <div className="continente scroll">

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
                  onClick={() => navigate("/veiculosc")}
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
              <p>Modelo</p>
              <p>Placa</p>
              <p>Tipo</p>
            </div>
            {Array.isArray(veiculos) && veiculos.length > 0 ? (
              veiculos.map((veiculo, idx) => (
                <CardGeral
                  key={veiculo.id_veiculo || idx}
                  campo1={veiculo.modelo}
                  campo2={veiculo.placa}
                  campo3={veiculo.tipo_veiculo}
                  id={veiculo.id_veiculo}
                  rota="veiculosa"
                />
              ))
            ) : (
              <div style={{ padding: "16px", color: "#888" }}>Nenhum veículo encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VeiculosR;
