import React from "react";
import {
  cardStyleOptions,
  cardMoodOptions,
  optionsHobbies,
  optionsPerson,
  optionsGreetingSubject,
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
    appearanceDescription: "",
    photoFile: null,
    cardStyle: "",
    cardMood: "",
    greetingText: "",
  });

  const [customHobby, setCustomHobby] = useState("");
  const [customCardStyle, setCustomCardStyle] = useState("");
  const [customCardMood, setCustomCardMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isFixedButtonVisible, setIsFixedButtonVisible] = useState(true);
  const initialHeight = useRef(window.innerHeight);
  const duplicateBtnRef = useRef(null);

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
      appearanceDescription: "",
      photoFile: null,
      cardStyle: "",
      backgroundText: "",
      greetingText: "",
    });
    setCustomHobby("");
    setCustomCardStyle("");
    setCustomCardMood("");
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
  const submitData = `Сформуй короткий, художній промт та опис сюжету для генерації зображення в DALL-E,  стиль зображення - ${formData.cardStyle}, настрій зображення - ${formData.cardMood}, та враховуй наступне фото: ${uploadedImageUrl}, для генерації подібних речей, персонажів або для натхнення сюжету (але хай DALL-E не вигадує персонажів яких немає на закріпленому фото або далі в описі).
  Додай до композиції сюжету наступні атрибути та символи або ті речі які прямо асоціюються з наступними хобі, захопленнями або родом діяльності: ${formData.hobbies}. Вбудуй їх логічно та послідовно до композиції щоб все було на своїх місцях та доповнювало сюжет, але не треба малювати забагато речей на зображенні, малюй їх менше але чіткіше.
  Також для генерації сюжету використовуй, атрибути, символи та сенси з наступного тексту привітання: ${formData.greetingText}. На основі тексту привітання будуй логічну сюжетну композицію де всі речі на своїх місцях, доповнюють композицію та при цьому не перевантажують великою кількістю не потрібних та недомальованих деталей, певні сенси тексту привітання можна проігнорувати заради подальшої чіткості композиції згенерованого зображення.
Саме згенероване зображення має бути без тексту.
`;

    // Тепер формуємо дані для Make
    // const submitData = new FormData();
    // submitData.append("person", formData.person);
    // submitData.append("gender", formData.gender);
    // submitData.append("age", formData.age);
    // submitData.append("greetingSubject", formData.greetingSubject);
    // submitData.append("hobbies", formData.hobbies.join(", "));
    // submitData.append("appearanceDescription", formData.appearanceDescription);
    // submitData.append("photoUrl", uploadedImageUrl); // ⬅️ тільки URL
    // submitData.append("cardStyle", formData.cardStyle);
    // submitData.append("greetingText", formData.greetingText);
    // submitData.append("promtForAI", promptForAI);
    

    // const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
    //   method: "POST",
    //   body: submitData,
    // });
    const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt: submitData,
    photoURl: uploadedImageUrl,
   }), // ключ prompt — для Make
});


    const text = await response.text();
    console.log("Відповідь сервера:", text);

    if (text) {
      const imageUrl = text.trim().replace(/^"+|"+$/g, "");
      window.location.href = imageUrl;
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
    alert(
      `Ідеї для тексту привітання:\n\n- В 30 років все тільки починається! Продовжуй рухатися до мети!\n- Бажаю здоров'я, щастя і нових звершень!\n- Нехай кожен день приносить радість і успіх!`
    );
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
  cardStyleOptions={cardStyleOptions}
  formData={formData}
  customCardStyle={customCardStyle}
  setCustomCardStyle={setCustomCardStyle}
  handleOptionSelect={handleOptionSelect}
/>

<CardMoodSection
  cardMoodOptions={cardMoodOptions}
  formData={formData}
  customCardMood={customCardMood}
  setCustomCardMood={setCustomCardMood}
  handleOptionSelect={handleOptionSelect}
/>

<PhotoSection
  formData={formData}
  setFormData={setFormData}
/>

<BioSection
  formData={formData}
  handleOptionSelect={handleOptionSelect}
  genderOptions={genderOptions}
  filteredOptions={filteredOptions}
/>

{/* Наступна секція з чим вітаємо піде до сторінки: "FirstText" */}
          {/* <section>
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
          </section> */}

<HobbiSection
  formData={formData}
  handleOptionSelect={handleOptionSelect}
  customHobby={customHobby}
  optionsHobbies={optionsHobbies}
/>

<GreetingTextSection
  formData={formData}
  handleInputChange={handleInputChange}
  showGreetingIdeas={showGreetingIdeas}
/>

          {/* <section>
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
          </section> */}

  {/* Дублююча кнопка внизу контенту */}
  <MainDuplicateBtn
  progress={progress}
  loading={loading}
  duplicateBtnRef={duplicateBtnRef}
/>
  {/* Фіксований MainButton показується лише якщо клавіатура закрита і дублююча кнопка не видима */}
  {!isKeyboardOpen && isFixedButtonVisible && <MainButton loading={loading} progress={progress} />}

        </form>
      </div>
    </div>
  );
};
