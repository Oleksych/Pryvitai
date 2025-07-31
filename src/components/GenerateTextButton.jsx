import React from 'react';

const GenerateTextButton = ({ onClick, disabled, loading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        maxWidth: "300px",
        height: "50px",
        backgroundColor: "#64255c",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "300",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        margin: "20px auto",
        display: "block"
      }}
    >
      {loading ? "Генеруємо ідеї..." : "Генерувати ідеї тексту"}
    </button>
  );
};

export default GenerateTextButton; 