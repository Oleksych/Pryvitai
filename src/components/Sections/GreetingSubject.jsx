import React from "react";

export default function GreetingSubject({
  formData,
  handleOptionSelect,
  optionsGreetingSubject,
}) {
  return (
<section>
            <h2>З чим вітаємо?</h2>

            {optionsGreetingSubject.map((option) => {
              const isActive = formData.greetingSubject === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleOptionSelect("greetingSubject", option)}
                  className={isActive ? "active" : ""}
                >
                  {option}
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Свій варіант"
              value={
                optionsGreetingSubject.includes(formData.greetingSubject)
                  ? ""
                  : formData.greetingSubject
              }
              onChange={(e) =>
                handleOptionSelect("greetingSubject", e.target.value)
              }
            />
          </section>
          );
}