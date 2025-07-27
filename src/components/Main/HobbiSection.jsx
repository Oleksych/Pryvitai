import React, { forwardRef } from "react";

const HobbiSection = forwardRef(function HobbiSection({
  formData,
  handleOptionSelect,
  customHobby,
  optionsHobbies
}, ref) {
  return (
    <section ref={ref}>
            <h2>Атрибути та символи</h2>

            {optionsHobbies.map((option) => {
              const isActive = formData.hobbies.includes(option);
              const isDisabled =
                !isActive && formData.hobbies.length >= 4 && customHobby === "";

              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleOptionSelect("hobbies", option)}
                  className={isActive ? "active" : ""}
                  disabled={isDisabled}
                >
                  {option}
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Ваш деталізований варіант - наприклад: білий сучасний автомобіль рено в кузові універсал"
              value={
                formData.hobbies.length > 0 &&
                formData.hobbies.every((hobby) => optionsHobbies.includes(hobby))
                  ? ""
                  : customHobby
              }
              onChange={(e) => handleOptionSelect("customHobby", e.target.value)}
              disabled={formData.hobbies.length >= 4}
            />

            {formData.hobbies.length >= 4 && customHobby === "" && (
              <p className="limit-message">Максимум 4 варіанти</p>
            )}
          </section>
  );
});

export default HobbiSection;