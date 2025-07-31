import React from "react";
import "../Main/Main.css";

const BackgroundSection = ({ 
  formData, 
  handleInputChange, 
  showGreetingIdeas 
}) => {
  return (
    <section className="section">
      <h2>Фон</h2>
      <h5>Опціонально</h5>
      <input
        type="text"
        placeholder="Наприклад: Берег річки та в даличині видніється історична частиа Києва"
        value={formData.backgroundText}
        onChange={handleInputChange("greetingText")}
      />
      <button type="button" onClick={showGreetingIdeas}>
        Переглянути ідеї фону
      </button>
    </section>
  );
};

export default BackgroundSection; 