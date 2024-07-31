import { useEffect, useState } from "react";
import styles from "./ProblemStyle.module.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";

// Importing themes
import "ace-builds/src-noconflict/mode-c_cpp";

// Light Themes
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
//import "ace-builds/src-noconflict/theme-ipad";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-solarized_light";

// Dark Themes
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-clouds_midnight";
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
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

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

  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleSettings = () => {
    setIsBlurred((prev) => !prev);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setEditorTheme(selectedTheme);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className={`${styles.container} ${isBlurred ? styles.blurred : ''}`}>
        <Sidebar />
        {user && (
          <>
            <img src="/settings1.png" className="user_settings" alt="Settings"/>
            <img src={user.image} className="user_image" alt="User"/>
          </>
        )}
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
        <div className={styles.editor}>
          <AceEditor
            key={editorTheme}
            mode="c_cpp"
            theme={`${editorTheme}`} // Apply the theme correctly
            name="editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            style={{ width: '100%', height: '100%' }}
            fontSize={20}
            showPrintMargin={false}
            value={`
#include <stdio.h> 
int main() 
{ 
    printf("Hello, world!\\n"); 
    return 0; 
}
`}
          />
          <div className={styles.editor_actions}>
            <button onClick={handleSettings}>Settings</button>
            <p>Copyright (c) 2010, Ajax.org B.V. All rights reserved.</p>
          </div>
        </div>
      </div>
      {isBlurred && (
        <div className={styles.modal}>
          <img src='/close.png' onClick={handleSettings} alt="Close"/>
          <h1>Select editor theme</h1>
          <select onChange={handleThemeChange} value={editorTheme}>
            {themes.map(theme => (
              <option key={theme.name} value={theme.name}>
                {theme.caption}
              </option>
            ))}
          </select>
          <h1>Select editor font</h1>
        </div>
      )}
    </div>
  );
};

export default Problem;
