import React from "react";
import "./MainButton.css";

export default function MainButton({ loading, progress }) {
  // Тексти для кожного рівня
  const states = [
    {
      stateText: "Донт пурш зе хорсес✋",
      hintText: "Оберіть що найменше стиль, настрій та фото",
      btnClass: "MainBtn1",
      stateClass: "stateText1",
      hintClass: "hintText1",
      disabled: true,
    },
    {
      stateText: "Вже є мінімум для генерації картинки",
      hintText: "Додайте ще інформації для кращого результату",
      btnClass: "MainBtn2",
      stateClass: "stateText2",
      hintClass: "hintText2",
      disabled: false,
    },
    {
      stateText: "Це знадобиться для точності☝️",
      hintText: "Більше інформації - більше зачіпок та символів",
      btnClass: "MainBtn3",
      stateClass: "stateText3",
      hintClass: "hintText3",
      disabled: false,
    },
    {
      stateText: "Маємо все необхідне для привітайки👌",
      hintText: "Атрибути та текст які поєднуються цьому сприятимуть",
      btnClass: "MainBtn4",
      stateClass: "stateText4",
      hintClass: "hintText4",
      disabled: false,
    },
    {
      stateText: "Гарний шанс персоналізувати привітайку👍",
      hintText: "Є все для сисмволічної композиції зображення",
      btnClass: "MainBtn5",
      stateClass: "stateText5",
      hintClass: "hintText5",
      disabled: false,
    },
    {
      stateText: "Заявка на шедевр 🎉",
      hintText: "Головне все чітко комбінувати ",
      btnClass: "MainBtn6",
      stateClass: "stateText6",
      hintClass: "hintText6",
      disabled: false,
    },
  ];

  // Визначаємо поточний рівень (0-5)
  const level = Math.max(0, Math.min((progress?.score || 0) - 1, 5));
  const { stateText, hintText, btnClass, stateClass, hintClass, disabled } = states[level];

  return (
    <div className="fixedButtonBox">
      <p className={stateClass}>{stateText}</p>
      <button
        className={btnClass}
        type="submit"
        disabled={disabled || loading}
      >
        {loading ? "Генеруємо привітайку..." : "Згенерувати зображення"}
      </button>
      <p className={hintClass}>{hintText}</p>
    </div>
  );
}
    