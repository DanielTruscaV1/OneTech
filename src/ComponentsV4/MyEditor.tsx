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


import { v4 as uuidv4 } from 'uuid';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const themes = [
  'material',
  'dracula',
  'solarized',
  'eclipse',
  'monokai',
  'neo'
];

import { RateLimiter } from './RateLimiter'
//@ts-ignore
import { stringify } from 'querystring';
import axios from 'axios';

interface Example {
  input: string;
  output: string;
}

interface MyEditorProps {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  cases: Example[] | undefined;
  setTab: any;
  problem_id: string | undefined;
  problem_title: string | undefined;
}

const MyEditor: React.FC<MyEditorProps> = ({ setShowAlert, cases, setTab, problem_id, problem_title}) => {

  const user = JSON.parse(localStorage.getItem("user") as string);

  const user_id = localStorage.getItem("user_id") as string;

  const general_theme = localStorage.getItem("theme");

  const notify = () => toast("Code Editor settings changed.");

  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  const [result, setResult] = useState<any>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('dracula'); // Default theme
  const [fontSize, setFontSize] = useState<string>('14px'); // Default font size
  const [editorInstance, setEditorInstance] = useState<any>(null); // Track the editor instance

  //@ts-ignore
  const handleChange = (editor: any, data: any, value: string) => {
    setCode(value);
  };

  const rateLimiter = new RateLimiter(30, 1 * 60 * 1000); // 3 minutes in milliseconds


  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour time format; omit for 12-hour
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const now = new Date(); 

  const handleRunCode = async () => {
    try {
      rateLimiter.makeRequest(async () => {
        const response = await fetch('https://testsite-lci1.onrender.com/compile', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            testcases: cases,
          }),
        });

        
        const data = await response.json();
        if(!data.compiler_results)
        {
          setResult("Compilation error.");
          setHasError(true);
        }
        else 
        {
          setResult("Compilation sucessfull.");
          setHasError(false);

          const uniqueId = uuidv4();

          let p = 0, tr = 0, tm = 0;
          for(let i = 0;i < data.compiler_results.length;i++)
            if(data.compiler_results[i].success)
            {
                p++;
                tr += data.compiler_results[i].actual_runtime;
                tm += data.compiler_results[i].actual_memory;
            }

          const newSubmission = {
            problem_id,
            problem_title,
            submission_id: uniqueId,
            time: formatDate(now),
            author: JSON.stringify(user_id),
            code,
            total_good: p,
            total: data.compiler_results.length,
            total_runtime: tr,
            total_memory: tm,
            compiler_results: data.compiler_results,
          }

          const newUser =  {
            ...user, // Spread the existing user data
            submissions: [ // Update the submissions field
              ...(Array.isArray(user.submissions) ? user.submissions : []), // Ensure submissions is an array
               // Add the new submission
              uniqueId,
            ]
          }

          const response1 = await axios.patch(`https://onetech.onrender.com/api/updateUserById/${user_id}`, newUser);

          await axios.post(`https://onetech.onrender.com/api/createSubmission/`, {content: newSubmission});

          if(response1.status == 201)
          {
            
            localStorage.setItem("user", JSON.stringify(newUser));
            window.location.reload();
            setTab(1);

            if(p == data.compiler_results.length)
              setShowAlert(true);
          }
        }

        
      });
    } catch (error) {
      console.error('Error running code:', error);
      setResult("We have encountered an unexpected error.");
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
    notify();
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(event.target.value);
    notify();
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
            mode: 'text/x-c++src',
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
        <ToastContainer />
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="editor-input">
          <h1>
            Input:
          </h1>
          <textarea >

          </textarea>
        </div>
        <div className="editor-output">
          <h1>
            Output:
          </h1>
          <button className="editor-button" style={{float:"right", marginRight: "10px", marginTop: "-4vh"}} onClick={handleSubmitCode}>
            {
              general_theme == "light" 
              ? <img src="/upload_white.png"/>
              : <img src="/upload_black.png"/>
            }
            Submit
          </button>
          <button className="editor-button" style={{float:"right", marginRight: "10px", marginTop: "-4vh"}} onClick={handleRunCode}>
            {
              general_theme == "light" 
              ? <img src="/gears_white.png"/>
              : <img src="/gears_black.png"/>
            }
            Run
          </button>
          { 
            hasError &&
            <span style={{color: "rgb(200, 80, 80)"}}>
              {result}
            </span>
          }
          { 
            !hasError &&
            <span>
              {result}
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
