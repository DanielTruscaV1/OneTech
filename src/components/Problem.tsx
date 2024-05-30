import IDE from "../small_components/IDE"
import LeftSidebar from "./LeftSidebar"
import styles from "./ProblemStyle.module.css"
import TopSidebar from "./TopSidebar"

const Problem = () => {
  return (
    <div className={styles.container}>
        <LeftSidebar/>
        <TopSidebar message="Problem"/>
        <div className={styles.navigation}>
            <button>
                Description
            </button>
            <button>
                Tests
            </button>
            <button>
                Submissions
            </button>
            <button>
                Solutions
            </button>
        </div>
        <div className={styles.content}>
            <p>
            An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
            </p>
        </div>
        <div className={styles.IDEcontainer}>
            <IDE/>
        </div>
    </div>
  )
}

export default Problem