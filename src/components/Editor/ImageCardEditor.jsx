import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CANVAS_MAX_WIDTH = 600;
const BANNER_HEIGHT = 100;

const ImageCardEditor = ({ imageUrl, text }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Поділитися зображенням
  const handleShare = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (navigator.share && blob) {
        const file = new File([blob], "pryvitai-card.png", { type: "image/png" });
        navigator.share({
          title: "Листівка з Привітайком",
          files: [file]
        });
      } else {
        // Fallback для десктопу
        const dataUrl = canvas.toDataURL("image/png");
        navigator.clipboard.writeText(dataUrl);
        alert("Посилання скопійовано в буфер обміну");
      }
    }, "image/png");
  };

  // Створити нове зображення
  const handleCreateNew = () => {
    navigate("/");
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
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 16px",
          fontSize: 14,
          borderRadius: 8,
          border: "none",
          background: "#6c757d",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        ← Назад
      </button>
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
      <div style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 32,
        "@media (max-width: 768px)": {
          flexDirection: "column",
          alignItems: "center"
        }
      }}>
        <button
          onClick={handleDownload}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "120px",
            backgroundColor: "#28a745",
            color: "white"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#218838";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#28a745";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Завантажити
        </button>
        <button
          onClick={handleShare}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "120px",
            backgroundColor: "#007bff",
            color: "white"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#0056b3";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#007bff";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Поділитися
        </button>
        <button
          onClick={handleCreateNew}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "120px",
            backgroundColor: "#6c757d",
            color: "white"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#545b62";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#6c757d";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Створити нове
        </button>
      </div>
    </div>
  );
};

export default ImageCardEditor; 