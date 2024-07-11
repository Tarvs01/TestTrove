'use client'
// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

import ReactQuill from "react-quill";

const Editor = () => {
  // Editor state
  const [value, setValue] = useState("");

  // Editor ref
  const quillRef: React.LegacyRef<ReactQuill> = useRef(null);

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
        if(!input.files){
            return;
        }
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        if(!quillRef.current){
            return;
        }
        const quillEditor = quillRef.current.getEditor();

        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl);
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className={styles.wrapper}>
      <QuillEditor
        ref={quillRef}
        className={styles.editor}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

export default Editor;