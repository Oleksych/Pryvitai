import React, { forwardRef } from "react";

const GreetingSubjectSection = forwardRef(function GreetingSubjectSection({
  formData,
  handleOptionSelect,
  optionsGreetingSubject,
  scrollToNextSection
}, ref) {
  return (
    <section ref={ref}>
      <h2>З чим вітаємо?</h2>

      {optionsGreetingSubject.map((option) => {
        const isActive = formData.greetingSubject === option;
        return (
          <button
            type="button"
            key={option}
            onClick={() => {
              handleOptionSelect("greetingSubject", option);
              if (scrollToNextSection) scrollToNextSection();
            }}
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
});

export default GreetingSubjectSection; 