import React, { useEffect, useRef } from "react";

const CANVAS_MAX_WIDTH = 600;
const PADDING = 0;
const BANNER_HEIGHT = 100;

const ImageCardEditor = ({ imageUrl, text }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      // Розрахунок розмірів
      const scale = Math.min(CANVAS_MAX_WIDTH / img.width, 1);
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const canvasWidth = imgWidth;
      const canvasHeight = imgHeight + BANNER_HEIGHT;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Малюємо зображення
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

      // Малюємо плашку
      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(0, imgHeight, canvasWidth, BANNER_HEIGHT);

      // Малюємо текст
      ctx.font = "22px sans-serif";
      ctx.fillStyle = "#222";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Переносимо текст, якщо він довгий
      const lines = wrapText(ctx, text, canvasWidth - 40);
      const lineHeight = 28;
      const totalTextHeight = lines.length * lineHeight;
      let y = imgHeight + BANNER_HEIGHT / 2 - totalTextHeight / 2 + lineHeight / 2;
      lines.forEach(line => {
        ctx.fillText(line, canvasWidth / 2, y);
        y += lineHeight;
      });
    };
  }, [imageUrl, text]);

  // Функція для переносу тексту
  function wrapText(ctx, text, maxWidth) {
    if (!text) return [""];
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  }

  // Завантаження зображення
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "pryvitai-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#f7f7f7"
    }}>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "auto",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          background: "#fff"
        }}
      />
      <button
        onClick={handleDownload}
        style={{
          marginTop: 32,
          padding: "12px 32px",
          fontSize: 18,
          borderRadius: 24,
          border: "none",
          background: "#64255c",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}
      >
        Завантажити листівку
      </button>
    </div>
  );
};

export default ImageCardEditor; 