import React from "react";

export default function PhotoSection({ formData, setFormData }) {
  return (
    <section>
      <h2>Фото для персоналізації</h2>
      <h3>Додайте фото яке асоціюється з отримувачем привітання, з його захопленнями, діяльністю або стилем</h3>
      {/* <input
        type="text"
        placeholder="напр. підтягнутий, має гарний ніс..."
        value={formData.appearanceDescription}
        onChange={e => setFormData(prev => ({ ...prev, appearanceDescription: e.target.value }))}
      /> */}
      <div className="mt-2">
        <label
          className="custom-upload-button"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Додати фото
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  photoFile: file,
                  photoPreview: URL.createObjectURL(file),
                }));
              }
            }}
            style={{ display: "none" }}
          />
        </label>

        {formData.photoFile && (
          <div className="mt-2">
            <img
              src={formData.photoPreview}
              alt="Прев’ю фото"
              style={{
                maxWidth: "250px",
                marginTop: "10px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
} 