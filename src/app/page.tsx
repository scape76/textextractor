"use client";

import Tesseract from "tesseract.js";

import * as React from "react";
import { performOCR } from "@/lib/ocr";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("");
  const imageRef = React.useRef<HTMLImageElement>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <img src="#" alt="your image" ref={imageRef} className="max-w-[280px]" />
      <input
        type="file"
        onChange={async (e) => {
          if (imageRef.current)
            imageRef.current.src = URL.createObjectURL(e.target.files![0]);
          setFile(e.target.files![0]);
        }}
      />
      <button
        onClick={async () => {
          if (!file) return;
          try {
            setIsLoading(true);
            setText((await performOCR(file)) || "");
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        Convert to text
      </button>
      <span>{isLoading ? "Loading..." : text}</span>
    </main>
  );
}
