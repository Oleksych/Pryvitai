import React from 'react';

const TextIdeasDisplay = ({
  textIdeas,
  setTextIdeas,
  isGeneratingText,
  editingIndex,
  setEditingIndex,
  setFormData,
  setShowAdditionalSections
}) => {
  return (
    <div style={{
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      border: "1px solid #e9ecef"
    }}>
      <h3 style={{
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
        textAlign: "center"
      }}>
        Ваші ідеї тексту
      </h3>
      
      {textIdeas.map((idea, index) => (
        <div key={index} style={{
          marginBottom: "15px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
          position: "relative"
        }}>
          <textarea
            value={idea}
            onChange={(e) => {
              const newIdeas = [...textIdeas];
              newIdeas[index] = e.target.value;
              setTextIdeas(newIdeas);
            }}
            placeholder={isGeneratingText ? "Генеруємо ідеї тексту привітання..." : "Тут буде Ваша ідея тексту привітання"}
            disabled={isGeneratingText}
            data-index={index}
            style={{
              width: "100%",
              minHeight: "60px",
              padding: "10px",
              border: editingIndex === index ? "2px solid #007bff" : "1px solid #ced4da",
              borderRadius: "6px",
              fontSize: "14px",
              resize: "vertical",
              fontFamily: "inherit",
              backgroundColor: editingIndex === index ? "#f8f9ff" : "#fff"
            }}
            onFocus={() => setEditingIndex(index)}
            onBlur={() => setEditingIndex(null)}
          />
          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}>
            <button
              type="button"
              onClick={() => {
                setEditingIndex(index);
                // Фокус на textarea
                const textarea = document.querySelector(`textarea[data-index="${index}"]`);
                if (textarea) {
                  textarea.focus();
                }
              }}
              disabled={isGeneratingText}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Редагувати
            </button>
            <button
              type="button"
              onClick={() => {
                // Копіюємо текст в поле GreetingText
                console.log("Копіюємо текст:", idea);
                setFormData(prev => ({
                  ...prev,
                  greetingText: idea
                }));
                // Ховаємо додаткові секції
                setShowAdditionalSections(false);
                
                // Прокручуємо до поля GreetingText
                setTimeout(() => {
                  const greetingTextInput = document.querySelector('input[placeholder*="Бажаю кошачої"]');
                  if (greetingTextInput) {
                    greetingTextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
              disabled={isGeneratingText || !idea.trim()}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Обрати
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextIdeasDisplay; 