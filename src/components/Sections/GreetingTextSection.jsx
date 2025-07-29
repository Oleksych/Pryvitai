import React, { forwardRef } from "react";

const GreetingTextSection = forwardRef(function GreetingTextSection({ formData, handleInputChange, showGreetingIdeas, scrollToNextSection }, ref) {
  return (
    <section ref={ref}>
      <h2>Текст привітання</h2>
      <input
        type="text"
        placeholder="Наприклад: Бажаю кошачої грайливості та спокою не зважаючи на обставини"
        value={formData.greetingText}
        onChange={handleInputChange("greetingText")}
      />
      <button type="button" onClick={() => {
        showGreetingIdeas();
        if (scrollToNextSection) scrollToNextSection();
      }}>
        Переглянути ідеї тексту
      </button>
    </section>
  );
});

export default GreetingTextSection; 