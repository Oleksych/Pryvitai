import { useState } from 'react';
import { optionsHobbies, optionsTraits } from '../data/options';

export const useFormData = () => {
  const [formData, setFormData] = useState({
    person: "",
    gender: "",
    age: "",
    greetingSubject: "",
    customGreetingSubject: "",
    hobbies: [],
    hobbiesDescription: "",
    customHobby: "",
    traits: [],
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

  const resetForm = () => {
    setFormData({
      person: "",
      gender: "",
      age: "",
      greetingSubject: "",
      customGreetingSubject: "",
      hobbies: [],
      hobbiesDescription: "",
      customHobby: "",
      traits: [],
      customTrait: "",
      appearanceDescription: "",
      photoFile: null,
      cardStyle: "",
      cardMood: "",
      greetingText: "",
    });
    setCustomHobby("");
    setCustomTrait("");
    setCustomCardStyle("");
    setCustomCardMood("");
  };

  return {
    formData,
    setFormData,
    customHobby,
    customTrait,
    customCardStyle,
    customCardMood,
    setCustomHobby,
    setCustomTrait,
    setCustomCardStyle,
    setCustomCardMood,
    handleOptionSelect,
    handleInputChange,
    handlePhotoChange,
    resetForm,
  };
}; 