import React from "react";
import {
  cardStyleOptions,
  cardMoodOptions,
  optionsHobbies,
  optionsPerson,
  optionsGreetingSubject,
  optionsTraits,
} from "../data/options";
import "../components/Main/Main.css";

import MainButton from "../components/Main/MainButton";
import { getFormProgress } from "../utils/formProgress";
import { useEffect, useRef, useState } from "react";
import CardStyleSection from "../components/Sections/CardStyleSection";
import CardMoodSection from "../components/Sections/CardMoodSection";
import PhotoSection from "../components/Sections/PhotoSection";
import BioSection from "../components/Sections/BioSection";
import HobbiSection from "../components/Sections/HobbiSection";
import TraitsSection from "../components/Sections/TraitsSection";
import GreetingSubjectSection from "../components/Sections/GreetingSubjectSection";
import GreetingTextSection from "../components/Sections/GreetingTextSection";
import MainDuplicateBtn from "../components/Main/MainDuplicateBtn";
import GeneratedImage from "../components/Main/GeneratedImage";
import { useNavigate } from "react-router-dom";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { useFixedBlockVisibility } from "../hooks/useFixedBlockVisibility";
import { useFormData } from "../hooks/useFormData";
import { useImageUpload } from "../hooks/useImageUpload";
import { useTextGeneration } from "../hooks/useTextGeneration";
import { useLoading } from "../hooks/useLoading";
import { useScrollToImage } from "../hooks/useScrollToImage";
import { dalleApi } from "../api/dalle.js";
import TextIdeasDisplay from "../components/TextIdeasDisplay";
import GenerateTextButton from "../components/GenerateTextButton";

export const MainDalleFirstImage = () => {
  const navigate = useNavigate();
  const {
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
  } = useFormData();
  const { uploadImageToCloudinary } = useImageUpload();
  const {
    textIdeas,
    setTextIdeas,
    isGeneratingText,
    setIsGeneratingText,
    editingIndex,
    setEditingIndex,
    generateTextIdeas,
    selectText,
  } = useTextGeneration();
  const { loading, startLoading, stopLoading } = useLoading();
  const { scrollToGeneratedImageWithDelay } = useScrollToImage();
  const [showAdditionalSections, setShowAdditionalSections] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const duplicateBtnRef = useRef(null);

  // Додаю рефи для секцій
  const cardStyleRef = useRef(null);
  const cardMoodRef = useRef(null);
  const bioRef = useRef(null);
  const hobbiRef = useRef(null); // Додаю реф для HobbiSection
  const greetingTextRef = useRef(null);
  const greetingSubjectRef = useRef(null);
  const traitsRef = useRef(null);

  const { scrollToRef } = useScrollToSection();
  const { isKeyboardOpen, isFixedButtonVisible, setupIntersectionObserver } = useFixedBlockVisibility();

  useEffect(() => {
    setupIntersectionObserver(duplicateBtnRef);
  }, [setupIntersectionObserver]);

  const genderOptions = ["Ч", "Ж"];
  const filteredOptions = optionsPerson.filter(
    (option) => option.gender === formData.gender
  );

  const handleReset = () => {
    resetForm();
    setShowAdditionalSections(false);
    setTextIdeas(["", "", "", "", ""]);
    setIsGeneratingText(false);
    setEditingIndex(null);
    setGeneratedImageUrl(""); // Очищаємо згенероване зображення
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    try {
      let uploadedImageUrl = "";

      // Якщо є фото — спочатку завантаж його на Cloudinary
      if (formData.photoFile) {
        uploadedImageUrl = await uploadImageToCloudinary(formData.photoFile);
      }
    
      const text = await dalleApi.generateImage(formData, uploadedImageUrl);
      console.log("Відповідь сервера:", text);

      if (text) {
        const imageUrl = text.trim().replace(/^"+|"+$/g, "");
        setGeneratedImageUrl(imageUrl);
        alert("Гіпінку надіслано успішно!");
        // Не очищаємо форму одразу, щоб користувач міг побачити результат
        // handleReset();
        
        // Автоматичний скрол до згенерованого зображення
        scrollToGeneratedImageWithDelay();
      } else {
        alert("Посилання на зображення не знайдено у відповіді.");
      }
    } catch (error) {
      alert("Сталася помилка: " + error.message);
    } finally {
      stopLoading();
    }
  };

  const showGreetingIdeas = () => {
    setShowAdditionalSections(true);
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

              <GenerateTextButton
                onClick={() => generateTextIdeas(formData)}
                disabled={loading}
                loading={loading}
              />

              <TextIdeasDisplay
                textIdeas={textIdeas}
                setTextIdeas={setTextIdeas}
                isGeneratingText={isGeneratingText}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                setFormData={setFormData}
                setShowAdditionalSections={setShowAdditionalSections}
              />
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
          
          {/* Фіксований MainButton показується лише якщо клавіатура закрита, дублююча кнопка не видима, не показуємо додаткові секції і немає згенерованого зображення */}
          {!isKeyboardOpen && isFixedButtonVisible && !showAdditionalSections && !generatedImageUrl && <MainButton loading={loading} progress={progress} />}

          {/* Згенероване зображення під кнопкою */}
          <GeneratedImage 
            imageUrl={generatedImageUrl}
            onReset={handleReset}
            onEditImage={(imageUrl) => {
              // Перехід до едітора з зображенням та текстом
              const params = new URLSearchParams({
                imageUrl: imageUrl,
                text: formData.greetingText || "Ваше привітання"
              });
              navigate(`/editor?${params.toString()}`);
            }}
          />

        </form>
      </div>
    </div>
  );
}; 