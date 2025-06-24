import { useState } from "react";
import "./App.css";
import { IoIosFingerPrint } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import caires from "./assets/caires.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Funciocondo from "./pages/Funciocondo.jsx";
import Telainicial from "./pages/Telainicial.jsx";
import Impressao from "./pages/Impressao.jsx";
/*cadastros*/
import Cadaminion from "./pages/Cadaminion.jsx";
import Cadanario from "./pages/Cadanario.jsx";
import MoradoresC from "./pages/MoradoresC.jsx";
import VeiculosC from "./pages/VeiculosC.jsx";
import VisitantesC from "./pages/VisitantesC.jsx";
import PedidosC from "./pages/PedidosC.jsx";
import EventosC from "./pages/EventosC.jsx";
import PrestadoresC from "./pages/ServadoresC.jsx";

/*Registros*/
import MoradoresR from "./pages/registros/MoradoresR.jsx";
import PrestadoresR from "./pages/registros/ServadoresR.jsx";
import VisitantesR from "./pages/registros/VisitantesR.jsx";
import VeiculosR from "./pages/registros/VeiculosR.jsx";
import EventosR from "./pages/registros/EventosR.jsx";
import PedidosR from "./pages/registros/PedidosR.jsx";


/*Porteiro */

import RegistroP from "./pages/porteiro/registropVisi.jsx"
import ServadoresRP from "./pages/porteiro/registropSer.jsx";
import PedidosRP from "./pages/porteiro/registropPed.jsx";
import CadasPvisi from "./pages/porteiro/cadasPVisi.jsx";
import CadasEncomenda from "./pages/porteiro/cadasPSer.jsx";

/*botoes ao lado*/
import Inicio from "./pages/Telainicial.jsx";
import Registros from "./pages/registros/MoradoresR.jsx";
import Pedidos from "./pages/registros/PedidosR.jsx";

/*menu cadastro para registro*/

import Moradores from "./pages/registros/MoradoresR.jsx";
import Prestadores from "./pages/registros/ServadoresR.jsx";
import Visitantes from "./pages/registros/VisitantesR.jsx";
import Veiculos from "./pages/registros/VeiculosR.jsx";
import Eventos from "./pages/registros/EventosR.jsx";

/*menu registro  para cadastro*/

import MoradoresCa from "./pages/MoradoresC.jsx";
import PrestadoresCa from "./pages/ServadoresC.jsx";
import VisitantesCa from "./pages/VisitantesC.jsx";
import VeiculosCa from "./pages/VeiculosC.jsx";
import EventosCa from "./pages/EventosC.jsx";
import PedidosCa from "./pages/PedidosC.jsx";

/*atualizar registros*/
import MoradoresA from "./pages/registro-atualizar/MoradoresA.jsx";
import PrestadoresA from "./pages/registro-atualizar/ServadoresA.jsx";
import VisitantesA from "./pages/registro-atualizar/VisitantesA.jsx";
import VeiculosA from "./pages/registro-atualizar/VeiculosA.jsx";
import EventosA from "./pages/registro-atualizar/EventosA.jsx";
import PedidosA from "./pages/registro-atualizar/PedidosA.jsx";
import AtualizarVisitante from "./pages/porteiro/atualizarVisitante.jsx";


import Funcionario from "./pages/Funcionario.jsx";
import ResindenciaC from "./pages/Residencias.jsx";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/Funciocondo" element={<Funciocondo />} />
        <Route path="/" element={<Login />} />
        <Route path="/Telainicial" element={<Telainicial />} />
        <Route path="/Impressao" element={<Impressao />} />

        <Route path="/Cadaminion" element={<Cadaminion />} />
        <Route path="/Cadanario" element={<Cadanario />} />
        <Route path="/MoradoresC" element={<MoradoresC />} />
        <Route path="/VeiculosC" element={<VeiculosC />} />
        <Route path="/VisitantesC" element={<VisitantesC />} />
        <Route path="/PedidosC" element={<PedidosC />} />
        <Route path="/EventosC" element={<EventosC />} />
        <Route path="/PrestadoresC" element={<PrestadoresC />} />
        <Route path="/MoradoresR" element={<MoradoresR />} />
        <Route path="/PrestadoresR" element={<PrestadoresR />} />
        <Route path="/VisitantesR" element={<VisitantesR />} />
        <Route path="/VeiculosR" element={<VeiculosR />} />
        <Route path="/EventosR" element={<EventosR />} />
        <Route path="/PedidosR" element={<PedidosR />} />


        <Route path="/visitantesP" element={<RegistroP />} />
        <Route path="/servidorP" element={<ServadoresRP />} />
        <Route path="/pedidosP" element={<PedidosRP />} />
        <Route path="/visitantesCP" element={<CadasPvisi />} />
        <Route path="/encomenda" element={<CadasEncomenda />} />



        <Route path="/ResidenciaC" element={<ResindenciaC />} />
        <Route path="/Funcionario" element={<Funcionario />} />



        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/pedidos" element={<Pedidos />} />

        <Route path="/moradores" element={<Moradores />} />
        <Route path="/servidor" element={<Prestadores />} />
        <Route path="/visitantes" element={<Visitantes />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/eventos" element={<Eventos />} />

        <Route path="/pedidosc" element={<PedidosCa />} />
        <Route path="/moradoresc" element={<MoradoresCa />} />
        <Route path="/servidorc" element={<PrestadoresCa />} />
        <Route path="/visitantesc" element={<VisitantesCa />} />
        <Route path="/veiculosc" element={<VeiculosCa />} />
        <Route path="/eventosc" element={<EventosCa />} />

        <Route path="/moradoresa/:id" element={<MoradoresA />} />
        <Route path="/servidora/:id" element={<PrestadoresA />} />
        <Route path="/visitantesa/:id" element={<VisitantesA />} />
        <Route path="/veiculosa/:id" element={<VeiculosA />} />
        <Route path="/eventosa/:id" element={<EventosA />} />
        <Route path="/pedidosa/:id" element={<PedidosA />} />
        <Route path="/atualizarVisitanteP/:id_visitante" element={<AtualizarVisitante />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
