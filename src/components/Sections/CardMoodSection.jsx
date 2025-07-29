import React, { forwardRef } from "react";

const CardMoodSection = forwardRef(function CardMoodSection({ cardMoodOptions, formData, customCardMood, setCustomCardMood, handleOptionSelect, scrollToNextSection }, ref) {
  return (
    <section ref={ref}>
      <h2>Настрій</h2>
      {cardMoodOptions.map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => {
            handleOptionSelect("cardMood", style);
            setCustomCardMood("");
            if (scrollToNextSection) scrollToNextSection();
          }}
          className={formData.cardMood === style && customCardMood === "" ? "active" : ""}
        >
          {style}
        </button>
      ))}
      <input
        type="text"
        placeholder="Ваш креативний варіант - наприклад: настрій дружнього підколу"
        value={customCardMood}
        onChange={(e) => {
          setCustomCardMood(e.target.value);
          handleOptionSelect("cardMood", e.target.value);
        }}
      />
    </section>
  );
});

export default CardMoodSection; 