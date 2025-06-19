import "./Telainicial.css";
import cairesazul from "../assets/cairesazul.png";
import { LiaBlackTie } from "react-icons/lia";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import ButtonAz from "../components/ButtonAz";
import { useState, useEffect } from "react";
import { useHistorico } from "../../src/context/HistoricoContext";
import { Button } from "@mui/material";

function Telainicial() {
    const [moradores, setMoradores] = useState([]);
    const { historicoConsultas } = useHistorico();
    useEffect(() => {
      fetch('http://localhost:3333/morador', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((resp) => resp.json())
        .then((morador) => {
          const lista = Array.isArray(morador.message) ? morador.message : [];
          setMoradores(lista);
        })
        .catch((err) => {
          console.error("Erro ao buscar moradores:", err);
          setMoradores([]);
        });
    }, [])
  return (
    <>
      <div class="continente-4">
        <ButtonAz
          text="VOLTAR"
          onClick={() => alert("Botão clicado!")}
          // Função de clique
        />
        
        <div class="continente">
          <div class="norte-side">
       
            <div class="continente-1">
              <img src={cairesazul} alt="Logo" className="img-inicial" />
            </div>

            <div class="continente-2">
              <div className="red-div">
                <div className="red-sub1">
                  <p>{`Moradores Ativos: ${moradores.length}`}</p>
                  <IoPerson size={30} color="black" />
                </div>
                <div className="red-sub2">
                <p>{"Prestadores"}</p>
                <LiaBlackTie size={30} color="black" />
                </div>
                <div className="red-sub3">
                <p>{"Visitantes"}</p>
                  <IoPersonAdd size={30} color="black" />
                  <p></p>
                </div>
                <div className="red-sub4">
                <p>{"Visitantes Liberados"}</p>
                  <IoPeopleSharp size={30} color="black" />
                  
                </div>
              </div>
            </div>
          </div>

          <div class="sul-side">
            <div class="continente-3">
              <div className="red-div1">
                <div className="red-sub5">
                <p>{"Prestadores Liberados"}</p>
                  <FaUserCheck size={30} color="black" />
                </div>
                <div className="red-sub6">
                <p>{"Acessos Negados"}</p>
                  <FaUserAltSlash size={30} color="black" />
                </div>
                <div className="red-sub7" style={{cursor: 'pointer'}} onClick={() => window.location.href = '/acessos-liberados'}>
                <p>{`Acessos Liberados: ${historicoConsultas.length}`}</p>
                  <FaUnlock size={30} color="black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Telainicial;
