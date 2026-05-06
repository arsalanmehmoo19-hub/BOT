"use client";
import { useState } from "react";

interface Block {
  id: string;
  type: "paragraph" | "image";
  text?: string;
  url?: string;
}

export default function PageEditor({ value, onChange }: { value: Block[]; onChange: (blocks: Block[]) => void }) {
  const [blocks, setBlocks] = useState<Block[]>(value || []);

  function handleTextChange(idx: number, text: string) {
    const updated = blocks.map((b, i) => i === idx ? { ...b, text } : b);
    setBlocks(updated);
    onChange(updated);
  }

  function handleAddBlock(type: Block["type"]) {
    const newBlock: Block = { id: Math.random().toString(36).slice(2), type, text: type === "paragraph" ? "" : undefined, url: type === "image" ? "" : undefined };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    onChange(updated);
  }

  function handleImageChange(idx: number, url: string) {
    const updated = blocks.map((b, i) => i === idx ? { ...b, url } : b);
    setBlocks(updated);
    onChange(updated);
  }

  function handleDeleteBlock(idx: number) {
    const updated = blocks.filter((_, i) => i !== idx);
    setBlocks(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => (
        <div key={block.id} className="flex items-center gap-2">
          {block.type === "paragraph" ? (
            <textarea
              className="border p-2 rounded w-full"
              value={block.text}
              onChange={e => handleTextChange(idx, e.target.value)}
              placeholder="Paragraph text..."
            />
          ) : (
            <input
              className="border p-2 rounded w-full"
              value={block.url}
              onChange={e => handleImageChange(idx, e.target.value)}
              placeholder="Image URL..."
            />
          )}
          <button onClick={() => handleDeleteBlock(idx)} className="text-red-500">Delete</button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={() => handleAddBlock("paragraph")}
          className="bg-blue-500 text-white px-3 py-1 rounded">Add Paragraph</button>
        <button onClick={() => handleAddBlock("image")}
          className="bg-green-500 text-white px-3 py-1 rounded">Add Image</button>
      </div>
    </div>
  );
}
