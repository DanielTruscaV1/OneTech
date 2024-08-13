// EditorComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import './EditorComponent.css'; // Import your updated CSS file

interface EditorComponentProps {
  initialData?: any;
  onSave: (data: any) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ initialData, onSave }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorJS | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        placeholder: 'Start writing here...',
        data: initialData,
      });

      setEditor(editorInstance);

      return () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = '';
        }
      };
    }
  }, [initialData]);

  const handleSave = () => {
    if (editor) {
      editor
        .save()
        .then((outputData) => {
          onSave(outputData);
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
        });
    }
  };

  return (
    <div className="editor-container">
      <div ref={editorRef}></div>
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditorComponent;
