import { useEffect, useRef, useState } from "react";
import styles from "./ProblemStyle.module.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";

// Importing modes and themes
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-cloud_editor_dark";

import "ace-builds/src-noconflict/ext-language_tools";

import { themes } from "./themes";

// Define types
interface Problem {
  problem_id: number;
  statement: string;
}

const Problem = () => {
  const { problem_id } = useParams<{ problem_id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [editorTheme, setEditorTheme] = useState<string>("monokai");
  const [editorFontFamily, setEditorFontFamily] = useState<string>("'Courier New', Courier, monospace");
  const [editorFontSize, setEditorFontSize] = useState<string>("16px");
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  const user = JSON.parse(localStorage.getItem("user") as string) as any;

  const editorRef = useRef<AceEditor | null>(null);

  const fontFamilies = [
    "Arial, Helvetica, sans-serif",
    "'Times New Roman', Times, serif",
    "'Courier New', Courier, monospace",
    "Georgia, serif",
    "Verdana, Geneva, sans-serif",
    "Tahoma, Geneva, sans-serif",
    "'Trebuchet MS', Helvetica, sans-serif",
    "'Lucida Console', Monaco, monospace",
    "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    "Garamond, serif",
    "'Comic Sans MS', cursive, sans-serif",
    "Impact, Charcoal, sans-serif",
    "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
    "'Roboto', sans-serif",
    "'Open Sans', sans-serif"
  ];

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await axios.get(`https://onetech.onrender.com/api/getProblemById/${problem_id}`);
        setProblem(response.data.result.data[0].data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    getProblem();
  }, [problem_id]);

  const handleEditorLoad = (editor: any) => {
    editorRef.current = editor; // Store editor instance
    editor.setOptions({
      fontSize: editorFontSize,
      fontFamily: editorFontFamily,
    });
  };

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (editor) {
      editor.setOptions({ fontSize: editorFontSize });
    }
  }, [editorFontSize]); // Run effect when editorFontSize changes

  const handleSettings = () => {
    setIsBlurred((prev) => !prev);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setEditorTheme(selectedTheme);
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    setEditorFontFamily(selectedFont);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    if(size === '')
    {
      setEditorFontSize("16px");
    }
    else if (!isNaN(Number(size))) { // Check if input is empty or valid number
      setEditorFontSize(`${size}px`); // Default to '16px' if empty
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className={`${styles.container} ${isBlurred ? styles.blurred : ''}`}>
        <Sidebar />
        {
          user && 
          <>
            <img src="/settings1.png" className="user_settings"/>
            <img src={user.image} className="user_image"/>
          </>
        }
        <div className={styles.row1}>
          <h1>
            OneTech / Problemset / Problem # {problem?.problem_id}
          </h1>
        </div>
        <div className={styles.row2}>
          <button>Statement</button>
          <button>Cases</button>
          <button>Solutions</button>
        </div>
        <h2>Statement</h2>
        <div className={styles.box}>{problem?.statement}</div>
        <div className={styles.editor_actions}>
            <button onClick={handleSettings}>Settings</button>
            <p>Copyright (c) 2010, Ajax.org B.V. All rights reserved.</p>
        </div>
      </div>
      {isBlurred && (
        <div className={styles.modal}>
          <img src='/close.png' onClick={handleSettings} alt="Close"/>

          <h1>Theme options</h1>

          <select onChange={handleThemeChange} value={editorTheme}>
            {themes.map(theme => (
              <option key={theme.name} value={theme.name}>
                {theme.caption}
              </option>
            ))}
          </select>

          <h1>Font options</h1>

          <p>Font family</p>

          <p>Font size</p>

          <br/>

          <select onChange={handleFontChange} value={editorFontFamily}>
            {fontFamilies.map(fontFamily => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </select>
          
          <input type="text" minLength={1} maxLength={2} onChange={handleFontSizeChange}/>
        </div>
      )}
      <div className={styles.editor}>
          <AceEditor
            ref={editorRef}
            mode="c_cpp"
            theme={editorTheme} // Apply the theme correctly
            name="editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            style={{ width: '100%', height: '100%', fontFamily: editorFontFamily, fontSize: editorFontSize }}
            showPrintMargin={false}
            value={`#include <stdio.h>\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}\n`}
            onLoad={handleEditorLoad} // Ensure options are applied when editor loads
          />
      </div>
    </div>
  );
};

export default Problem;
