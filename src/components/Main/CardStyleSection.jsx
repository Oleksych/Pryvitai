import React, { forwardRef } from "react";

const CardStyleSection = forwardRef(function CardStyleSection({ cardStyleOptions, formData, customCardStyle, setCustomCardStyle, handleOptionSelect, scrollToNextSection }, ref) {
  return (
    <section ref={ref}>
      <h2>Стиль</h2>
      {cardStyleOptions.map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => {
            handleOptionSelect("cardStyle", style);
            setCustomCardStyle("");
            if (scrollToNextSection) scrollToNextSection();
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
});

export default CardStyleSection; 