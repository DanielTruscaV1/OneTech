import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; // Default theme
import 'codemirror/theme/dracula.css'; // Additional theme
import 'codemirror/theme/solarized.css'; // Additional theme
import 'codemirror/theme/eclipse.css'; // Additional theme
import 'codemirror/theme/monokai.css'; // Additional theme
import 'codemirror/theme/neo.css'; // Additional theme
import './EditorStyles.css'; // Custom styles

const themes = [
  'material',
  'dracula',
  'solarized',
  'eclipse',
  'monokai',
  'neo'
];

const MyEditor: React.FC = () => {
  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  const [theme, setTheme] = useState<string>('material'); // Default theme
  const [fontSize, setFontSize] = useState<string>('14px'); // Default font size
  const [editorInstance, setEditorInstance] = useState<any>(null); // Track the editor instance

  //@ts-ignore
  const handleChange = (editor: any, data: any, value: string) => {
    setCode(value);
  };

  const handleRunCode = () => {
    try {
      eval(code); // Caution with eval in production
    } catch (error) {
      console.error('Error running code:', error);
    }
  };

  const handleClearCode = () => {
    setCode('');
  };

  const handleSubmitCode = () => {
    // Logic to handle code submission
    console.log('Code submitted:', code);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(event.target.value);
  };

  useEffect(() => {
    if (editorInstance) {
      // Apply the font size when it changes
      editorInstance.getWrapperElement().style.fontSize = fontSize;
    }
  }, [fontSize, editorInstance]);

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2 className="editor-title">OneTech Editor</h2>
        <div className="editor-actions">
          <button className="editor-button" onClick={handleClearCode}>Clear</button>
          <button className="editor-button" onClick={handleRunCode}>Run</button>
          <button className="editor-button" onClick={handleSubmitCode}>Submit</button>
          <select className="editor-dropdown" onChange={handleThemeChange} value={theme}>
            {themes.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <select className="editor-font-size" onChange={handleFontSizeChange} value={fontSize}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: theme,
            lineNumbers: true,
            readOnly: false,
            indentUnit: 2,
            tabSize: 2,
          }}
          onBeforeChange={handleChange}
          editorDidMount={(editor) => {
            setEditorInstance(editor);
            // Apply initial font size
            editor.getWrapperElement().style.fontSize = fontSize;
          }}
        />
      </div>
    </div>
  );
};

export default MyEditor;
