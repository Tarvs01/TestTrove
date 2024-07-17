import React, { ChangeEvent } from "react";

interface TextareaProps {
  onInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name?: string;
  id?: string;
}

function Textarea({ onInput, value, name="", id="" }: TextareaProps) {
  return (
    <textarea
      onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "1px";
        e.target.style.height = `${5 + e.target.scrollHeight}px`;
        onInput(e);
      }}
      name={name}
      id={id}
      value={value}
      rows={1}
      className="border-2 border-gray-300 w-1/2 max-w-80 resize-none px-2 py-1 overflow-hidden rounded-lg focus:outline-none focus:border-blue-600"
    ></textarea>
  );
}

export default Textarea;
