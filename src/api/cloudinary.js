// API для роботи з Cloudinary
export const cloudinaryApi = {
  uploadImage: async (file) => {
    const cloudName = "dnma2ioeb";
    const uploadPreset = "my_unsigned_preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Не вдалося завантажити фото на Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  }
}; 