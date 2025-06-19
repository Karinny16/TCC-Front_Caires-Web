import React from "react";
import "./Dropdown.css";

const DropdownWithRadios = ({ value, onChange }) => {
  return (
    <div className="dropdown">
      <ul className="dropdown-options">
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Feminino"
              checked={value === "Feminino"}
              onChange={e => onChange(e.target.value)}
            />
            Feminino
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Masculino"
              checked={value === "Masculino"}
              onChange={e => onChange(e.target.value)}
            />
            Masculino
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Outro"
              checked={value === "Outro"}
              onChange={e => onChange(e.target.value)}
            />
            Outro
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DropdownWithRadios;