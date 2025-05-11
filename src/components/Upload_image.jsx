"use client";

import { useState } from "react";

export default function Upload_Image({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("No image selected");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "h5snbfrc");

    const res = await fetch("https://api.cloudinary.com/v1_1/dj9bviu2j/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const imageUrl = data.secure_url;
    console.log("Image URL:", imageUrl); // ✅ you get the URL here

    if (onImageUpload) {
      onImageUpload(imageUrl); // send URL to parent
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload} className="bg-[#8B5E3C] text-white px-4 py-2 ">
        Upload Image
      </button>
    </div>
  );
}
