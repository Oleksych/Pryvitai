import React, { forwardRef } from "react";

const TraitsSection = forwardRef(function TraitsSection({
  formData,
  handleOptionSelect,
  customTrait,
  optionsTraits
}, ref) {
  return (
    <section ref={ref}>
      <h2>Риси та цінності</h2>

      {optionsTraits.map((option) => {
        const isActive = formData.traits.includes(option);
        const isDisabled =
          !isActive && formData.traits.length >= 4 && customTrait === "";

        return (
          <button
            type="button"
            key={option}
            onClick={() => {
              handleOptionSelect("traits", option);
            }}
            className={isActive ? "active" : ""}
            disabled={isDisabled}
          >
            {option}
          </button>
        );
      })}

      <input
        type="text"
        placeholder="Ваш деталізований варіант - наприклад: творча енергія та вдосконалення"
        value={
          formData.traits.length > 0 &&
          formData.traits.every((trait) => optionsTraits.includes(trait))
            ? ""
            : customTrait
        }
        onChange={(e) => handleOptionSelect("customTrait", e.target.value)}
        disabled={formData.traits.length >= 4}
      />

      {formData.traits.length >= 4 && customTrait === "" && (
        <p className="limit-message">Максимум 4 варіанти</p>
      )}
    </section>
  );
});

export default TraitsSection; 