import React from 'react';
import './SelectComponent.css';

const SelectV = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="select-container">
      <label htmlFor="select" className="label-select">Nível de acesso:</label>
      <select
        id="select"
        value={value}
        onChange={handleChange}
        className="select-field"
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="Visitante comum">Visitante comum</option>
        <option value="Visitante permanente">Visitante permanente</option>
        <option value="Prestador de serviço">Prestador de Serviço</option>
      </select>
      <p>Você selecionou: {value}</p>
    </div>
  );
};

export default SelectV;
