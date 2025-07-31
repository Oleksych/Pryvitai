import { useCallback } from 'react';

export const useScrollToSection = () => {
  const scrollToRef = useCallback((ref) => {
    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollTop - window.innerHeight / 2.5;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  return { scrollToRef };
}; 