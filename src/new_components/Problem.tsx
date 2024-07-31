import { useEffect, useState } from "react";
import styles from "./ProblemStyle.module.css"
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Problem = () => 
{
    const { problem_id } = useParams();

    const [problem, setProblem] = useState<any>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);  

    useEffect(() => {
        const getProblem = async () => {
            try 
            {
                const response = await axios.get(`https://onetech.onrender.com/api/getProblemById/${problem_id}`);
    
                setProblem(response.data.result.data[0].data);
    
                setLoading(false);
            }
            catch(error)
            {
                setError(true);
            }
            
        }

        getProblem();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const user = JSON.parse(localStorage.getItem("user") as string) as any;

    return <div className={styles.container}>
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
            OneTech / Problemset / Problem # {problem.problem_id}
            </h1>
        </div>
        <div className={styles.row2}>
            <button>
                Statement
            </button>
            <button>
                Cases
            </button>
            <button>
                Solutions
            </button>
        </div>
        <h2>
            Statement
        </h2>
        <div className={styles.box}>
            {problem.statement}
        </div>
    </div>
}

export default Problem;