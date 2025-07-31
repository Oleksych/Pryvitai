import { useState } from 'react';
import { openaiApi } from '../api/openai.js';

export const useTextGeneration = () => {
  const [textIdeas, setTextIdeas] = useState(["", "", "", "", ""]);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const generateTextIdeas = async (formData) => {
    setIsGeneratingText(true);
    try {
      const result = await openaiApi.generateTexts(formData);
      setTextIdeas(result);
    } catch (error) {
      console.error("Помилка генерації:", error);
    } finally {
      setIsGeneratingText(false);
    }
  };

  const selectText = (text, setFormData, setShowAdditionalSections) => {
    setFormData(prev => ({ ...prev, greetingText: text }));
    setShowAdditionalSections(false);
  };

  return {
    textIdeas,
    setTextIdeas,
    isGeneratingText,
    setIsGeneratingText,
    editingIndex,
    setEditingIndex,
    generateTextIdeas,
    selectText,
  };
};
