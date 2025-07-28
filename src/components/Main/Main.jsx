import React from "react";
import {
  cardStyleOptions,
  cardMoodOptions,
  optionsHobbies,
  optionsPerson,
  optionsGreetingSubject,
  optionsTraits,
} from "../../data/options";
import "./Main.css";

import MainButton from "./MainButton";
import { getFormProgress } from "../../utils/formProgress";
import { useEffect, useRef, useState } from "react";
import CardStyleSection from "./CardStyleSection";
import CardMoodSection from "./CardMoodSection";
import PhotoSection from "./PhotoSection";
import BioSection from "./BioSection";
import HobbiSection from "./HobbiSection";
import TraitsSection from "./TraitsSection";
import GreetingSubjectSection from "./GreetingSubjectSection";
import GreetingTextSection from "./GreetingTextSection";
import MainDuplicateBtn from "./MainDuplicateBtn";

export const Main = () => {
  const [formData, setFormData] = useState({
    person: "",
    gender: "",
    age: "", // замінив null на порожній рядок
    greetingSubject: "",
    customGreetingSubject: "",
    hobbies: [], // масив
    hobbiesDescription: "",
    customHobby: "",
    traits: [], // масив для рис та цінностей
    customTrait: "",
    appearanceDescription: "",
    photoFile: null,
    cardStyle: "",
    cardMood: "",
    greetingText: "",
  });

  const [customHobby, setCustomHobby] = useState("");
  const [customTrait, setCustomTrait] = useState("");
  const [customCardStyle, setCustomCardStyle] = useState("");
  const [customCardMood, setCustomCardMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isFixedButtonVisible, setIsFixedButtonVisible] = useState(true);
  const [showAdditionalSections, setShowAdditionalSections] = useState(false);
  const [textIdeas, setTextIdeas] = useState(["", "", "", "", ""]);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const initialHeight = useRef(window.innerHeight);
  const duplicateBtnRef = useRef(null);

  // Додаю рефи для секцій
  const cardStyleRef = useRef(null);
  const cardMoodRef = useRef(null);
  const bioRef = useRef(null);
  const hobbiRef = useRef(null); // Додаю реф для HobbiSection
  const greetingTextRef = useRef(null);
  const greetingSubjectRef = useRef(null);
  const traitsRef = useRef(null);

  // Функція для прокрутки до рефа з відступом
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Відступ: трохи вище середини екрану
      const offset = rect.top + scrollTop - window.innerHeight / 2.5;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < initialHeight.current - 120);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!duplicateBtnRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsFixedButtonVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observer.observe(duplicateBtnRef.current);
    return () => observer.disconnect();
  }, [duplicateBtnRef]);

  const genderOptions = ["Ч", "Ж"];
  const filteredOptions = optionsPerson.filter(
    (option) => option.gender === formData.gender
  );

  const handleOptionSelect = (field, value) => {
    if (field === "hobbies") {
      setCustomHobby((prevCustom) => prevCustom); // не чистимо текст одразу

      setFormData((prev) => {
        const alreadySelected = prev.hobbies.includes(value);
        if (alreadySelected) {
          // Прибираємо вибране
          return {
            ...prev,
            hobbies: prev.hobbies.filter((hobby) => hobby !== value),
          };
        } else if (prev.hobbies.length < 4) {
          // Додаємо, якщо менше 4
          return {
            ...prev,
            hobbies: [...prev.hobbies, value],
          };
        } else {
          return prev; // ліміт досягнуто
        }
      });
    } else if (field === "customHobby") {
      const trimmedValue = value.trim();
      setCustomHobby(trimmedValue);

      setFormData((prev) => {
        // Відфільтровуємо попередній текст (той, що не в кнопках)
        const filtered = prev.hobbies.filter((hobby) =>
          optionsHobbies.includes(hobby)
        );
        if (trimmedValue === "") {
          // Якщо поле очищене — залишаємо тільки кнопки
          return { ...prev, hobbies: filtered };
        } else if (filtered.length < 4) {
          // Додаємо/замінюємо свій варіант, якщо ліміт не досягнуто
          return { ...prev, hobbies: [...filtered, trimmedValue] };
        } else {
          // Якщо ліміт досягнуто — не додаємо текст
          return prev;
        }
      });
    } else if (field === "traits") {
      setCustomTrait((prevCustom) => prevCustom); // не чистимо текст одразу

      setFormData((prev) => {
        const alreadySelected = prev.traits.includes(value);
        if (alreadySelected) {
          // Прибираємо вибране
          return {
            ...prev,
            traits: prev.traits.filter((trait) => trait !== value),
          };
        } else if (prev.traits.length < 4) {
          // Додаємо, якщо менше 4
          return {
            ...prev,
            traits: [...prev.traits, value],
          };
        } else {
          return prev; // ліміт досягнуто
        }
      });
    } else if (field === "customTrait") {
      const trimmedValue = value.trim();
      setCustomTrait(trimmedValue);

      setFormData((prev) => {
        // Відфільтровуємо попередній текст (той, що не в кнопках)
        const filtered = prev.traits.filter((trait) =>
          optionsTraits.includes(trait)
        );
        if (trimmedValue === "") {
          // Якщо поле очищене — залишаємо тільки кнопки
          return { ...prev, traits: filtered };
        } else if (filtered.length < 4) {
          // Додаємо/замінюємо свій варіант, якщо ліміт не досягнуто
          return { ...prev, traits: [...filtered, trimmedValue] };
        } else {
          // Якщо ліміт досягнуто — не додаємо текст
          return prev;
        }
      });
    } else {
      // Для інших полів просто оновлюємо значення
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({ ...prev, photoFile: e.target.files[0] }));
  };

  const uploadImageToCloudinary = async (file) => {
  const cloudName = "dnma2ioeb"; // 🔁 заміни на свій
  const uploadPreset = "my_unsigned_preset"; // 🔁 заміни на свій

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Не вдалося завантажити фото на Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // ⬅️ URL зображення
};


  const handleReset = () => {
    setFormData({
      person: "",
      gender: "",
      age: "",
      greetingSubject: "",
      hobbies: [],
      traits: [],
      appearanceDescription: "",
      photoFile: null,
      cardStyle: "",
      backgroundText: "",
      greetingText: "",
    });
    setCustomHobby("");
    setCustomTrait("");
    setCustomCardStyle("");
    setCustomCardMood("");
    setShowAdditionalSections(false);
    setTextIdeas(["", "", "", "", ""]);
    setIsGeneratingText(false);
    setEditingIndex(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);


  try {
    let uploadedImageUrl = "";

    // Якщо є фото — спочатку завантаж його на Cloudinary
    if (formData.photoFile) {
      uploadedImageUrl = await uploadImageToCloudinary(formData.photoFile);
    }

    // Опис зовнішності або фото отримувача листівки${uploadedImageUrl}
    const submitData = `Стиль - ${formData.cardStyle}, настрій - ${formData.cardMood}, та враховуй наступне фото: ${uploadedImageUrl}, для генерації подібних речей, персонажів або для натхнення сюжету (але хай DALL-E не вигадує персонажів яких немає на закріпленому фото або далі в описі).
    Додай до композиції сюжету наступні атрибути та символи або ті речі які прямо асоціюються з наступними хобі, захопленнями або родом діяльності: ${formData.hobbies}.
    Також врахуй риси та цінності особистості: ${formData.traits}. Відобрази ці якості через візуальні символи, емоції, атмосферу або деталі композиції, які передають ці характеристики.
    Також для генерації сюжету використовуй, атрибути, символи та сенси з наступного тексту привітання: ${formData.greetingText}. 
Без тексту.
`;

    // Відправляємо запит на локальний проксі для генерації зображення
    const response = await fetch("https://vps66716.hyperhost.name:5000/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: submitData }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert("Сталася помилка: " + (data.error || "Невідома помилка"));
      return;
    }
    if (data.imageUrl) {
      setGeneratedImageUrl(data.imageUrl);
      alert("Гіпінку надіслано успішно!");
      handleReset();
    } else {
      alert("Посилання на зображення не знайдено у відповіді.");
    }
  } catch (error) {
    alert("Сталася помилка: " + error.message);
  } finally {
    setLoading(false);
  }
};


  const showGreetingIdeas = () => {
    setShowAdditionalSections(true);
  };

  const generateTextIdeas = async () => {
    setLoading(true);
    setIsGeneratingText(true);
    try {
      // Збираємо інформацію з необхідних секцій
      const textPromptData = {
        cardMood: formData.cardMood,
        gender: formData.gender,
        age: formData.age,
        person: formData.person,
        hobbies: formData.hobbies,
        greetingSubject: formData.greetingSubject,
        traits: formData.traits,
      };
      // Відправляємо на локальний бекенд
      const response = await fetch("https://vps66716.hyperhost.name:5000/api/generate-greetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          traits: textPromptData.traits,
          greetingSubject: textPromptData.greetingSubject,
          gender: textPromptData.gender
        }),
      });
      const data = await response.json();
      if (data.ideas && Array.isArray(data.ideas)) {
        setTextIdeas([
          ...data.ideas,
          ...Array(5 - data.ideas.length).fill("")
        ].slice(0, 5));
      } else {
        alert("Не вдалося отримати ідеї тексту від сервера.");
      }
    } catch (error) {
      console.error("Помилка генерації тексту:", error);
      alert("Помилка при генерації ідей тексту: " + error.message);
    } finally {
      setLoading(false);
      setIsGeneratingText(false);
    }
  };

  const progress = getFormProgress(formData);

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-header">
        <h1>Створи персоналізоване зображення до привітання або жесту разом з Привітайком</h1>
        </div>
        <form onSubmit={handleSubmit}>


