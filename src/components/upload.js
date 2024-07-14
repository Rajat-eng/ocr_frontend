"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
export const Upload = ({ setText, setLoading }) => {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const handleClick = () => {
    ref.current.click();
  };

  const finalUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setText(data.data);
    } catch (error) {
      setText("");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="relative h-[300px]">
        <Image src={preview} fill alt={"Image"} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <input
            className="hidden"
            ref={ref}
            type="file"
            onChange={handleFileChange}
          />
          {!preview && (
            <button
              className="p-2 rounded-md bg-slate-600 text-white"
              onClick={handleClick}
            >
              Upload Here
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-row-reverse justify-between mt-2">
        <button
          className="p-2 rounded-md bg-slate-600 text-white"
          onClick={finalUpload}
        >
          Upload
        </button>
        <button
          className="p-2 rounded-md bg-slate-600 text-white"
          onClick={() => setPreview("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
