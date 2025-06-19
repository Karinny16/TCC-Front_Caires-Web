import React, { useState } from 'react';
import './SelectComponent.css'

const SelectV = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="select-container">
      <label htmlFor="select" className="label-select">Tipo:</label>
      <select id="select" value={selectedOption} onChange={handleChange} className="select-field">
        <option value="" disabled>Selecione</option>
        <option value="Evento">Evento</option>
        <option value="Comunicado">Comunicado</option>
      </select>
    </div>
  );
};

export default SelectV;