<CardStyleSection
  ref={cardStyleRef}
  cardStyleOptions={cardStyleOptions}
  formData={formData}
  customCardStyle={customCardStyle}
  setCustomCardStyle={setCustomCardStyle}
  handleOptionSelect={handleOptionSelect}
  scrollToNextSection={() => scrollToRef(cardMoodRef)}
/>

<CardMoodSection
  ref={cardMoodRef}
  cardMoodOptions={cardMoodOptions}
  formData={formData}
  customCardMood={customCardMood}
  setCustomCardMood={setCustomCardMood}
  handleOptionSelect={handleOptionSelect}
  scrollToNextSection={() => scrollToRef(bioRef)}
/>

<PhotoSection
  formData={formData}
  setFormData={setFormData}
/>

<BioSection
  ref={bioRef}
  formData={formData}
  handleOptionSelect={handleOptionSelect}
  genderOptions={genderOptions}
  filteredOptions={filteredOptions}
  scrollToNextSection={() => scrollToRef(hobbiRef)}
/>

<HobbiSection
  ref={hobbiRef}
  formData={formData}
  handleOptionSelect={handleOptionSelect}
  customHobby={customHobby}
  optionsHobbies={optionsHobbies}
/>

<GreetingTextSection
  ref={greetingTextRef}
  formData={formData}
  handleInputChange={handleInputChange}
  showGreetingIdeas={showGreetingIdeas}
  scrollToNextSection={() => scrollToRef(greetingSubjectRef)}
