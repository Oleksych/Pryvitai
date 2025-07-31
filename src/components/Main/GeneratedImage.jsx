import React from "react";
import "./GeneratedImage.css";

const GeneratedImage = ({ imageUrl, onReset, onEditImage }) => {
  if (!imageUrl) return null;

  return (
    <div className="generated-image-container">
      <div className="generated-image-header">
        <h2>Згенероване зображення</h2>
      </div>
      <div className="generated-image-wrapper">
        <img 
          src={imageUrl} 
          alt="Згенероване зображення" 
          className="generated-image"
        />
        <button 
          className="edit-image-button"
          onClick={() => onEditImage && onEditImage(imageUrl)}
        >
          Додати текст до зображення
        </button>
      </div>
      <div className="generated-image-actions">
        <button 
          className="download-button"
          onClick={() => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'generated-image.png';
            link.click();
          }}
        >
          Завантажити
        </button>
        <button 
          className="share-button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Згенероване зображення',
                url: imageUrl
              });
            } else {
              navigator.clipboard.writeText(imageUrl);
              alert('Посилання скопійовано в буфер обміну');
            }
          }}
        >
          Поділитися
        </button>
        {onReset && (
          <button 
            className="reset-button"
            onClick={onReset}
          >
            Створити нове
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratedImage; 