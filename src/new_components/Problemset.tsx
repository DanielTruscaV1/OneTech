import { useEffect, useState } from "react";
import styles from "../new_styles/ProblemsetStyle.module.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";

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

  const user = JSON.parse(localStorage.getItem("user") as string) as any;

  const [settings, setSettings] = useState<boolean>(false)

  const theme = localStorage.getItem("theme");

  return (
    <>
      {
        settings &&
        <Settings setSettings={setSettings}/>
      }
    <div className={`${styles.problemset} ${settings ? 'blurred' : ''}`}>
      <Sidebar />
      {
        user && 
        <>
          <img src={theme == "light" ? "/settings1.png" : "/settings2.png"} className="user_settings" onClick={() => setSettings(true)}/>
          <img src={user.image} className="user_image"/>
        </>
      }
      <div className={styles.row1}>
        <h1>
          OneTech / Problemset
        </h1>
      </div>
      <div className={styles.row2}>
        <div className={styles.box}>
          <h2>
            Daily Problem - Day 123
          </h2>
          <p>
            ID: #456
          </p>
          <p>
            Title: Sum of two numbers
          </p>
          <p>
            Difficulty: Easy (1300)
          </p>
          <button>
            Solve
          </button>
        </div>
        <div className={styles.box}>
          <h2>
            Weekly Problem - Week 4
          </h2>
          <p>
            ID: #457
          </p>
          <p>
            Title: Sum of three numbers
          </p>
          <p>
            Difficulty: Medium (2500)
          </p>
          <button>
            Solve
          </button>
        </div>
        <div className={styles.box}>
          <h2>
            <img src="/fire.png"/>
            Streak - 4 Days
          </h2>
          
          <p>
            Current Bonus rewards - 1.25%
          </p>
          <p>
            Upgrade ratio - 0.25%
          </p>
        </div>
      </div>
      <div className={styles.row3}>
        <p>
          Layout: 
        </p>
        <button>
          List
        </button>
        <button>
          Grid
        </button>
        <div className={styles.gap}>

        </div>
        <button>
          Filter
        </button>
        <button>
          Search
        </button>
      </div>
      <div className={styles.row4}>
        <div className={styles.box}>
          <h2>
            ID - Name
          </h2>
          <div className={styles.gap}>

          </div>
          <h2>
            Status
          </h2>
          <h2>
            Difficulty
          </h2>
        </div>

        {
          problems.map((p : any) => {
            return <div className={styles.box} onClick={() => navigate(`/problem/${p.data.problem_id}`)}>
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
      </div>
    </div>
    </>
  );
};

export default Problemset;
