import { useEffect, useState } from "react";
import styles from "./ProblemStyle.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "./Header";


// Define types
interface Problem {
  title: string;
  problem_id: number;
  statement: string;
  points: string;
  example: string[];
}


import { themesByName } from "@/new_components/themes";

import './EditorStyles.css';
import MyEditor from "./MyEditor";

const Problem = () => {

  const user = JSON.parse(localStorage.getItem("user") as string) as any;

   //@ts-ignore
  const [settings, setSettings] = useState<boolean>(false)

  const { problem_id } = useParams<{ problem_id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1 style={{display:"flex", flexDirection:"row"}}>
                    #{problem && problem.problem_id } - {problem && problem.title} - <span style={{color: "#00DD55", display: "flex", flexDirection: "row", marginLeft: "7.5px"}}>{problem && problem.points} <img src="/points6.png" style={{borderRadius: "50%", width:"20px", height: "20px", marginLeft:"7.5px", marginTop: "1.2vh"}}/></span>
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
                    isLargeDevice && <MyEditor/>
                }
            </div>
            <br/>
        </div>
    </div>
  );
};

export default Problem;
