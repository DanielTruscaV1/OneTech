import styles from "../new_styles/ProblemsetStyle.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"

const Problemset = () => {
  return (
    <div className={styles.problemset}>
        <Sidebar/>
        <Top/>
        <div className={styles.daily}>
            <h1>
                Daily Problem - #D5173
            </h1>
            <h1>
                Word Break II
            </h1>
            <button className={styles.tags}>
                <img src="/problemset3.png"/>
                <p>
                Show Tags
                </p>
            </button>
            <button className={styles.info}>
                <img src="/info1.png"/>
                <p>
                Show Info
                </p>
            </button>
        </div>
    </div>
  )
}

export default Problemset