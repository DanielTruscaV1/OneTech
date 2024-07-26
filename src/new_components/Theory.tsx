import styles from "../new_styles/TheoryStyle.module.css"
import Sidebar from "./Sidebar"

const Theory = () => {

  return (
    <div className={styles.theory}>
        <Sidebar/>
        <div className={styles.problemset}>
      <Sidebar />
      <div className={styles.row1}>
        <h1>
          OneTech / Theory
        </h1>
      </div>
      <div className={styles.row2}>
        <p>
          Roadmaps
        </p>
        <button>
          Search
        </button>
        <button>
          Filter
        </button>
      </div>
      <div className={styles.row23}>
        <div className={styles.box}>
          <h2>
              Computer Science (CS)
            </h2>
            <button>
              View roadmap
            </button>
        </div>
        <div className={styles.box}>
          <h2>
              Artificial Intelligence (AI)
            </h2>
            <button>
              View roadmap
            </button>
        </div>
      </div>
      <div className={styles.row3}>
        <p>
          Tutorials 
        </p>
        <button>
          Search
        </button>
        <button>
          Filter
        </button>
      </div>
      <div className={styles.row34}>
        <div className={styles.box}>
          <h2>
              JavaScript
          </h2>
          <p>
            5 hours of content
          </p>
          <p>
            Experience level - Beginner
          </p>
          <p>
            32 chapters
          </p>
          <p>
            Community support avaiable
          </p>
          <button>
            Get started
          </button>
        </div>
        <div className={styles.box}>
          <h2>
              TypeScript
          </h2>
          <p>
            5 hours of content
          </p>
          <p>
            Experience level - Beginner
          </p>
          <p>
            32 chapters
          </p>
          <p>
            Community support avaiable
          </p>
          <button>
            Get started
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Theory