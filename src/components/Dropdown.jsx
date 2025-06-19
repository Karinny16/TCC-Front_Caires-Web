import React from "react";
import "./Dropdown.css";

const DropdownWithRadios = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            Outro
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DropdownWithRadios;
