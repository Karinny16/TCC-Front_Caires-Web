import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import "./CustomAlert.css";

function CustomAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="custom-alert-backdrop">
      <div className="custom-alert">
        <FiAlertCircle size={32} color="#e53935" />
        <span className="custom-alert-message">{message}</span>
        <button className="custom-alert-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomAlert;