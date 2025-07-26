import React from "react";

export default function CardStyleSection({ cardStyleOptions, formData, customCardStyle, setCustomCardStyle, handleOptionSelect }) {
  return (
    <section>
      <h2>Стиль</h2>
      {cardStyleOptions.map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => {
            handleOptionSelect("cardStyle", style);
            setCustomCardStyle("");
          }}
          className={formData.cardStyle === style && customCardStyle === "" ? "active" : ""}
        >
          {style}
        </button>
      ))}
      <input
        type="text"
        placeholder="Ваш креативний варіант - наприклад: в стилі мультика Енеїда"
        value={customCardStyle}
        onChange={(e) => {
          setCustomCardStyle(e.target.value);
          handleOptionSelect("cardStyle", e.target.value);
        }}
      />
    </section>
  );
} 