import { useCallback } from 'react';

export const useScrollToImage = () => {
  const scrollToGeneratedImage = useCallback(() => {
    const generatedImageElement = document.querySelector('.generated-image-container');
    if (generatedImageElement) {
      const rect = generatedImageElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollTop - window.innerHeight / 2;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const scrollToGeneratedImageWithDelay = useCallback(() => {
    setTimeout(() => {
      scrollToGeneratedImage();
    }, 100);
  }, [scrollToGeneratedImage]);

  return { 
    scrollToGeneratedImage,
    scrollToGeneratedImageWithDelay 
  };
}; 