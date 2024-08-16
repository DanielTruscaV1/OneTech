import { useEffect, useState } from "react";
import styles from "./ProblemStyle.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "./Header";

import AlertDialog from './AlertDialog'; 

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

import Tooltip from './Tooltip'; // Import the Tooltip component

import Dialog from './Dialog'; // Adjust the import path as necessary




interface BijObject {
  problem: Problem;
}

interface Problem {
  problem_id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  input: InputDescription;
  output: OutputDescription;
  examples: Example[];
  constraints: string[];
  points: number;
  solution: string;
  cases: Example[];
}

interface InputDescription {
  description: string;
}

interface OutputDescription {
  description: string;
}

interface Example {
  input: string;
  output: string;
}


interface Problem {
  problem_id: string;
}





import { themesByName } from "@/new_components/themes";

import './EditorStyles.css';
import MyEditor from "./MyEditor";

const Problem = () => {

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [submission, setSubmission] = useState<any>();

  const openDialog = (s : any) => {
    setIsDialogOpen(true)
    setSubmission(s);
  };
  const closeDialog = () => setIsDialogOpen(false);


  const user = JSON.parse(localStorage.getItem("user") as string) as any;

   //@ts-ignore
  const [settings, setSettings] = useState<boolean>(false)

  const { problem_id } = useParams<{ problem_id: string }>();
  const [problem, setProblem] = useState<BijObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
   //@ts-ignore
  const [editorTheme, setEditorTheme] = useState<any>(themesByName[localStorage.getItem("IDE_theme") as string]);

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

  const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

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

  const [submissionsList, setSubmissionsList] = useState<any>(null);

  useEffect(() => {
    const getSubmissions = async () => {
      const response = await axios.get("https://onetech.onrender.com/api/submissions")
      console.log(response.data);
      setSubmissionsList(response.data);
    }
    getSubmissions();
  }, [])

  const [tab, setTab] = useState<number>(0);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
          <div className={styles.tabs_container}>
              <button 
                className={styles.tab} 
                style={{
                  backgroundColor: tab == 0 ? "var(--color1)" : "var(--color2)",
                  color: tab == 0 ? "var(--color5)" : "var(--color4)",
                }}
                onClick={() => setTab(0)}
              >
                Description
              </button>
              <button 
                className={styles.tab}
                style={{
                  backgroundColor: tab == 1 ? "var(--color1)" : "var(--color2)",
                  color: tab == 1 ? "var(--color5)" : "var(--color4)",
                }}
                onClick={() => setTab(1)}
              >
                Cases
              </button>
              <button 
                className={styles.tab}
                style={{
                  backgroundColor: tab == 2 ? "var(--color1)" : "var(--color2)",
                  color: tab == 2 ? "var(--color5)" : "var(--color4)",
                }}
                onClick={() => setTab(2)}
              >
                Solutions
              </button>
            </div>
            {
              tab == 0 &&
              <>
            <div className={styles.card}>
                <h1 style={{display:"flex", flexDirection:"row"}}>
                    #{problem && problem.problem.problem_id } - {problem && problem.problem.title} - <span style={{color: "#00DD55", display: "flex", flexDirection: "row", marginLeft: "7.5px"}}>{problem && problem.problem.points} <img src="/points6.png" style={{borderRadius: "50%", width:"20px", height: "20px", marginLeft:"7.5px", marginTop: "1.2vh"}}/></span>
                </h1>
            </div>
            <div className={styles.card}>
                <h1>
                    Statement
                </h1>
                <p>
                    {problem && (problem.problem.description as any)}
                </p>
            </div>
            <div className={styles.card}>
                <h1>
                    Input description
                </h1>
                <p>
                    {problem && (problem.problem.input.description as any)}
                </p>
            </div>
            <div className={styles.card}>
                <h1>
                    Output description
                </h1>
                <p>
                    {problem && (problem.problem.output.description as any)}
                </p>
            </div>
            <div className={styles.card}>
                <h1>
                    Constraints
                </h1>
                <p>
                    {problem && (problem.problem.constraints as any)}
                </p>
            </div>
            {
                problem && problem.problem.examples.map((e : any, index : any) => {
                    return  <div className={styles.card}>
                        <h1>
                            Example {index + 1}
                        </h1>
                        <p>
                            Input: {e.input}
                        </p>
                        <p>
                            Output: {e.output}
                        </p>
                    </div>
                })
            }
            </>
            }
            {
              tab == 1 && 
              <div className={styles.cases}>
                <h1>
                  Submissions List
                </h1>
                {
                    submissionsList.reverse().map((s : any) => {
                    if (s.data.problem_id === problem?.problem.problem_id) {
                    return <div className={styles.case} onClick={() => openDialog(s)}>
                      <h2> Submission <Tooltip text={s.data.submission_id}> #ID </Tooltip></h2>
                      <h2>
                          Test Cases {s.data.total_good}/{s.data.total}
                      </h2>
                      <h2>
                        Total Time: {s.data.total_runtime.toFixed(2)} ms
                      </h2>
                      <h2>
                          Total Memory: {s.data.total_memory / 1048576} MB
                      </h2>
                    </div>
                  }})
                }
                <Dialog
                  isOpen={isDialogOpen}
                  onClose={closeDialog}
                  title="Submission Info"
                >
                  <pre>
                    <SyntaxHighlighter language="python" style={dracula}>
                      {`${submission && submission.data.code}`}
                    </SyntaxHighlighter>
                  </pre>
                  <br/>
                  {submission?.data.compiler_results.map((r : any, index : number) => {
                    
                      return (
                        <div
                          key={index}
                          className="matrix-item"
                          style={{
                            width: "40%",
                            borderRadius: "10px",
                            padding: "10px",
                            border: r.success
                              ? "2px solid rgb(80, 200, 80)"
                              : "2px solid rgb(200, 80, 80)",
                          }}
                        >
                          <p>Test Case {index + 1}</p>
                          <span style={{ color: r.success ? "rgb(80, 200, 80)" : "rgb(200, 80, 80)" }}>
                            {r.success ? "Passed" : "Failed"}
                          </span>
                          <p>{r.actual_runtime.toFixed(2)} ms</p>
                          <p>{(r.actual_memory / 1048576).toFixed(2)} MB</p>
                        </div>
                      );
                  })}
                </Dialog>
              </div>
            }
            <div className={styles.ide}>
                {
                    isLargeDevice && <MyEditor setShowAlert={setShowAlert} cases={problem?.problem.cases} setTab={setTab} problem_id={problem?.problem.problem_id} problem_title={problem?.problem.title}/>
                }
            </div>
            {showAlert && (
              <AlertDialog
                message={`Problem solved successfully! You have been awarded ${problem && problem.problem.points} TechPoints.`}
                onClose={handleCloseAlert}
              />
            )}
            {
              tab == 2 && 
              <div className={styles.solutions}>
                <div className={styles.solution}>
                  <div style={{display: "flex", flexDirection: "row", width: "30vw", marginBottom: "1vh"}}>
                    <h1>
                      Official Solution 
                    </h1>
                    <CopyToClipboard text={problem && (problem.problem.solution) as any} onCopy={handleCopy}>
                          <button className={styles.copy}>
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            <span className="sr-only">{copied ? 'Copied!' : 'Copy'}</span>
                          </button>
                    </CopyToClipboard>
                  </div>
                  <pre>
                    <SyntaxHighlighter language="python" style={dracula}>
                      {`${problem && problem.problem.solution}`}
                    </SyntaxHighlighter>
                  </pre>
                </div>
              </div>
            }
            <br/>
        </div>
    </div>
  );
};

export default Problem;