/>

{showAdditionalSections && (
  <>
    <GreetingSubjectSection
      ref={greetingSubjectRef}
      formData={formData}
      handleOptionSelect={handleOptionSelect}
      optionsGreetingSubject={optionsGreetingSubject}
      scrollToNextSection={() => scrollToRef(traitsRef)}
    />

    <TraitsSection
      ref={traitsRef}
      formData={formData}
      handleOptionSelect={handleOptionSelect}
      customTrait={customTrait}
      optionsTraits={optionsTraits}
    />

    <button
      type="button"
      onClick={generateTextIdeas}
      disabled={loading}
      style={{
        width: "100%",
        maxWidth: "300px",
        height: "50px",
        backgroundColor: "#64255c",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "300",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        margin: "20px auto",
        display: "block"
      }}
    >
      {loading ? "Генеруємо ідеї..." : "Генерувати ідеї тексту"}
    </button>

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
  </>
)}

          {/* Додатковий відступ після блоку з ідеями тексту */}
          {showAdditionalSections && <div style={{ height: "170px" }}></div>}

    

          {/* Дублююча кнопка внизу контенту */}
          <MainDuplicateBtn
          progress={progress}
          loading={loading}
          duplicateBtnRef={duplicateBtnRef}
          showAdditionalSections={showAdditionalSections}
        />
          {/* Фіксований MainButton показується лише якщо клавіатура закрита, дублююча кнопка не видима і не показуємо додаткові секції */}
          {!isKeyboardOpen && isFixedButtonVisible && !showAdditionalSections && <MainButton loading={loading} progress={progress} />}

          {/* Згенероване зображення під кнопкою */}
          {generatedImageUrl && (
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <h2>Згенероване зображення</h2>
              <img src={generatedImageUrl} alt="Згенероване" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 2px 12px #ccc" }} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
