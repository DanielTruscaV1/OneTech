import { useEffect, useRef, useState } from "react";
import styles from "./ProblemStyle.module.css";
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


import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-typescript';
//import 'ace-builds/src-noconflict/mode-go';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-objectivec';
import 'ace-builds/src-noconflict/mode-perl';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-less';
import 'ace-builds/src-noconflict/mode-json';
import Header from "./Header";


// Define types
interface Problem {
  title: string;
  problem_id: number;
  statement: string;
  example: string[];
}

const Problem = () => {

  const user = JSON.parse(localStorage.getItem("user") as string) as any;

   //@ts-ignore
  const [settings, setSettings] = useState<boolean>(false)

  const { problem_id } = useParams<{ problem_id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
   //@ts-ignore
  const [editorTheme, setEditorTheme] = useState<string>(user.editorTheme);
   //@ts-ignore
  const [editorFontFamily, setEditorFontFamily] = useState<string>(user.editorFontFamily);
   //@ts-ignore
  const [editorFontSize, setEditorFontSize] = useState<string>(user.editorFontSize);
   //@ts-ignore
  const [editorLanguage, setEditorLanguage] = useState<string>(user.editorLanguage);
   //@ts-ignore
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

   //@ts-ignore
  const [toggle, setToggle] = useState<boolean>(false);

   //@ts-ignore
  const [section, setSection] = useState<number>(0);

  const editorRef = useRef<AceEditor | null>(null);

  const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

   //@ts-ignore
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

  //@ts-ignore
  const aceEditorModes = [
    'javascript',
    'python',
    'java',
    'c_cpp',
    'ruby',
    'php',
    'swift',
    'typescript',
    'golang',
    'rust',
    'kotlin',
    'csharp',
    'objectivec',
    'perl',
    'sql',
    'html',
    'css',
    'sass',
    'less',
    'json'
  ];
  
  const user_id = localStorage.getItem("userID") as string;

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

  useEffect(() => {
    const updateUser = async () => {
      try {
        // Update the user via the API
        await axios.patch(
          `https://onetech.onrender.com/api/updateUserById/${user_id}`,
          {
            editorTheme, 
            editorLanguage, 
            editorFontFamily, 
            editorFontSize
          }
        );

        // Update the user in local storage
        const user = JSON.parse(localStorage.getItem('user') as string) || {};
        const updatedUser = {
          ...user,
          editorTheme,
          editorLanguage,
          editorFontFamily,
          editorFontSize
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    updateUser();
  }, [toggle]);

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (editor) {
      editor.setOptions({ fontSize: editorFontSize });
    }
  }, [editorFontSize]); // Run effect when editorFontSize changes


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1>
                    #{problem && problem.problem_id } - {problem && problem.title}
                </h1>
            </div>
            <div className={styles.card}>
                <h1>
                    Statement
                </h1>
                <p>
                    {problem && problem.statement}
                </p>
            </div>
            {
                problem && problem.example.map((e : any, index : any) => {
                    return  <div className={styles.card}>
                        <h1>
                            Example {index + 1}
                        </h1>
                        <p>
                            {e}
                        </p>
                    </div>
                })
            }
            <div className={styles.ide}>
                {
                    isLargeDevice && 
                    <>
                        <AceEditor
                            mode="javascript" // Set the language mode
                            theme="monokai"   // Set the theme
                            name="ace-editor"
                            editorProps={{ $blockScrolling: true }}
                            value={`console.log('Hello, world!');`} // Set the initial content
                            onChange={(newValue) => {
                                console.log('Editor content:', newValue);
                            }}
                            width="100%" // Make the editor responsive
                            height="100%" // Set the height
                            style={{fontSize: "22px"}}
                        />
                    </>
                }
            </div>
            <br/>
        </div>
    </div>
  );
};

export default Problem;
