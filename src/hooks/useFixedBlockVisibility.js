import { useEffect, useRef, useState } from 'react';

export const useFixedBlockVisibility = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isFixedButtonVisible, setIsFixedButtonVisible] = useState(true);
  const initialHeight = useRef(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < initialHeight.current - 120);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setupIntersectionObserver = (duplicateBtnRef) => {
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
  };

  return { isKeyboardOpen, isFixedButtonVisible, setupIntersectionObserver };
}; 