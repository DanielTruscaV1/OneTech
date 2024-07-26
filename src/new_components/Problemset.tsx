import styles from "../new_styles/ProblemsetStyle.module.css";
import Sidebar from "./Sidebar";

const Problemset = () => {
  return (
    <div className={styles.problemset}>
      <Sidebar />
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
            Problem ID - Problem Name
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
        <div className={styles.box}>
          <h2>
            Problem ID - Problem Name
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
        <div className={styles.box}>
          <h2>
            Problem ID - Problem Name
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
        <div className={styles.box}>
          <h2>
            Problem ID - Problem Name
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
      </div>
    </div>
  );
};

export default Problemset;
