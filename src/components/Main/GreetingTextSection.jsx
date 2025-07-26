import React from "react";

export default function GreetingTextSection({ formData, handleInputChange, showGreetingIdeas }) {
  return (
    <section>
      <h2>Текст привітання</h2>
      <input
        type="text"
        placeholder="Наприклад: Бажаю кошачої грайливості та спокою не зважаючи на обставини"
        value={formData.storyText}
        onChange={handleInputChange("greetingText")}
      />
      <button type="button" onClick={showGreetingIdeas}>
        Згенерувати ідеї тексту
      </button>
    </section>
  );
} 