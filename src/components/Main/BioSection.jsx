import React from "react";

export default function BioSection({
  formData,
  handleOptionSelect,
  genderOptions,
  filteredOptions
}) {
  return (
    <section>
      <div className="Bio">
        <section className="gender">
          <h2 className="h-Bio">Cтать</h2>
          {genderOptions.map((gender) => (
            <button
              type="button"
              key={gender}
              onClick={() => handleOptionSelect("gender", gender)}
              className={formData.gender === gender ? "active" : ""}
            >
              {gender}
            </button>
          ))}
        </section>
        <section className="age">
          <h2 className="h-Bio">Вік</h2>
          <input
            className="input-age"
            type="number"
            min="0"
            max="115"
            value={formData.age}
            onChange={(e) => handleOptionSelect("age", e.target.value)}
            placeholder="Введіть вік"
          />
        </section>
      </div>
      {filteredOptions.map((option) => {
        const isActive = formData.person === option.label;
        return (
          <button
            type="button"
            key={option.label}
            onClick={() => handleOptionSelect("person", option.label)}
            className={isActive ? "active" : ""}
          >
            {option.label}
          </button>
        );
      })}
    </section>
  );
}