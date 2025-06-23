import React from "react";
import "./Dropdown.css";

const generos = [
  { id: 2, label: "Feminino" },
  { id: 1, label: "Masculino" },
  { id: 3, label: "Outro" },
];

const DropdownWithRadios = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(String(e.target.value)); // sempre string
  };
  return (
    <div className="dropdown">
      <ul className="dropdown-options">
        {generos.map((g) => (
          <li key={g.id}>
            <label>
              <input
                type="radio"
                name="dropdown"
                value={String(g.id)}
                checked={String(value) === String(g.id)}
                onChange={handleChange}
              />
              {g.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownWithRadios;
