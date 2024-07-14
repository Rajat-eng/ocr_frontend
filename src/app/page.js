"use client";
import { useState, useRef } from "react";
import { Upload } from "../components/upload";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(text);
  return (
    <main className="p-4">
      <div className="flex gap-2 border-2 border-red-400">
        <div className="h-auto border-2 border-cyan-400 p-2 grow-[.5]">
          <Upload setText={setText} setLoading={setLoading} />
        </div>

        <div className="h-500  border-2 border-cyan-400 grow-[.5] p-2">
          {loading ? (
            <p>loading...</p>
          ) : (
            <textarea className="w-full bg-slate-100 p-4 h-full" value={text} />
          )}
        </div>
      </div>
    </main>
  );
}
