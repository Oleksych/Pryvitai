import React from "react";

export default function MainDuplicateBtn({ progress, loading, duplicateBtnRef, showAdditionalSections }) {
  return (
    <>
      {/* Дублююча кнопка внизу контенту */}
      <button
        ref={duplicateBtnRef}
        className={progress ? `MainBtn${Math.max(1, Math.min(progress.score, 6))}` : "MainBtn1"}
        type="submit"
        disabled={(progress && progress.score < 1) || loading || showAdditionalSections}
        title={showAdditionalSections ? "Оберіть ідею тексту привітання" : undefined}
      >
        {loading ? "Генеруємо привітайку..." : "Згенерувати зображення"}
      </button>
      <div style={{ height: "160px" }}></div> {/* просто відступ */}
    </>
  );
}