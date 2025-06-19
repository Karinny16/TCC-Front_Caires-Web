import { createContext, useContext, useState } from "react";

const HistoricoContext = createContext();

export function HistoricoProvider({ children }) {
  const [historicoConsultas, setHistoricoConsultas] = useState([]);

  return (
    <HistoricoContext.Provider value={{ historicoConsultas, setHistoricoConsultas }}>
      {children}
    </HistoricoContext.Provider>
  );
}

export function useHistorico() {
  return useContext(HistoricoContext);
}
