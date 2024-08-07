import { useEffect, useState } from "react";
import Header from "./Header"
import styles from "./ProblemsetStyle.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Problemset = () => {

    const navigate = useNavigate();

    //@ts-ignore
    const [problems, setProblems] = useState<any>([]);
  
    useEffect(() => {
      const getProblems = async () => {
        const result = await axios.get("https://onetech.onrender.com/api/getProblems");
  
        console.log(result);
  
        setProblems(result.data.result.data);
      }
  
      getProblems();
    }, []);

    const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.body}>
                <div className={styles.filter}>
                    {
                        !isLargeDevice &&
                        <>
                            <div>
                                <h1>
                                    Search
                                </h1>
                                <input type="text"/>
                                <h1>
                                    Filter
                                </h1>
                                <div className={styles.row}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: "-3vh",
                                    }}>
                                        <h2 style={{
                                                marginTop: "2vh",
                                                marginBottom: "0vh",
                                            }}
                                        >
                                            Difficulty
                                        </h2>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Easy
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Medium
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Hard
                                        </label>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: "-3vh",
                                    }}>
                                        <h2 style={{
                                                marginTop: "2vh",
                                                marginBottom: "0vh",
                                            }}
                                        >
                                            Status
                                        </h2>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Solved
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Attempted
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Not Solved
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        isLargeDevice &&
                        <>
                            <div>
                                <h1>
                                    Search
                                </h1>
                                <input type="text"/>
                                <h1>
                                    Filter
                                </h1>
                                <div className={styles.row}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "1vw",
                                        marginTop: "-3vh",
                                    }}>
                                        <h2 style={{
                                                marginTop: "2vh",
                                                marginBottom: "0vh",
                                            }}
                                        >
                                            Difficulty
                                        </h2>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Easy
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Medium
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Hard
                                        </label>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: "-3vh",
                                    }}>
                                        <h2 style={{
                                                marginTop: "2vh",
                                                marginBottom: "0vh",
                                            }}
                                        >
                                            Status
                                        </h2>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Solved
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Attempted
                                        </label>
                                        <label className="container1">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            Not Solved
                                        </label>
                                    </div>
                                    {
                                        isLargeDevice && 
                                        <div style={{opacity: "0"}}>
                                            idk
                                        </div>
                                    }
                                </div>
                                <br/>
                            </div> 
                        </>
                    }
                </div>
                <div className={styles.problemset}>
                {
                    !isLargeDevice &&  
                    <>
                        {
                            problems.map((p : any) => {
                                return <div className={styles.card} onClick={() => navigate(`/problem/${p.data.problem_id}`)}>
                                <h2>
                                    {p.data.problem_id} - {p.data.title}
                                </h2>
                                <div className={styles.gap}>
                        
                                </div>
                                <h2>
                                    Not solved
                                </h2>
                                <h2>
                                    {p.data.difficulty}
                                </h2>
                                </div>
                            })
                        }
                    </>
                }
                {
                    isLargeDevice &&  
                    <>
                        {
                            problems.map((p : any) => {
                                return <div className={styles.card} onClick={() => navigate(`/problem/${p.data.problem_id}`)}>
                                <h2>
                                    {p.data.problem_id} - {p.data.title}
                                </h2>
                                <div className={styles.gap}>
                        
                                </div>
                                <h2>
                                    Not solved
                                </h2>
                                <h2>
                                    {p.data.difficulty}
                                </h2>
                                </div>
                            })
                        }
                    </>
                }
                </div>
                {
                    isLargeDevice &&
                    <div className={styles.chapters}>
                        <div className={styles.box}>
                            #1 Numbers
                        </div>
                        <div className={styles.box}>
                            #2 Strings
                        </div>
                        <div className={styles.box}>
                            #3 Arrays
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Problemset