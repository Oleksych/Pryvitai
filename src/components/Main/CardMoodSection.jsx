import React from "react";

export default function CardMoodSection({ cardMoodOptions, formData, customCardMood, setCustomCardMood, handleOptionSelect }) {
  return (
    <section>
      <h2>Настрій</h2>
      {cardMoodOptions.map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => {
            handleOptionSelect("cardMood", style);
            setCustomCardMood("");
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
} 